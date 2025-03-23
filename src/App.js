import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import About from "./Components/About";
import AboutUs from "./Pages/AboutUs";
import Courses from "./Pages/Courses";
import LevelSelection from "./Pages/LevelSelection";
import CoursePlayer from "./Pages/CoursePlayer";
import Login from "./Components/Login";
import Signup from "./Components/signup";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import SignToText from "./Components/SigntoText";
import TranslateAI from "./Pages/TranslateAI"; 
import PrivateRoute from "./Components/PrivateRoute";
import PageTransition from "./Components/PageTransition";
import AutisticKids from "./Pages/Autism Support & Learning";  
import CareersPage from "./Pages/CareersPage";
import Translator from "./Components/Translator";
import Blog from "./Pages/Blog";
import TranslatePage from "./Pages/TranslatePage";  
import SignToNumber from "./Components/SignToNumber";  
import SpeechToText from "./Pages/SpeechToText";  // ✅ NEW: Import Speech-to-Text Page
import TextToSignPage from "./Pages/TextToSignPage";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  // Initialize AOS (scroll animations)
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="content-wrapper">
        <Routes>
          {/* Main Page */}
          <Route path="/" element={<PageTransition><Hero /><About /></PageTransition>} />

          {/* About Us Page */}
          <Route path="/aboutus" element={<PageTransition><AboutUs /></PageTransition>} />

          {/* Blog Page */}
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />

          {/* Courses Page */}
          <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />

          {/* Level Selection Page */}
          <Route path="/level-selection/:courseId" element={<PageTransition><LevelSelection /></PageTransition>} />

          {/* Course Player Page */}
          <Route path="/course-player/:courseId/:level" element={<PageTransition><CoursePlayer /></PageTransition>} />

          {/* Login Page */}
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />

          {/* Signup Page */}
          <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />

          {/* Dashboard Page (Private) */}
          <Route path="/dashboard" element={<PrivateRoute><PageTransition><Dashboard /></PageTransition></PrivateRoute>} />

          {/* Profile Page (Private) */}
          <Route path="/profile" element={<PrivateRoute><PageTransition><Profile /></PageTransition></PrivateRoute>} />

          {/* Autism Support Page */}
          <Route path="/autism" element={<PageTransition><AutisticKids /></PageTransition>} />

          {/* Careers Page */}
          <Route path="/careers" element={<PageTransition><CareersPage /></PageTransition>} />

          {/* Translator Page */}
          <Route path="/translator" element={<PageTransition><Translator /></PageTransition>} />

          {/* Translate Page */}
          <Route path="/translate-ai" element={<PageTransition><TranslatePage /></PageTransition>} />

                    {/* Translate Page */}
          <Route path="/translate" element={<PageTransition><TranslatePage /></PageTransition>} />

          <Route path="/translate" element={<PageTransition><TranslateAI /></PageTransition>} />
          <Route path="/sign-to-text" element={<PageTransition><SignToText /></PageTransition>} />

          {/* Sign to Number Translator Page */}
          <Route path="/sign-to-number" element={<PageTransition><SignToNumber /></PageTransition>} />

          {/* ✅ NEW: Speech-to-Text Page */}
          <Route path="/speech-to-text" element={<PageTransition><SpeechToText /></PageTransition>} />

          <Route path="/text-to-sign" element={<PageTransition><TextToSignPage /></PageTransition>} />

          {/* 404 Page (Not Found) */}
          <Route path="*" element={<PageTransition><h2 className="text-center mt-5">404 - Page Not Found</h2></PageTransition>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
