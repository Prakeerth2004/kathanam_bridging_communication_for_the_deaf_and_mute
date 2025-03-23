import React, { useState } from "react";
import axios from "axios";

const TextToSign = () => {
  const [text, setText] = useState("");
  const [gloss, setGloss] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleConvert = async () => {
    try {
      const response = await axios.post("http://localhost:5003/text-to-sign/convert", { text });
      setGloss(response.data.gloss);
      setVideoUrl(response.data.video_url);
    } catch (error) {
      console.error("Error converting text to sign:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Title Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">Text to Sign Language</h1>
        <p className="text-center text-gray-500 mt-2">
          Convert text into ISL (Indian Sign Language) video format
        </p>

        {/* Input Section */}
        <div className="mt-6">
          <textarea
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            rows="2"
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>

        {/* Gloss Output */}
        {gloss && (
          <div className="mt-6 bg-gray-200 p-3 rounded-md">
            <p className="text-gray-700 font-semibold">Gloss Representation:</p>
            <p className="text-lg text-gray-900">{gloss}</p>
          </div>
        )}

        {/* Video Output */}
        {videoUrl && (
          <div className="mt-6">
            <h3 className="text-gray-700 font-semibold">Generated Sign Language Video:</h3>
            <video
              className="w-full h-auto mt-3 rounded-lg shadow-md"
              src={videoUrl}
              controls
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToSign;






/*
import React, { useState } from "react";
import axios from "axios";

const TextToSign = () => {
  const [text, setText] = useState("");
  const [gloss, setGloss] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleConvert = async () => {
    try {
      const response = await axios.post("http://localhost:5003/text-to-sign/convert", { text });
      setGloss(response.data.gloss);
      setVideoUrl(response.data.video_url);
    } catch (error) {
      console.error("Error converting text to sign:", error);
    }
  };

  return (
    <div>
      <h2>Convert Text to Sign Language</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
      <button onClick={handleConvert}>Convert</button>
      {gloss && <p><strong>Gloss:</strong> {gloss}</p>}
      {videoUrl && (
        <div>
          <h3>Generated Sign Language Video</h3>
          <video src={videoUrl} controls width="500" height="300" />
        </div>
      )}

    </div>
  );
};

export default TextToSign;

*/