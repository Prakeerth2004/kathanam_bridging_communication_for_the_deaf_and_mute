import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const SignToText = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recognizedSign, setRecognizedSign] = useState("Detecting...");

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    if (!videoRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setInterval(captureFrame, 2000); // Capture every 2 seconds
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob);

      try {
        const response = await axios.post("http://localhost:5002/predict", formData);
        setRecognizedSign(response.data.predicted_sign);
      } catch (error) {
        console.error("Error predicting sign:", error);
      }
    }, "image/jpeg");
  };

  return (
    <div className="sign-to-text-container">
      <h1>Sign to Text</h1>
      <p>Convert sign language into readable text</p>

      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline muted></video>
        <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }}></canvas>
      </div>

      <div className="output-box">
        <h2>Recognized Sign:</h2>
        <p>{recognizedSign}</p>
      </div>

      <style>{`
        .sign-to-text-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(to bottom, #ff7043, #ffcc80);
          padding: 20px;
          text-align: center;
        }

        .video-container {
          width: 80%;
          max-width: 640px;
          height: 480px;
          background: black;
          border-radius: 10px;
          margin-top: 20px;
        }

        .output-box {
          background: rgba(255, 255, 255, 0.2);
          padding: 20px;
          border-radius: 10px;
          margin-top: 20px;
          width: 60%;
          max-width: 500px;
          text-align: center;
        }

        h1 { font-size: 2.5rem; color: white; }
        p { font-size: 1.2rem; color: #f3f3f3; }
        .output-box h2 { font-size: 1.5rem; color: white; }
        .output-box p { font-size: 1.3rem; font-weight: bold; color: #ffffff; }
      `}</style>
    </div>
  );
};

export default SignToText;
