import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 }); // Initialize AOS animation
  }, []);

  // YouTube Thumbnail
  const youtubeVideoId = "JPV-vboWfhY"; // Extracted from YouTube link
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

  return (
    <section className="about-section">
      <div className="container">
        {/* Stats Section */}
        <div className="stats" data-aos="fade-up">
          <div className="stat">
            <h2>
              15K<span className="plus">+</span>
            </h2>
            <p>Students</p>
          </div>
          <div className="stat">
            <h2>
              75<span className="percent">%</span>
            </h2>
            <p>Total success</p>
          </div>
          <div className="stat">
            <h2>35</h2>
            <p>Main questions</p>
          </div>
          <div className="stat">
            <h2>26</h2>
            <p>Chief experts</p>
          </div>
        </div>

        {/* About Description */}
        <div className="about-text" data-aos="fade-up">
          <h3>
            <span className="highlight">What is</span> KATHANAM?
          </h3>
          <p>
            KATHANAM is an innovative application designed to empower deaf and
            mute individuals by bridging communication gaps and enhancing their
            learning capabilities. The app provides interactive modules to teach
            sign language, improve vocabulary, and develop written communication
            skills through gamified and visual approaches.
          </p>
        </div>

        {/* Images Section */}
        <div className="about-images">
          <div className="image-box" data-aos="fade-right">
            <img src="/instructor.png" alt="For Instructors" />
            <p className="overlay-text">FOR INSTRUCTORS</p>
          </div>
          <div className="image-box" data-aos="fade-left">
            <img src="/student.png" alt="For Students" />
            <p className="overlay-text">FOR STUDENTS</p>
          </div>
        </div>

        {/* New Section - YouTube Video & Text */}
        <div className="about-video-section" data-aos="fade-up">
          <div className="about-text">
            <h2>
              <span className="highlight-green">Everything</span> you can do in
              a physical classroom,
              <span className="highlight-blue"> you can do with KATHANAM</span>
            </h2>
            <p>
              With a focus on accessibility, community support, and progress
              tracking, KATHANAM aims to foster independence, inclusivity, and
              confidence in its users, creating a transformative impact in their
              personal and professional lives.
            </p>
            <a href="#" className="learn-more">
              Learn more
            </a>
          </div>

          {/* Video Thumbnail */}
          <div
            className="video-thumbnail"
            data-aos="fade-left"
            onClick={() =>
              window.open(`https://youtu.be/${youtubeVideoId}`, "_blank")
            }
          >
            <img src={thumbnailUrl} alt="YouTube Video" />
            <div className="play-button">▶</div>
          </div>
        </div>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .about-section {
          text-align: center;
          padding: 60px 20px;
          background: white;
        }

        .stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-bottom: 40px;
        }

        .stat {
          text-align: center;
        }

        .stat h2 {
          font-size: 2.5rem;
          font-weight: bold;
          color: #198754;
        }

        .stat p {
          font-size: 1rem;
          color: #555;
        }

        .plus {
          color: #40c9a2;
        }

        .percent {
          color: #ff6600;
        }

        .about-text {
          max-width: 700px;
          margin: 0 auto;
        }

        .about-text h3 {
          font-size: 1.8rem;
          font-weight: bold;
          color: #222;
        }

        .highlight {
          color: #40c9a2;
        }

        .about-text p {
          font-size: 1rem;
          color: #555;
          line-height: 1.6;
        }

        .about-images {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 40px;
        }

        .image-box {
          position: relative;
          width: 250px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }

        .image-box img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }

        .overlay-text {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 0.9rem;
        }

        /* New Section */
        .about-video-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 60px;
          gap: 40px;
        }

        .highlight-green {
          color: #198754;
          font-weight: bold;
        }

        .highlight-blue {
          color: #1e40af;
          font-weight: bold;
        }

        .video-thumbnail {
          position: relative;
          width: 380px;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }

        .video-thumbnail img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.8);
          color: #1e40af;
          font-size: 2rem;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: bold;
        }

        .learn-more {
          color: #1e40af;
          text-decoration: none;
          font-weight: bold;
          display: inline-block;
          margin-top: 10px;
        }

        .learn-more:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .stats {
            flex-direction: column;
            align-items: center;
          }

          .about-images {
            flex-direction: column;
            align-items: center;
          }

          .about-video-section {
            flex-direction: column;
            text-align: center;
          }

          .video-thumbnail {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
