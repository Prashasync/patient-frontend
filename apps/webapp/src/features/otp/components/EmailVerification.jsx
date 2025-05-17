import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../auth/services/authService";
import PropTypes from "prop-types";

const EmailVerification = ({ user }) => {
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const email = localStorage.getItem("email");
      await AuthService.sendOtp(email);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      const nextInput = document.querySelector(
        `.otp-inputs input:nth-child(${index + 2})`
      );
      nextInput?.focus();
    }

    if (!value && index > 0) {
      const prevInput = document.querySelector(
        `.otp-inputs input:nth-child(${index})`
      );
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.verifyOtp({
        otp: otp.join(""),
        email: user,
        role: "ACCOUNT_VERIFICATION",
      });

      setMessage(response.data.message);

      if (response.status !== 200) {
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      navigate("/onboarding");
    } catch (error) {
      console.error("Error verifying email:", error);
      setMessage("An error occurred while verifying the email.");
    }
  };

  // Auto-submit when OTP is fully filled
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      const timeout = setTimeout(() => {
        document.querySelector("form.otp-form")?.requestSubmit();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [otp]);

  useEffect(() => {
    sendOtp();
  }, []);

  return (
    <div className="email-verification">
      <form onSubmit={handleSubmit} className="otp-form">
        <h2>Email Verification</h2>
        <p>Please enter the OTP sent to your email:</p>
        <div className="otp-inputs" style={{ display: "flex", gap: "0.5rem" }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              style={{
                width: "2rem",
                height: "2rem",
                textAlign: "center",
                fontSize: "1.5rem",
              }}
            />
          ))}
        </div>
        {message && (
          <p style={{ color: "red", marginTop: "1rem" }}>{message}</p>
        )}
      </form>
    </div>
  );
};

EmailVerification.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default EmailVerification;
