import spacy
import re
import speech_recognition as sr
import docx
import fitz
import json
import subprocess

# Load Spacy model
nlp = spacy.load("en_core_web_sm")

# Load word-to-video mapping
with open("word_to_video.json", "r") as f:
    word_to_video = json.load(f)

# Define words to remove
unnecessary_words = {
    "is", "are", "am", "was", "were", "do", "does", "did", "the", "a", "an", "this", "it", "that", 
    "has", "have", "had", "can", "should", "must", "will", "would", "could", "shall", "may", "might", "ought"
}

remove_words = {
    "and", "but", "while", "so", "because", "or", "yet", "though", "if", "than", "also", "still", 
    "even", "though", "although", "since", "until", "as", "such", "like",
    "with", "without", "before", "after", "during", "about", "against", "between", "through", "around", 
    "near", "upon", "towards", "within", "among", "under",
    "very", "really", "just", "only", "quite", "almost", "too", "rather", "fairly", "anyway", "either", "neither"
}

negation_words = {
    "dont": "not", "doesnt": "not", "shouldnt": "not", "cant": "not", "wont": "not", "didnt": "not",
    "couldnt": "not", "isnt": "not", "arent": "not", "wasnt": "not", "werent": "not",
    "hasnt": "not", "havent": "not", "hadnt": "not"
}

# Convert Speech to Text
def speech_to_text():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("🎤 Speak Now...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
    
    try:
        text = recognizer.recognize_google(audio)
        print(f"📝 Recognized Speech: {text}")
        return text
    except sr.UnknownValueError:
        return "Speech not understood."
    except sr.RequestError:
        return "STT Service unavailable."

# Read Word File (.docx)
def read_word_file(file_path):
    doc = docx.Document(file_path)
    return " ".join([para.text for para in doc.paragraphs])

# Read PDF File
def read_pdf_file(file_path):
    doc = fitz.open(file_path)
    return " ".join([page.get_text("text") for page in doc])

# Convert English to ISL Gloss
def english_to_isl_gloss(text):
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

    isl_gloss = " ".join(isl_gloss_words)
    return isl_gloss if isl_gloss else "Gloss Not Found"

# Convert ISL Gloss to Video Sequence 
def get_video_sequence(gloss):
    words = gloss.split()
    video_list = []
    
    for word in words:
        if word in word_to_video:
            video_path = word_to_video[word]
            # Ensure it's a full path, otherwise append directory
            if not video_path.startswith("C:"):  
                video_path = f"C:\\Users\\palak\\Desktop\\bits_hyderabad_hackathon\\text_to_sign\\text-ISL-main\\ISL_Videos\\{video_path}"
            video_list.append(video_path)
    
    return video_list



# Stitch Videos Using FFmpeg
def stitch_videos(video_list, output_file="output.mp4"):
    if not video_list:
        print("❌ No matching ISL videos found.")
        return

    with open("C:\\Users\\palak\\Desktop\\bits_hyderabad_hackathon\\text_to_sign\\file_list.txt", "w") as f:
        for video in video_list:
            f.write(f"file '{video}'\n")

    # Merge videos using FFmpeg
    subprocess.run([
    r"C:\Users\palak\Desktop\bits_hyderabad_hackathon\text_to_sign\ffmpeg-2025-03-06-git-696ea1c223-full_build\bin\ffmpeg.exe",
    "-f", "concat", "-safe", "0", "-i", "file_list.txt", "-c", "copy", "final_output.mp4"
])


    print("✅ Video stitching complete! Saved as:", output_file)

# Ask for Input Types
def process_input():
    print("\n🔹 Choose Input Type:")
    print("1️⃣ Text Input")
    print("2️⃣ Speech Input")
    print("3️⃣ Word File (.docx)")
    print("4️⃣ PDF File")
    
    choice = input("\nEnter your choice (1/2/3/4): ").strip()
    
    if choice == "1":
        user_input = input("Enter an English sentence: ")
        return english_to_isl_gloss(user_input)
    elif choice == "2":
        return english_to_isl_gloss(speech_to_text())
    elif choice == "3":
        file_path = input("Enter path to Word file (.docx): ").strip()
        return english_to_isl_gloss(read_word_file(file_path))
    elif choice == "4":
        file_path = input("Enter path to PDF file: ").strip()
        return english_to_isl_gloss(read_pdf_file(file_path))
    else:
        return "❌ Invalid choice."

# Run the Full Process
print("\n**English to ISL Gloss & Video Generation:**")
isl_gloss_output = process_input()
print(f"\n🔹 ISL Gloss: {isl_gloss_output}\n")

if isl_gloss_output != "Gloss Not Found":
    video_list = get_video_sequence(isl_gloss_output)
    stitch_videos(video_list, "final_output.mp4")
