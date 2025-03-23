from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import cv2
import mediapipe as mp
import pickle

app = Flask(__name__)

# Load trained hybrid model
try:
    model = tf.keras.models.load_model("D:/Project/SIGN_LANGUAGE_PROJECT/hybrid_sign_language_model.h5", compile=False)
    print("✅ Model Loaded Successfully!")
except Exception as e:
    print("❌ Model Loading Error:", e)

# Load label encoder
with open("D:/Project/SIGN_LANGUAGE_PROJECT/label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)

# Define labels
LABELS = list(label_encoder.classes_)

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.7)

def extract_hand_landmarks(image):
    """Extracts hand landmarks using MediaPipe."""
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = hands.process(image_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            return np.array([[lm.x, lm.y, lm.z] for lm in hand_landmarks.landmark]).flatten()
    return None

@app.route("/predict", methods=["POST"])
def predict_sign():
    """API endpoint for sign recognition."""
    try:
        file = request.files["image"]
        image = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)

        # Extract hand landmarks
        landmarks = extract_hand_landmarks(image)
        if landmarks is None:
            return jsonify({"error": "No hand detected"}), 400

        # Process cropped hand image
        x_vals = [lm.x for lm in hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB)).multi_hand_landmarks[0].landmark]
        y_vals = [lm.y for lm in hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB)).multi_hand_landmarks[0].landmark]

        x_min = max(0, int(min(x_vals) * image.shape[1]) - 20)
        x_max = min(image.shape[1], int(max(x_vals) * image.shape[1]) + 20)
        y_min = max(0, int(min(y_vals) * image.shape[0]) - 20)
        y_max = min(image.shape[0], int(max(y_vals) * image.shape[0]) + 20)

        cropped_hand = image[y_min:y_max, x_min:x_max]
        if cropped_hand.size != 0:
            cropped_hand = cv2.resize(cropped_hand, (64, 64))
            cropped_hand = np.expand_dims(cropped_hand, axis=0) / 255.0  # Normalize

            # Make Prediction
            input_landmarks = np.expand_dims(landmarks, axis=0)
            prediction = model.predict([input_landmarks, cropped_hand], verbose=0)[0]
            predicted_label = label_encoder.inverse_transform([np.argmax(prediction)])[0]

            return jsonify({"predicted_sign": predicted_label})
        else:
            return jsonify({"error": "Hand not cropped properly"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)
