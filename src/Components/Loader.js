import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="loader-container">
      {/* Circular Spinner */}
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />

      {/* Bouncing Dots */}
      <div className="dots-container">
        <motion.span
          className="dot"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        />
        <motion.span
          className="dot"
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
        <motion.span
          className="dot"
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
      </div>

      <p className="loading-text">Loading...</p>

      {/* Embedded CSS */}
      <style>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          font-family: Arial, sans-serif;
        }

        /* Spinning Circular Loader */
        .spinner {
          width: 50px;
          height: 50px;
          border: 6px solid rgba(255, 255, 255, 0.3);
          border-top-color: #f4a261;
          border-radius: 50%;
          margin-bottom: 15px;
        }

        /* Bouncing Dots */
        .dots-container {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .dot {
          width: 12px;
          height: 12px;
          background-color: #2a9d8f;
          border-radius: 50%;
        }

        /* Loading Text */
        .loading-text {
          font-size: 1.2rem;
          font-weight: bold;
          color: #f4a261;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Loader;
