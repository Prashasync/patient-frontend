import React from "react";
import "../../../shared/styles/splashScreen1.css";
import { useNavigate } from "react-router-dom";
import LottieAnimation from "../../../assets/LottieAnimation";

const SplashScreen1 = () => {
  const navigate = useNavigate();

  return (
    <div className="splash-container1">
      <LottieAnimation />
      <div className="text-section">
        <h1>Welcome to Prasha sync</h1>
        <h2>Your Mental Wellness, Simplified</h2>
        <p>
          Track your mood, monitor symptoms, and get personalized insights to
          improve your well-being.
        </p>
      </div>
      <button
        className="get-started-btn"
        onClick={() => navigate("/splashscreen2")}
      >
        Get Started
      </button>
      <p className="login-link">
        Already have an account?
        <span
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default SplashScreen1;
