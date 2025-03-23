import React, { useState } from "react";

const SignToNumber = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedImage(file);
  };

  // Perform Prediction via Flask API
  const handlePredict = async () => {
    if (!selectedImage) {
      alert("⚠ Please select an image first!");
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPrediction(data.predicted_number);
    } catch (error) {
      console.error("Error predicting:", error);
      alert("Error connecting to the server. Make sure Flask API is running.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2 className="title">Sign Language to Number Recognition</h2>

      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {/* Image Preview */}
      {selectedImage && (
        <div className="image-preview">
          <img src={URL.createObjectURL(selectedImage)} alt="Uploaded Sign" />
        </div>
      )}

      {/* Predict Button */}
      <button className="predict-btn" onClick={handlePredict} disabled={loading}>
        {loading ? "Processing..." : "Predict"}
      </button>

      {/* Show Prediction */}
      {prediction !== null && (
        <h3 className="result">Predicted Number: {prediction}</h3>
      )}

      {/* Styling */}
      <style>{`
        .container {
          text-align: center;
          padding: 20px;
        }
        .title {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .image-preview img {
          width: 200px;
          height: auto;
          margin: 10px;
          border: 2px solid #333;
        }
        .predict-btn {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          margin-top: 10px;
          font-size: 18px;
        }
        .predict-btn:disabled {
          background-color: grey;
        }
        .result {
          margin-top: 20px;
          font-size: 22px;
          font-weight: bold;
          color: green;
        }
      `}</style>
    </div>
  );
};

export default SignToNumber;
