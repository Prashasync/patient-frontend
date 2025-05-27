import React from "react";
import "../../../shared/styles/forgotPassword.css";
import SendPasswordRequest from "../components/SendPasswordRequest";

const ForgotPasswordPage = () => {
  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2 className="forgot-title">Password Reset</h2>
        <SendPasswordRequest />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
