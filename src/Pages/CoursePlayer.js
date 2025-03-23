import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const courseData = {
  Beginner: {
    title: "ASL Beginner Course",
    description: "Learn the basics of ASL including alphabets and common phrases.",
    lessons: [
      { id: "fnFWAzd3Kfw", title: "Lesson 1: ASL Basics" },
    ],
  },
  Intermediate: {
    title: "ASL Intermediate Course",
    description: "Enhance your ASL skills with more complex sentences and grammar.",
    lessons: [
      { id: "WP1blVh1ZQM", title: "Lesson 1: ASL Intermediate Signs" },
    ],
  },
  Advanced: {
    title: "ASL Advanced Course",
    description: "Master ASL with fluent conversation practice and advanced techniques.",
    lessons: [
      { id: "WVZiA7-hDbg", title: "Lesson 1: Advanced Conversations" },
      { id: "Wtzawp0bd5k", title: "Lesson 2: Expressions & Emotions" },
      { id: "YIHHvMLkFcA", title: "Lesson 3: Storytelling in ASL" },
      { id: "RgUvB7wCtsc", title: "Lesson 4: Sentence Structuring" },
    ],
  },
};

const CoursePlayer = () => {
  const { level } = useParams();
  const course = courseData[level];

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("progress")) || {};
    setCompletedLessons(savedProgress[level] || []);
  }, [level]);

  const handleVideoEnd = () => {
    if (!completedLessons.includes(currentLessonIndex)) {
      const updatedCompleted = [...completedLessons, currentLessonIndex];
      setCompletedLessons(updatedCompleted);
      localStorage.setItem("progress", JSON.stringify({ ...completedLessons, [level]: updatedCompleted }));
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  return (
    <div className="course-container">
      {/* Sidebar with Lessons */}
      <aside className="course-sidebar">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-description">{course.description}</p>
        <ul className="lesson-list">
          {course.lessons.map((lesson, index) => (
            <li
              key={index}
              className={`lesson-item ${currentLessonIndex === index ? "active" : ""} ${completedLessons.includes(index) ? "completed" : ""}`}
              onClick={() => setCurrentLessonIndex(index)}
            >
              {completedLessons.includes(index) ? "✅ " : "📌 "} {lesson.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Video Player Section */}
      <div className="video-container">
        <h2 className="video-title">{course.lessons[currentLessonIndex].title}</h2>
        <iframe
          src={`https://www.youtube.com/embed/${course.lessons[currentLessonIndex].id}`}
          title="Course Video"
          className="video-player"
          allowFullScreen
          onEnded={handleVideoEnd}
        ></iframe>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <button onClick={handlePrevLesson} disabled={currentLessonIndex === 0}>⬅ Previous</button>
          <button onClick={handleNextLesson} disabled={currentLessonIndex === course.lessons.length - 1}>Next ➡</button>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${(completedLessons.length / course.lessons.length) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {completedLessons.length} / {course.lessons.length} Lessons Completed
        </p>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .course-container {
          display: flex;
          min-height: 100vh;
        }

        .course-sidebar {
          width: 25%;
          background: #f4f4f4;
          padding: 20px;
          border-right: 2px solid #ddd;
        }

        .course-title {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .course-description {
          font-size: 1rem;
          margin-bottom: 20px;
        }

        .lesson-list {
          list-style: none;
          padding: 0;
        }

        .lesson-item {
          padding: 10px;
          margin: 5px 0;
          background: #fff;
          border: 1px solid #ddd;
          cursor: pointer;
          transition: 0.3s;
        }

        .lesson-item:hover {
          background: #ddd;
        }

        .lesson-item.active {
          background: #ffa726;
          color: white;
          font-weight: bold;
        }

        .lesson-item.completed {
          text-decoration: line-through;
        }

        .video-container {
          width: 75%;
          padding: 20px;
        }

        .video-title {
          font-size: 1.4rem;
          margin-bottom: 10px;
        }

        .video-player {
          width: 100%;
          height: 450px;
          border-radius: 10px;
        }

        .nav-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .nav-buttons button {
          padding: 10px;
          font-size: 1rem;
          background: #2A9D8F;
          color: white;
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }

        .nav-buttons button:hover {
          background: #21867a;
        }

        .progress-bar-container {
          width: 100%;
          height: 8px;
          background: #ddd;
          border-radius: 5px;
          margin-top: 15px;
        }

        .progress-bar {
          height: 8px;
          background: #2A9D8F;
          transition: width 0.3s;
        }

        .progress-text {
          text-align: center;
          font-size: 1rem;
          margin-top: 5px;
        }

        @media (max-width: 768px) {
          .course-container {
            flex-direction: column;
          }
          .course-sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 2px solid #ddd;
          }
          .video-container {
            width: 100%;
          }
          .video-player {
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default CoursePlayer;
