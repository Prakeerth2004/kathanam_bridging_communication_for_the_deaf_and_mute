import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "bootstrap/dist/css/bootstrap.min.css";

const levelData = {
  Beginner: {
    description: "Learn the basics of ASL, including the alphabet, common words, and simple phrases.",
    videoId: "fnFWAzd3Kfw",
    thumbnail: "https://img.youtube.com/vi/fnFWAzd3Kfw/hqdefault.jpg",
  },
  Intermediate: {
    description: "Enhance your ASL skills with more complex sentences and grammar structures.",
    videoId: "WP1blVh1ZQM",
    thumbnail: "https://img.youtube.com/vi/WP1blVh1ZQM/hqdefault.jpg",
  },
  Advanced: {
    description: "Master ASL with fluent conversation practice and advanced signing techniques.",
    playlistId: "PLC26PqZoC0AkS5f-GnxIzYs1yiBK7c4wW",
    thumbnail: "https://img.youtube.com/vi/fnFWAzd3Kfw/hqdefault.jpg", // Placeholder thumbnail
  },
};

const LevelSelection = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Explore ${courseId.toUpperCase()} Course`;
  }, [courseId]);

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #264653, #2A9D8F)",
        minHeight: "100vh",
        padding: "50px 0",
      }}
    >
      <h2
        className="text-center text-white"
        style={{
          textShadow: "3px 3px 10px rgba(0, 0, 0, 0.5)",
          fontWeight: "bold",
          fontSize: "2.5rem",
        }}
      >
        Explore {courseId.toUpperCase()} Course
      </h2>

      <div className="row w-75 mt-4">
        {Object.entries(levelData).map(([level, { description, videoId, playlistId, thumbnail }], index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div
              className="card shadow-lg text-center"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "15px",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                overflow: "hidden",
                animation: "fadeIn 1s ease-in-out",
              }}
            >
              {/* Video Thumbnail */}
              <img
                src={thumbnail}
                alt={`${level} Course`}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover", cursor: "pointer" }}
                onClick={() => navigate(`/course-player/${courseId}/${level}`)}
              />

              {/* Card Body */}
              <div className="card-body">
                <h4 className="text-dark" style={{ fontWeight: "bold" }}>{level} Level</h4>
                <p className="text-secondary" style={{ fontSize: "1rem" }}>{description}</p>
                <button
                  className="btn w-100 mt-2"
                  style={{
                    fontSize: "1.2rem",
                    padding: "12px",
                    backgroundColor: "#F4A261",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    transition: "all 0.3s ease",
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate(`/course-player/${courseId}/${level}`)}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#2A9D8F")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#F4A261")}
                >
                  Start {level} Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;
