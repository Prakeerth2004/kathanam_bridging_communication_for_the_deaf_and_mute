import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin for React frontend

# Load the trained model (.h5)
MODEL_PATH = r"C:\Users\palak\Desktop\bits_hyderabad_hackathon\Kathanam_Bridging_Communication_for_the_Deaf_and_Mute-main\Models\numbers_sign_language_model_mobilenetv2.h5"  # Ensure this path is correct
model = tf.keras.models.load_model(MODEL_PATH)

# Define class labels (adjust based on your dataset)
CLASS_LABELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

def preprocess_image(image):
    """Preprocess image for prediction"""
    image = image.resize((64, 64))  # Resize to match model input
    image = np.array(image) / 255.0  # Normalize pixels
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route("/predict", methods=["POST"])
def predict():
    """Handle image prediction"""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    image = Image.open(io.BytesIO(file.read()))  # Open image
    processed_image = preprocess_image(image)  # Preprocess for model

    prediction = model.predict(processed_image)
    predicted_class = np.argmax(prediction, axis=1)[0]  # Get highest probability class

    return jsonify({"predicted_number": int(CLASS_LABELS[predicted_class])})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
