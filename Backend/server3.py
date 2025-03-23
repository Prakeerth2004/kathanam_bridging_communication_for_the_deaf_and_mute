import os
import json
import subprocess
import spacy
import re
import docx
import fitz
import speech_recognition as sr
import time
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load Spacy model
nlp = spacy.load("en_core_web_sm")

# File paths
BASE_DIR = r"C:\Users\palak\Desktop\bits_hyderabad_hackathon\Kathanam_Bridging_Communication_for_the_Deaf_and_Mute-main\Backend\text_to_sign"
MAPPING_FILE = os.path.join(BASE_DIR, "word_to_video.json")
VIDEO_FOLDER = os.path.join(BASE_DIR, "ISL_Videos")
TEMP_FILE_LIST = os.path.join(BASE_DIR, "file_list.txt")
OUTPUT_FOLDER = os.path.join(BASE_DIR, "outputs")
OUTPUT_VIDEO = os.path.join(OUTPUT_FOLDER, "final_output.mp4")
FFMPEG_PATH = os.path.join(BASE_DIR, r"ffmpeg-2025-03-06-git-696ea1c223-full_build\bin\ffmpeg.exe")

# Ensure output folder exists
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Load word-to-video mapping
with open(MAPPING_FILE, "r", encoding="utf-8") as f:
    word_to_video = json.load(f)

# Define words to remove
unnecessary_words = {"is", "are", "am", "was", "were", "do", "does", "did", "the", "a", "an", "this", "it", "that",
                     "has", "have", "had", "can", "should", "must", "will", "would", "could", "shall", "may", "might", "ought"}

remove_words = {"and", "but", "while", "so", "because", "or", "yet", "though", "if", "than", "also", "still",
                "even", "though", "although", "since", "until", "as", "such", "like", "with", "without", "before", "after",
                "during", "about", "against", "between", "through", "around", "near", "upon", "towards", "within", "among", "under",
                "very", "really", "just", "only", "quite", "almost", "too", "rather", "fairly", "anyway", "either", "neither"}

negation_words = {"dont": "not", "doesnt": "not", "shouldnt": "not", "cant": "not", "wont": "not", "didnt": "not",
                  "couldnt": "not", "isnt": "not", "arent": "not", "wasnt": "not", "werent": "not", "hasnt": "not",
                  "havent": "not", "hadnt": "not"}


def english_to_isl_gloss(text):
    """ Convert English text to ISL Gloss format """
    text = text.lower().strip()
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    words = text.split()

    # Convert negations
    words = [negation_words[word] if word in negation_words else word for word in words]

    doc = nlp(" ".join(words))
    isl_gloss_words = [token.text for token in doc if token.text not in unnecessary_words and token.text not in remove_words]

    # Move question words to the front
    for question_word in ["which", "what", "where", "why", "how"]:
        if question_word in isl_gloss_words:
            isl_gloss_words.remove(question_word)
            isl_gloss_words.insert(0, question_word)

    return " ".join(isl_gloss_words) if isl_gloss_words else "Gloss Not Found"


def get_video_sequence(gloss):
    """ Retrieve video paths for ISL gloss words """
    words = gloss.split()
    video_list = []
    missing_words = []

    for word in words:
        if word in word_to_video:
            video_path = os.path.join(VIDEO_FOLDER, word_to_video[word])
            video_list.append(video_path)
        else:
            missing_words.append(word)

    if missing_words:
        print(f"⚠️ Warning: No video found for words: {', '.join(missing_words)}")

    return video_list


def stitch_videos(video_list):
    """ Use FFmpeg to stitch ISL videos """
    if not video_list:
        raise FileNotFoundError("❌ No valid ISL videos found to stitch.")

    # Ensure the output folder exists
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    # Delete the previous output file before running FFmpeg
    if os.path.exists(OUTPUT_VIDEO):
        os.remove(OUTPUT_VIDEO)

    # Write file list for FFmpeg
    with open(TEMP_FILE_LIST, "w", encoding="utf-8") as f:
        for video in video_list:
            f.write(f"file '{video.replace('\\', '/')}'\n")

    # Run FFmpeg with '-y' flag to force overwrite
    cmd = f'"{FFMPEG_PATH}" -y -f concat -safe 0 -i "{TEMP_FILE_LIST}" -c copy "{OUTPUT_VIDEO}"'

    try:
        subprocess.run(cmd, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"⚠️ FFmpeg Error: {e}")

    # Double-check if the file exists after FFmpeg execution
    if not os.path.exists(OUTPUT_VIDEO):
        raise FileNotFoundError("⚠️ FFmpeg did not generate the output video.")

    return OUTPUT_VIDEO


import speech_recognition as sr

def process_speech():
    """ Convert speech to text with a stop recording option """
    recognizer = sr.Recognizer()
    mic_list = sr.Microphone.list_microphone_names()

    if not mic_list:
        return "⚠️ No microphone detected. Please check your device."

    try:
        with sr.Microphone() as source:
            print("🎤 Speak Now... Press 'Stop' when done.")
            recognizer.adjust_for_ambient_noise(source)

            # Listen for speech until stopped manually
            audio = recognizer.listen(source, timeout=5, phrase_time_limit=10)

        # Convert speech to text
        text = recognizer.recognize_google(audio)
        print(f"📝 Recognized Speech: {text}")
        return text

    except sr.UnknownValueError:
        return "⚠️ Speech not understood. Please try again."
    except sr.RequestError:
        return "⚠️ Speech recognition service unavailable."
    except OSError as e:
        return f"⚠️ Microphone error: {e}"




@app.route("/text-to-sign/convert", methods=["POST"])
def convert_text_to_sign():
    """ Convert input text to ISL video """
    data = request.get_json()
    input_type = data.get("input_type", "text")

    if input_type == "text":
        text = data.get("text", "").strip()
    elif input_type == "speech":
        text = process_speech()
    else:
        return jsonify({"error": "Invalid input type"}), 400

    if not text:
        return jsonify({"error": "⚠️ No text provided"}), 400

    gloss = english_to_isl_gloss(text)

    if gloss == "Gloss Not Found":
        return jsonify({"error": "⚠️ No matching words found in dataset"}), 400

    video_list = get_video_sequence(gloss)

    if not video_list:
        return jsonify({"error": "⚠️ No valid ISL videos found"}), 400

    try:
        video_path = stitch_videos(video_list)
    except (FileNotFoundError, RuntimeError) as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"gloss": gloss, "video_url": f"http://localhost:5003/video/final_output.mp4?t={int(time.time())}"})


@app.route('/video/<path:filename>')
def serve_video(filename):
    """ Serve the generated sign language video correctly """
    video_path = os.path.join(OUTPUT_FOLDER, filename)
    if os.path.exists(video_path):
        return send_file(video_path, mimetype='video/mp4', as_attachment=False)
    else:
        return jsonify({"error": "⚠️ Video file not found"}), 404


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5003)
