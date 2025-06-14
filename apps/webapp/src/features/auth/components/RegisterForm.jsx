import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/authService";

const RegisterForm = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.verify_password) {
      setMessage("Passwords do not match.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>/?]).{8,}$/.test(
        formData.password
      )
    ) {
      setMessage(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      setTimeout(() => setMessage(""), 4000);
      return;
    }

    formData.email = formData.email.toLowerCase();
    const response = await AuthService.registerUser(formData);

    if (response.status === 200) {
      navigate("/otp");
    } else {
      setMessage(response.data.message || "Registration failed.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <select
            onChange={handleChange}
            defaultValue=""
            id="title"
            name="title"
            className="custom-select"
          >
            <option value="" disabled>
              Select your title
            </option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mx.">Mx.</option>
            <option value="Dr.">Dr.</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            required
            id="first_name"
            name="first_name"
            type="text"
            placeholder="Enter your first name"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            required
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Enter your last name"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            onChange={handleChange}
            defaultValue=""
            name="gender"
            id="gender"
            className="custom-select"
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            required
            autoComplete="username"
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
            autoComplete="current-password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor=""> Verify Password</label>
          <input
            required
            autoComplete="current-password"
            id="verify_password"
            name="verify_password"
            type="password"
            placeholder="Verify your password"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="primary-button">
          Continue
        </button>

        <div className="more_options">
          <Link to="/login">Already A User?</Link>
        </div>
        {message && <p className="error-message">{message}</p>}
        <p>By clicking you accept the terms of the Privacy Policy</p>
      </form>
    </>
  );
};

export default RegisterForm;
