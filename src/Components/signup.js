import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaTransgender,
  FaUserGraduate,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    gender: "",
    dob: "",
    location: "",
    password: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "loading", text: "Creating your account..." });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        gender: formData.gender,
        dob: formData.dob,
        location: formData.location,
        createdAt: new Date(),
      });

      setMessage({
        type: "success",
        text: "Sign-up Successful! 🎉 Redirecting...",
      });
      setTimeout(() => (window.location.href = "/dashboard"), 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Social Media Sign-up
  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        role: "student",
        createdAt: new Date(),
      });

      setMessage({
        type: "success",
        text: "Google Sign-up Successful! 🎉 Redirecting...",
      });
      setTimeout(() => (window.location.href = "/dashboard"), 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        role: "student",
        createdAt: new Date(),
      });

      setMessage({
        type: "success",
        text: "Facebook Sign-up Successful! 🎉 Redirecting...",
      });
      setTimeout(() => (window.location.href = "/dashboard"), 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card" data-aos="fade-up">
        <h2 className="text-center">
          Join <span className="brand">Kathanam</span>
        </h2>
        <p className="subtitle">Empower your learning journey today!</p>

        {message.text && (
          <div
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FaUserGraduate className="input-icon" />
            <select name="role" required onChange={handleChange}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
            </select>
          </div>

          <div className="input-group">
            <FaTransgender className="input-icon" />
            <select name="gender" required onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <FaBirthdayCake className="input-icon" />
            <input type="date" name="dob" required onChange={handleChange} />
          </div>

          <div className="input-group">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              name="location"
              placeholder="Location (City/Country)"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        <div className="social-signup">
          <button className="google-btn" onClick={handleGoogleSignUp}>
            <FaGoogle /> Sign Up with Google
          </button>
          <button className="facebook-btn" onClick={handleFacebookSignUp}>
            <FaFacebook /> Sign Up with Facebook
          </button>
        </div>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .signup-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 135vh;
          background: linear-gradient(135deg, #F4A261, #2A9D8F);
        }

        .signup-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.3);
          text-align: center;
          max-width: 380px;
          width: 100%;
        }

        .input-group {
          display: flex;
          align-items: center;
          background: #f8f9fa;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 12px;
          width: 100%;
        }

        .input-icon {
          margin-right: 10px;
          color: #2A9D8F;
        }

        input, select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .btn-submit {
          background-color: #2A9D8F; /* Same as the Google and Facebook button colors */
          color: white;
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-submit:hover {
          background-color: #264653;
        }

        .social-signup button {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          font-size: 16px;
        }

        .google-btn {
          background-color: #DB4437;
          color: white;
        }

        .facebook-btn {
          background-color: #4267B2;
          color: white;
        }

        .login-link {
          margin-top: 10px;
        }

        .login-link a {
          color: #2A9D8F;
        }
      `}</style>
    </div>
  );
};

export default SignUp;
