import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../auth/services/authService";
import PropTypes from "prop-types";

const EmailVerification = ({ user }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

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
      if (nextInput) nextInput.focus();
    }
    if (value && index === 5) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.verifyOtp({
        otp: otp.join(""),
        email: user,
      });

      if (response.status !== 200) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
        return; 
      }
      navigate("/onboarding");
    } catch (error) {
      console.error("Error verifying email:", error);
      setMessage("An error occurred while verifying the email.");
    }
  };

  return (
    <div className="email-verification">
      <form onSubmit={handleSubmit} className="otp-form">
        <h2>Email Verification</h2>
        <p>Please enter the OTP sent to your email:</p>
        <div className="otp-inputs">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={otp[index] || ""}
              onChange={(e) => handleOtpChange(e, index)}
            />
          ))}
        </div>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>
    </div>
  );
};

EmailVerification.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default EmailVerification;
