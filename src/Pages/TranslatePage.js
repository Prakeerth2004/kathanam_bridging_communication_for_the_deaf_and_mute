import React, { useEffect } from "react";
import { FaBookOpen, FaCamera, FaMicrophone, FaHands } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const TranslatePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="translate-container">
      <h1 className="translate-title" data-aos="fade-down">
        Let's Translate
      </h1>
      <p className="translate-subtitle" data-aos="fade-up">
        Anything with ease
      </p>

      {/* Translation Options */}
      <div className="translate-options">
        <Link to="/translator" className="option-card ai" data-aos="fade-right">
          <div className="icon"><FaBookOpen /></div>
          <div className="text">
            <h3>Translate AI</h3>
            <p>Let’s use AI easily</p>
          </div>
          <span className="arrow">➜</span>
        </Link>

        <Link to="/text-to-sign" className="option-card texttosign" data-aos="fade-left">
          <div className="icon"><FaHands /></div>
          <div className="text">
            <h3>Text into Sign</h3>
            <p>Convert Text into Sign</p>
          </div>
          <span className="arrow">➜</span>
        </Link>

        <Link to="/sign-to-text" className="option-card sign" data-aos="fade-right">
          <div className="icon"><FaHands /></div>
          <div className="text">
            <h3>Sign to Text</h3>
            <p>Convert signs into text</p>
          </div>
          <span className="arrow">➜</span>
        </Link>



        <Link to="/sign-to-number" className="option-card camera" data-aos="fade-left">
          <div className="icon"><FaCamera /></div>
          <div className="text">
            <h3>Camera</h3>
            <p>Scan and translate</p>
          </div>
          <span className="arrow">➜</span>
        </Link>

        <Link to="/speech-to-text" className="option-card voice" data-aos="fade-right">
          <div className="icon"><FaMicrophone /></div>
          <div className="text">
            <h3>Voice</h3>
            <p>Speak and you’ll understand</p>
          </div>
          <span className="arrow">➜</span>
        </Link>

      </div>

      {/* Embedded CSS */}
      <style>{`
        .translate-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(to bottom, #f7941d, #ffcc80);
          padding: 20px;
          text-align: center;
        }

        .translate-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: black;
          text-transform: capitalize;
        }

        .translate-subtitle {
          font-size: 1.2rem;
          color: gray;
          margin-bottom: 30px;
        }

        .translate-options {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
          max-width: 400px;
        }

        .option-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-radius: 15px;
          text-decoration: none;
          font-size: 1rem;
          font-weight: bold;
          color: black;
          transition: 0.3s ease-in-out;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          opacity: 0.9;
        }

        .option-card .icon {
          font-size: 1.5rem;
          padding: 10px;
          border-radius: 10px;
          transition: transform 0.3s;
        }

        .option-card:hover .icon {
          transform: scale(1.1);
        }

        .option-card:hover {
          transform: scale(1.05);
          opacity: 1;
          box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
        }

        .option-card .text {
          flex: 1;
          text-align: left;
          margin-left: 15px;
        }

        .option-card .arrow {
          font-size: 1.5rem;
          color: gray;
        }

        /* Different Colors for Each Card */
        .ai { background: #ffa726; }
        .camera { background: #b0bec5; }
        .voice { background: #8bc34a; }
        .sign { background: #ff7043; } /* Added a new color for sign to text */
        .texttosign { background: #8bc34a; }

        .sign .icon { background: rgba(0, 0, 0, 0.1); color: #d84315; }

        @media (max-width: 768px) {
          .translate-title { font-size: 2rem; }
          .translate-subtitle { font-size: 1rem; }
          .option-card { font-size: 0.9rem; padding: 15px; }
          .option-card .icon { font-size: 1.2rem; }
        }
      `}</style>
    </div>
  );
};

export default TranslatePage;
