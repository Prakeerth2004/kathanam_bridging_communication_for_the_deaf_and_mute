import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

const TranslateAI = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");

  const languages = {
    en: "English",
    es: "Spanish",
    fr: "French",
    hi: "Hindi",
    de: "German",
  };

  const translateText = async () => {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|${targetLang}`
    );
    const data = await response.json();
    setTranslatedText(data.responseData.translatedText);
  };

  return (
    <div className="translate-ai-container">
      <h1>AI Translator</h1>

      <div className="translate-box">
        {/* Source Language Dropdown */}
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          {Object.entries(languages).map(([code, lang]) => (
            <option key={code} value={code}>{lang}</option>
          ))}
        </select>

        <FaExchangeAlt className="swap-icon" />

        {/* Target Language Dropdown */}
        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          {Object.entries(languages).map(([code, lang]) => (
            <option key={code} value={code}>{lang}</option>
          ))}
        </select>
      </div>

      {/* Text Input */}
      <textarea
        placeholder="Enter text to translate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      {/* Translate Button */}
      <button onClick={translateText}>Translate</button>

      {/* Translated Text Output */}
      {translatedText && (
        <div className="translated-text">
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}

      {/* Embedded CSS */}
      <style>{`
        .translate-ai-container {
          text-align: center;
          padding: 40px;
          background: linear-gradient(to bottom, #f7941d, #ffcc80);
          min-height: 100vh;
        }

        .translate-box {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        select {
          padding: 8px;
          border-radius: 5px;
          border: none;
          font-size: 16px;
        }

        .swap-icon {
          font-size: 24px;
          color: black;
        }

        textarea {
          width: 60%;
          height: 100px;
          padding: 10px;
          border-radius: 8px;
          font-size: 16px;
        }

        button {
          background: green;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          margin-top: 10px;
          cursor: pointer;
        }

        .translated-text {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-top: 20px;
          width: 50%;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </div>
  );
};

export default TranslateAI;
