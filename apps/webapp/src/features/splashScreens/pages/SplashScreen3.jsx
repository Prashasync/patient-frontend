import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../shared/styles/splashScreen3.css";
import splashVideo from "../../../assets/videos/splash3-animation.mp4";

const SplashScreen3 = () => {
  const navigate = useNavigate();

  return (
    <div className="splash3-container">
      <div className="text-section">
        <h1>Connect with Experts</h1>
      </div>

      <div className="video-wrapper">
        <video autoPlay loop muted playsInline className="splash-video">
          <source src={splashVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="description-section">
        <p>
          Book appointments, follow treatment plans, and get expert guidance—all
          in one place.
        </p>
      </div>

      <div className="button-section">
        <button className="letsgo-btn" onClick={() => navigate("/register")}>
          Let’s Go
        </button>
      </div>
    </div>
  );
};

export default SplashScreen3;
