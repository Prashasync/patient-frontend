import axios from "axios";
import React, { useState } from "react";

const PhoneNumberInput = ({
  countryCode,
  phoneNumber,
  setPhoneNumber,
  setCountryCode,
  setShowOTP,
}) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const countryCodes = [
    { code: "+1", label: "United States (+1)" },
    { code: "+44", label: "United Kingdom (+44)" },
    { code: "+91", label: "India (+91)" },
    { code: "+61", label: "Australia (+61)" },
    { code: "+81", label: "Japan (+81)" },
    { code: "+33", label: "France (+33)" },
  ];

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/\D/g, "");
    setPhoneNumber(cleanedValue);

    // add number on successful otp verification

    if (cleanedValue.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
    } else {
      setError("");
    }
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!countryCode || !phoneNumber || error) {
      setError("Please complete all fields with valid information.");
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/otpVerification/send-otp",
        { countryCode, phoneNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        }
      );
      if (response.status !== 200) {
        setMessage(response.data.error);
        return;
      }
      setShowOTP(true);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="phone-input-container">
      <h2>Enter Your Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="country_code">Country Code</label>
          <select
            id="country_code"
            name="country_code"
            value={countryCode}
            onChange={handleCountryCodeChange}
            required
          >
            <option value="">Select your country code</option>
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            placeholder="555-555-5555"
            value={phoneNumber}
            onChange={handlePhoneChange}
            required
            autoComplete="tel"
          />
          {error && <p className="error-message">{error}</p>}
        </div>

        <button type="submit" className="primary-button">
          Submit
        </button>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default PhoneNumberInput;
