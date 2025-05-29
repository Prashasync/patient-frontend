import React, { useEffect, useState } from "react";
import "../../../shared/styles/settings.css";
import AuthService from "../../auth/services/authService";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccountDetailsPage = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("******@example.com");
  const [phone, setPhone] = useState("+1 9876 543 210");
  const [password, setPassword] = useState("********");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await AuthService.fetchUserData();
      setUserData(response.data);
    } catch (error) {
      console.error("There was an error: ", error);
    }
  };

  const handleBack = () => {
    navigate("/home");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="account-container">
      <div className="account-card">
        <div className="account-header">
          <button onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <h2 className="account-title">Account details</h2>
          <button className="save-button">Save</button>
        </div>

        <div className="profile-section">
          <div className="profile-image-wrapper">
            <img
              src="https://via.placeholder.com/100"
              className="profile-image"
            />
            <label className="upload-label">
              <input type="file" className="file-input" disabled />
              <span className="camera-icon">📷</span>
            </label>
          </div>
          <h3 className="profile-name">
            {userData?.first_name + " " + userData?.last_name}
          </h3>
          <p className="profile-email">{email}</p>
        </div>

        <form className="form-section">
          <div className="form-group">
            <label>Your Name</label>
            <input
              value={userData?.first_name + " " + userData?.last_name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              disabled
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              disabled
            />
          </div>

          <div className="form-group">
            <label>Phone no</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              disabled
            />
          </div>

          <div className="form-group">
            <label>Change Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              disabled
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetailsPage;
