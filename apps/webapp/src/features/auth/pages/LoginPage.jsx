import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../shared/styles/login.css";
import GoogleAuth from "../../../shared/components/GoogleAuth.jsx";
import AuthService from "../services/authService.js";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData.email));
    try {
      const response = await AuthService.loginUser(formData);

      if (response.message === "NOT_VERIFIED") {
        navigate("/otp");
        return;
      }

      if (response.status !== 200) {
        setError(response.message || "Login failed. Please try again.");
        setTimeout(() => setError(""), 3000);
        localStorage.removeItem("user");
        return;
      }

      navigate("/onboarding");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          `${err.response?.data?.message || "Login failed"}. Please try again.`
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h2>
          Welcome! <br /> Sign in to continue
        </h2>
        <form onSubmit={handleSubmit} className="login-container-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              required
              id="email"
              name="email"
              type="text"
              placeholder="Enter your email or phone number"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              required
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="primary-button">
            Continue
          </button>

          <GoogleAuth />
        </form>

        <Link to="/password-reset">Forgot Password?</Link>
        <p>
          Need an account? <Link to="/register">Sign up</Link>
        </p>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
