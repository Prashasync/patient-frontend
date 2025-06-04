import React, { useEffect, useState } from "react";
import axios from "axios";
import NewPasswordForm from "./NewPasswordForm";
import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";

const SendPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  const requestOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/send-password-recovery`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        setStatus("Please refresh the page and try again");
        return;
      }
      localStorage.setItem("email", email);
      setStep(2);
      setStatus(
        "If an account exists for that email, a password reset link has been sent."
      );
    } catch (error) {
      setStatus(error.response?.data?.message || "An error occurred.");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.verifyRecoveryOtp({
        email: localStorage.getItem("email"),
        otp,
      });
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      localStorage.removeItem("email");
      setStep(3);
      setStatus("Reset link has been sent to your email.");
    } catch (error) {
      setStatus(error.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div className="forgot-password">
      {step === 1 && (
        <form onSubmit={requestOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send OTP</button>
          <button onClick={handleRedirect}>Back</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={verifyOtp}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            required
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Verify OTP</button>
          <button onClick={handleRedirect}>Back</button>
        </form>
      )}

      {step === 3 && <NewPasswordForm email={email} />}

      {status && <p>{status}</p>}
    </div>
  );
};

export default SendPasswordRequest;
