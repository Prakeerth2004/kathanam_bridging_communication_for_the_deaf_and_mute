import React, { useState, useRef } from "react";
import axios from "axios";

const SpeechToText = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setTranscription(""); // Clear previous transcription
  };

  // Upload file to Flask backend
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("⚠ Please select an audio file first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5001/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTranscription(response.data.transcription || "No transcription available.");
    } catch (error) {
      console.error("❌ Error transcribing audio:", error);
      setTranscription("❌ Failed to transcribe audio.");
    } finally {
      setLoading(false);
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const wavBlob = await convertWebMToWAV(audioBlob);
        sendRecordedAudio(wavBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Convert WebM to WAV before sending to Flask
  const convertWebMToWAV = async (webmBlob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(webmBlob);
      reader.onloadend = () => {
        const buffer = reader.result;
        const wavBlob = new Blob([buffer], { type: "audio/wav" });
        resolve(wavBlob);
      };
    });
  };

  // Send recorded audio to Flask
  const sendRecordedAudio = async (audioBlob) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", audioBlob, "recorded_audio.wav");

    try {
      const response = await axios.post("http://127.0.0.1:5000/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTranscription(response.data.transcription || "No transcription available.");
    } catch (error) {
      console.error("❌ Error transcribing recorded audio:", error);
      setTranscription("❌ Failed to transcribe recorded audio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Gujarati Speech-to-Text Transcription</h2>

      {/* File Upload */}
      <input type="file" accept="audio/*" onChange={handleFileChange} />

      {/* Upload Button */}
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Transcribe File"}
      </button>

      {/* Live Recording Controls */}
      <div className="recording-controls">
        <button onClick={startRecording} disabled={isRecording}>🎤 Start Recording</button>
        <button onClick={stopRecording} disabled={!isRecording}>🛑 Stop Recording</button>
      </div>

      {/* Display Transcription */}
      {transcription && (
        <div className="transcription-box">
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </div>
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
        .transcription-box {
          margin-top: 20px;
          padding: 10px;
          border: 1px solid #ddd;
          background-color: #f9f9f9;
        }
        .recording-controls {
          margin-top: 15px;
        }
        button {
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 16px;
          margin-right: 10px;
        }
        button:disabled {
          background-color: grey;
        }
      `}</style>
    </div>
  );
};

export default SpeechToText;
