import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [progress, setProgress] = useState(40); // Simulated progress

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []); // Ensure AOS initializes only once

  return (
    <div
      className="container-fluid text-white d-flex flex-column align-items-center justify-content-center vh-100"
      style={{ background: "linear-gradient(to bottom, #F4A261, #2A9D8F)" }}
    >
      <h2 className="text-center fw-bold" data-aos="fade-down">
        Welcome Back, User!
      </h2>
      <p className="text-center" data-aos="fade-up">
        Continue learning or explore new courses.
      </p>

      <div className="row w-75" data-aos="fade-up">
        <div className="col-md-6">
          <div className="card shadow-sm p-3 text-dark">
            <h5>Progress Summary</h5>
            <p>Courses Enrolled: 3 | Completed: 1</p>
            <div className="progress">
              <div
                className="progress-bar bg-success"
                style={{ width: `${progress}%` }}
              >
                {progress}% Completed
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm p-3 text-dark">
            <h5>Recommended Courses</h5>
            <ul>
              <li>Beginner Sign Language</li>
              <li>Advanced Hand Gestures</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="row w-75 mt-3">
        <div className="col-md-4" data-aos="fade-right">
          <div className="card shadow-sm p-3 text-dark">
            <h6>Start Learning</h6>
            <Link to="/courses" className="btn btn-primary w-100">
              Continue
            </Link>
          </div>
        </div>
        <div className="col-md-4" data-aos="fade-up">
          <div className="card shadow-sm p-3 text-dark">
            <h6>Assessments</h6>
            <button className="btn btn-secondary w-100">Take Test</button>
          </div>
        </div>
        <div className="col-md-4" data-aos="fade-left">
          <div className="card shadow-sm p-3 text-dark">
            <h6>Conversion Tools</h6>
            <button className="btn btn-info w-100">Use Tools</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
