import React, { useState } from "react";
import { FaExchangeAlt, FaSpinner } from "react-icons/fa";

const TranslateAI = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);

  const languages = {
    en: "English",
    hi: "Hindi",
    gu: "Gujarati",
    te: "Telugu",
    ta: "Tamil",
  };

  const translateText = async () => {
    if (text.trim() === "") return;

    setLoading(true);
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|${targetLang}`
    );
    const data = await response.json();
    setTranslatedText(data.responseData.translatedText);
    setLoading(false);
  };

  return (
    <div className="translate-container">
      <h1 className="title">AI Translator</h1>
      <p className="subtitle">Translate any text with ease!</p>

      <div className="translate-box">
        <select className="dropdown" value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          {Object.entries(languages).map(([code, lang]) => (
            <option key={code} value={code}>{lang}</option>
          ))}
        </select>

        <FaExchangeAlt className="swap-icon" />

        <select className="dropdown" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          {Object.entries(languages).map(([code, lang]) => (
            <option key={code} value={code}>{lang}</option>
          ))}
        </select>
      </div>

      <textarea
        className="input-text"
        placeholder="Enter text to translate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <button className="translate-button" onClick={translateText} disabled={loading}>
        {loading ? <FaSpinner className="spinner" /> : "Translate"}
      </button>

      {translatedText && (
        <div className="translated-text">
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}

      {/* Embedded CSS */}
      <style>{`
        /* Page Container */
        .translate-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(to bottom, #1e3c72, #2a5298);
          padding: 30px;
          text-align: center;
          color: white;
          font-family: 'Poppins', sans-serif;
        }

        /* Title & Subtitle */
        .title {
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 1.2rem;
          opacity: 0.8;
          margin-bottom: 30px;
        }

        /* Language Dropdown */
        .translate-box {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .dropdown {
          padding: 10px;
          font-size: 1rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          cursor: pointer;
          outline: none;
          transition: 0.3s;
        }

        .dropdown:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        .dropdown {
          padding: 10px;
          font-size: 1rem;
          border-radius: 8px;
          background: white; /* Ensures better visibility */
          color: black; /* Ensures readable text */
          border: 1px solid #ccc;
          cursor: pointer;
          outline: none;
          transition: background 0.3s, color 0.3s;
        }

        .dropdown option {
          background: white;
          color: black;
        }

        .dropdown:hover {
          background: #f0f0f0;
        }

        .dropdown:focus {
          background: white;
        }


        .swap-icon {
          font-size: 24px;
          color: white;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .swap-icon:hover {
          transform: rotate(360deg);
        }

        /* Input Box */
        .input-text {
          width: 80%;
          max-width: 500px;
          height: 120px;
          padding: 12px;
          border-radius: 10px;
          border: none;
          font-size: 1rem;
          outline: none;
          resize: none;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          transition: 0.3s;
        }

        .input-text::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .input-text:focus {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Translate Button */
        .translate-button {
          background: #ff9800;
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          margin-top: 15px;
          transition: background 0.3s ease, transform 0.2s;
        }

        .translate-button:hover {
          background: #e68900;
          transform: scale(1.05);
        }

        .translate-button:disabled {
          background: gray;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 1s infinite linear;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Translated Text */
        .translated-text {
          background: rgba(255, 255, 255, 0.2);
          padding: 20px;
          border-radius: 10px;
          margin-top: 20px;
          width: 60%;
          max-width: 500px;
        }

        .translated-text h3 {
          font-size: 1.4rem;
          margin-bottom: 10px;
        }

        .translated-text p {
          font-size: 1.2rem;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .title {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .input-text {
            width: 90%;
            height: 100px;
          }

          .translated-text {
            width: 80%;
          }
        }
      `}</style>
    </div>
  );
};

export default TranslateAI;
