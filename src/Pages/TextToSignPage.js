import React, { useState } from "react";
import axios from "axios";
import { FaMicrophone, FaStop } from "react-icons/fa";

const TextToSign = () => {
  const [inputType, setInputType] = useState("text");
  const [text, setText] = useState("");
  const [gloss, setGloss] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    let requestData = { input_type: inputType };

    if (inputType === "text") {
      requestData.text = text;
    }

    try {
      const response = await axios.post("http://localhost:5003/text-to-sign/convert", requestData);
      setGloss(response.data.gloss);
      setVideoUrl(response.data.video_url);
    } catch (error) {
      console.error("Error converting input to sign:", error);
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    setRecording(true);
    setText("🎤 Listening...");
    try {
      const response = await axios.post("http://localhost:5003/text-to-sign/convert", {
        input_type: "speech",
      });

      setText(response.data.text);
      setGloss(response.data.gloss);
      setVideoUrl(response.data.video_url);
    } catch (error) {
      console.error("Error with speech-to-text:", error);
      setText("⚠️ Speech recognition failed.");
    } finally {
      setRecording(false);
    }
  };

  const stopRecording = () => {
    setRecording(false);
    setText("🎤 Recording stopped...");
  };

  return (
    <div className="text-to-sign-container">
      <h1 className="page-title">Convert Input to Sign Language</h1>

      {/* Input Type Selector */}
      <div className="input-type-selector">
        <label>Choose Input Type:</label>
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="text">Text Input</option>
          <option value="speech">Speech Input</option>
        </select>
      </div>

      {/* Input Fields */}
      {inputType === "text" && (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          className="input-box"
        />
      )}

      {inputType === "speech" && (
        <div className="speech-container">
          {!recording ? (
            <button onClick={startRecording} className="speech-btn">
              <FaMicrophone /> Start Recording
            </button>
          ) : (
            <button onClick={stopRecording} className="stop-btn">
              <FaStop /> Stop Recording
            </button>
          )}
          <p className="status">{text}</p>
        </div>
      )}

      {/* Convert Button */}
      <button onClick={handleConvert} className="convert-btn">
        {loading ? "Converting..." : "Convert"}
      </button>

      {/* Gloss Output */}
      {gloss && (
        <div className="gloss-container">
          <h3>Generated Gloss:</h3>
          <p className="gloss-text">{gloss}</p>
        </div>
      )}

      {/* Video Display */}
      {videoUrl && (
        <div className="video-container">
          <h3>Generated Sign Language Video:</h3>
          <video className="video-player" src={videoUrl} controls />
        </div>
      )}

      {/* CSS Styles */}
      <style>{`
        .text-to-sign-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f7941d, #ffcc80);
          padding: 20px;
          text-align: center;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #2c3e50;
        }

        .input-type-selector {
          margin-bottom: 15px;
        }

        .input-box {
          width: 100%;
          max-width: 600px;
          height: 100px;
          padding: 15px;
          border-radius: 10px;
          border: 2px solid #ccc;
          font-size: 1rem;
          outline: none;
          transition: 0.3s;
        }

        .speech-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 10px;
        }

        .speech-btn {
          background: #f28500;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s;
        }

        .stop-btn {
          background: #d32f2f;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s;
        }

        .stop-btn:hover {
          background: #b71c1c;
        }

        .convert-btn {
          margin-top: 15px;
          padding: 10px;
          font-size: 1rem;
          background: #2A9D8F;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          transition: 0.3s;
        }

        .gloss-container {
          margin-top: 20px;
          background: rgba(255, 255, 255, 0.8);
          padding: 15px;
          border-radius: 10px;
        }

        .video-container {
          margin-top: 30px;
          width: 90%;
          max-width: 800px;
        }

        .video-player {
          width: 100%;
          border-radius: 10px;
        }

        .status {
          font-size: 1.2rem;
          color: #444;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default TextToSign;




/*

import React, { useState } from "react";
import axios from "axios";
import { FaPlayCircle, FaSyncAlt } from "react-icons/fa";

const TextToSign = () => {
  const [text, setText] = useState("");
  const [gloss, setGloss] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5003/text-to-sign/convert", { text });
      setGloss(response.data.gloss);
      setVideoUrl(response.data.video_url);
    } catch (error) {
      console.error("Error converting text to sign:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-to-sign-container">
      <h1 className="page-title">Text to Sign Language</h1>
      <p className="page-subtitle">Convert any text into sign language animations seamlessly.</p>

    
      <div className="input-container">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          className="input-box"
        />
        <button onClick={handleConvert} className="convert-btn">
          {loading ? <FaSyncAlt className="spinner" /> : "Convert"}
        </button>
      </div>


      {gloss && (
        <div className="gloss-container">
          <h3>Generated Gloss:</h3>
          <p className="gloss-text">{gloss}</p>
        </div>
      )}


      {videoUrl && (
        <div className="video-container">
          <h3>Generated Sign Language Video:</h3>
          <video className="video-player" src={videoUrl} controls />
        </div>
      )}

   
      <style>{`
        .text-to-sign-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f7941d, #ffcc80);
          padding: 20px;
          text-align: center;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #2c3e50;
        }

        .page-subtitle {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 30px;
        }

        .input-container {
          display: flex;
          flex-direction: column;
          width: 90%;
          max-width: 600px;
          margin-bottom: 20px;
        }

        .input-box {
          width: 100%;
          height: 100px;
          padding: 15px;
          border-radius: 10px;
          border: 2px solid #ccc;
          font-size: 1rem;
          resize: none;
          outline: none;
          transition: all 0.3s ease;
        }

        .input-box:focus {
          border-color: #f28500;
          box-shadow: 0px 4px 10px rgba(242, 133, 0, 0.2);
        }

        .convert-btn {
          margin-top: 15px;
          padding: 10px;
          font-size: 1rem;
          background: #2A9D8F;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          transition: 0.3s;
        }

        .convert-btn:hover {
          background: #21867a;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .gloss-container {
          margin-top: 20px;
          background: rgba(255, 255, 255, 0.8);
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .gloss-text {
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
        }

        .video-container {
          margin-top: 30px;
          width: 90%;
          max-width: 800px;
        }

        .video-player {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .page-title { font-size: 2rem; }
          .page-subtitle { font-size: 1rem; }
          .input-box { font-size: 0.9rem; }
          .convert-btn { font-size: 0.9rem; }
        }
      `}</style>
    </div>
  );
};

export default TextToSign;

*/