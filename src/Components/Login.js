import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineCheck, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setMessage({ type: "success", text: "Login successful! Redirecting..." });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setMessage({ type: "success", text: `Welcome back, ${result.user.displayName}! Redirecting...` });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setMessage({ type: "success", text: `Welcome back, ${result.user.displayName}! Redirecting...` });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <section className="login-section">
      <div className="curved-bg"></div>

      <div className="login-container">
        <h2 className="welcome-text" data-aos="fade-down">
          Welcome Back! <br /> Glad to see you, Again!
        </h2>

        {message.text && (
          <div
            className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="input-group" data-aos="fade-up">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required
              onChange={handleChange}
            />
            {formData.email && <AiOutlineCheck className="input-check" />}
          </div>

          <div className="input-group" data-aos="fade-up">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            {showPassword ? (
              <AiOutlineEyeInvisible
                className="toggle-password"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <AiOutlineEye
                className="toggle-password"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <a href="#" className="forgot-password" data-aos="fade-up">
            Forgot Password?
          </a>

          <button className="login-btn" type="submit" disabled={loading} data-aos="fade-up">
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="divider" data-aos="fade-up">
          <span>or Login with</span>
        </div>

        <div className="social-icons" data-aos="fade-up">
          <button className="social-icon facebook" onClick={handleFacebookLogin}>
            <FaFacebook /> Login with Facebook
          </button>
          <button className="social-icon google" onClick={handleGoogleLogin}>
            <FaGoogle /> Login with Google
          </button>
        </div>

        <p className="register-text" data-aos="fade-up">
          Don't have an account? <a href="/signup">Register Now</a>
        </p>
      </div>

      <style>{`
        .login-section {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
        }

        .curved-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 40%;
          background: linear-gradient(to right, #e6761b, #db6d17);
          border-bottom-left-radius: 50% 20%;
          border-bottom-right-radius: 50% 20%;
        }

        .login-container {
          position: relative;
          background: white;
          padding: 30px;
          width: 90%;
          max-width: 400px;
          border-radius: 10px;
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
          text-align: center;
          z-index: 1;
        }

        .welcome-text {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }

        .input-group {
          display: flex;
          align-items: center;
          background: #f1f1f1;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .input-group input {
          flex: 1;
          border: none;
          background: none;
          outline: none;
          font-size: 1rem;
          padding: 5px;
        }

        .input-icon {
          color: #555;
          margin-right: 10px;
        }

        .input-check {
          color: green;
        }

        .toggle-password {
          color: #999;
          cursor: pointer;
        }

        .forgot-password {
          text-align: right;
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 15px;
        }

        .login-btn {
          background: #28a745;
          color: white;
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          font-weight: bold;
          border: none;
          border-radius: 25px;
          cursor: pointer;
        }

        .login-btn:hover {
          background: #218838;
        }

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 15px 0;
          color: #999;
          font-size: 0.9rem;
        }

        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #ccc;
          margin: 0 10px;
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 15px;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: bold;
          color: white;
          width: 140px;
          height: 40px;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.3s ease-in-out;
          text-decoration: none;
        }

        .facebook {
          background-color: #4267b2;
        }

        .google {
          background-color: #db4437;
        }

        .social-icon:hover {
          transform: scale(1.05);
        }

        .register-text {
          margin-top: 15px;
          font-size: 0.9rem;
          color: #555;
        }

        .register-text a {
          color: #007bff;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};

export default Login;
