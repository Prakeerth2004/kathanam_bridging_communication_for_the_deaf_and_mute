import spacy
import re
import speech_recognition as sr
import docx
import fitz

nlp = spacy.load("en_core_web_sm")

# important words
important_words = {
    "what", "where", "who", "when", "why", "how", "hello", "which", "from", "not", "no",  
    "my", "your", "our", "his", "her", "their", "name", "time", "place", "teacher", "student", 
    "friend", "mother", "father", "sister", "brother", "today", "yesterday", "tomorrow", 
    "morning", "afternoon", "evening", "night", "give", "take", "need", "want", "yes", "maybe", 
    "big", "small", "fast", "slow", "finish", "start", "end", "early", "late", "go", "come", 
    "stay", "leave", "eat", "drink", "sleep", "read", "write", "work", "play", "study", "school", 
    "college", "before"
}  

# auxiliary words & determiners to remove
unnecessary_words = {
    "is", "are", "am", "was", "were", "do", "does", "did", "the", "a", "an", "can", "should", 
    "must", "this", "it", "that", "will", "would", "could", "might"
}  

# words to remove 
remove_words = {
    "and", "but", "while", "so", "because", "or", "yet", "though", "if", "than", "also", 
    "still", "even", "though", "although", "since", "until", "as", "such", "like"
}

# negation words 
negation_words = {
    "dont": "not", "doesnt": "not", "shouldnt": "not", "cant": "not", "wont": "not", "didnt": "not",
    "couldnt": "not", "isnt": "not", "arent": "not", "wasnt": "not", "werent": "not",
    "hasnt": "not", "havent": "not", "hadnt": "not", "never": "not", "nobody": "not", 
    "nothing": "not", "nowhere": "not"
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
    text = ""
    for page in doc:
        text += page.get_text("text") + "\n"
    return text.strip()

def convert_to_base_form(text):
    words = text.split()
    words = [negation_words[word] if word in negation_words else word for word in words]
    text = " ".join(words)  

    doc = nlp(text)
    base_words = [token.lemma_ if token.pos_ == "VERB" and token.text != "not" else token.text for token in doc]
    return " ".join(base_words)

def english_to_isl_gloss(text):

    # Lowercase and remove punctuation
    text = text.lower().strip()
    text = re.sub(r'[^\w\s]', '', text)  
    words = text.split()

    words = [negation_words[word] if word in negation_words else word for word in words]

    doc = nlp(" ".join(words))

    isl_gloss_words = []
    for token in doc:
        if token.text not in unnecessary_words and token.text not in remove_words:
            isl_gloss_words.append(token.text)

    for question_word in ["which", "what", "where", "why", "how"]:
        if question_word in isl_gloss_words:
            isl_gloss_words.remove(question_word)
            isl_gloss_words.insert(0, question_word) 

    isl_gloss = " ".join(isl_gloss_words)

    return isl_gloss if isl_gloss else "Gloss Not Found"


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

print("\n**English to ISL Gloss Conversion:**")
isl_gloss_output = process_input()
print(f"\n ISL Gloss: {isl_gloss_output}\n")

