import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function NewPasswordForm({ email }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      return setMessage("Passwords do not match");
    }

    try {
      const response = await AuthService.resetPassword({
        email,
        password,
      });
      if (response.status !== 200) {
        setMessage("Error resetting password");
        return;
      }
      setMessage("Password reset successfully");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <form onSubmit={handleReset}>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
}

NewPasswordForm.propTypes = {
  email: PropTypes.string.isRequired,
};
