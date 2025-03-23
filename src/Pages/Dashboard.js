import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBook, FaCheckCircle, FaCertificate, FaClock
} from "react-icons/fa";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  const user = {
    name: "John Doe",
    profilePic: "https://via.placeholder.com/150", // Replace with actual user profile pic URL
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header Section */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-icons">
          <motion.span
            className="notification-icon"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔔
          </motion.span>
          <motion.img
            src={user.profilePic}
            alt="Profile"
            className="profile-pic"
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-container">
        {[
          { icon: <FaBook />, value: "5", label: "Ongoing", color: "#2563eb" },
          { icon: <FaCheckCircle />, value: "37", label: "Completed", color: "#10b981" },
          { icon: <FaCertificate />, value: "25", label: "Certificates", color: "#f59e0b" },
          { icon: <FaClock />, value: "705", label: "Hours Done", color: "#8b5cf6" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            data-aos="fade-up"
          >
            <div style={{ color: stat.color, fontSize: "24px" }}>{stat.icon}</div>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* My Courses Section */}
      <div className="my-courses">
        <h2>My Courses</h2>
        {[
          { title: "ASL", progress: "15/15", status: "Complete", level: "Intermediate", color: "green" },
          { title: "ISL", progress: "12/15", status: "Ongoing", level: "Beginner", color: "blue" },
          { title: "Autistic", progress: "8/20", status: "Ongoing", level: "Expert", color: "blue" },
        ].map((course, index) => (
          <motion.div
            key={index}
            className="course-card"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-aos="fade-up"
          >
            <h3>{course.title}</h3>
            <p>
              {course.progress} <span style={{ color: course.color, fontWeight: "bold" }}>{course.status}</span> - {course.level}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Course Topics & Continue Learning */}
      <div className="learning-container">
        <motion.div
          className="course-topics"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-aos="fade-right"
        >
          <h3>Course Topics</h3>
          <p>42 Total Courses</p>
        </motion.div>

        <motion.div
          className="continue-learning"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-aos="fade-left"
        >
          <h3>Continue Learning</h3>
          {["Sign Basics", "Cultural"].map((topic, index) => (
            <div key={index} className="learning-progress">
              <span>{topic}</span>
              <progress value={index === 0 ? 60 : 30} max="100"></progress>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        {[
          { label: "Home", emoji: "🏠", link: "/" },
          { label: "Courses", emoji: "📚", link: "/courses" },
          { label: "Translate", emoji: "🅰", link: "/translator" },
          { label: "Shorts", emoji: "🎥", link: "/shorts" },
          { label: "Profile", emoji: "👤", link: "/profile", active: true },
        ].map((nav, index) => (
          <Link key={index} to={nav.link} className={`nav-item ${nav.active ? "active" : ""}`}>
            {nav.emoji} {nav.label}
          </Link>
        ))}
      </div>

      {/* Styles */}
      <style>{`
        .dashboard-container {
          background: linear-gradient(180deg, #f97316, #facc15);
          min-height: 100vh;
          padding: 20px;
          color: black;
        }

        /* Header */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .header-icons {
          display: flex;
          align-items: center;
        }

        .notification-icon {
          font-size: 20px;
          margin-right: 15px;
          cursor: pointer;
        }

        .profile-pic {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        /* Stats */
        .stats-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .stat-card {
          background: white;
          border-radius: 10px;
          padding: 15px;
          text-align: center;
          width: 23%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .stat-card h3 {
          margin: 5px 0;
          font-size: 18px;
        }

        .stat-card p {
          font-size: 14px;
          color: gray;
        }

        /* My Courses */
        .course-card {
          background: white;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* Learning Section */
        .learning-container {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .course-topics, .continue-learning {
          background: white;
          padding: 15px;
          border-radius: 10px;
          width: 48%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* Bottom Navigation */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: white;
          display: flex;
          justify-content: space-around;
          padding: 10px 0;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        }

        .nav-item.active {
          color: orange;
          font-weight: bold;
        }
      `}</style>
    </motion.div>
  );
};

export default Dashboard;
