import React, { useEffect, useState } from "react";
import "../../../shared/styles/settings.css";
import AuthService from "../../auth/services/authService";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccountDetailsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("********");
  const [userData, setUserData] = useState("");
  const [updateProfile, setUpdateProfile] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await AuthService.fetchUserData();
      setUserData(response.data);
    } catch (error) {
      console.error("There was an error: ", error);
    }
  };

  const handleUpdate = () => {
    setUpdateProfile(true);
  };

  const handleBack = () => {
    navigate("/home");
  };

  const handleSubmit = async (e) => {
    try {
      const response = await AuthService.updateUserProfile({
        currentPassword,
        newPassword,
      });
      if (response.status !== 200) {
        return setMessage(response.message || "Failed to update profile");
      }
      if (response.status === 401) {
        setMessage("Unauthorized. Please log in again.");
        navigate("/login");
        return;
      }

      setMessage("Profile updated successfully!");
      setUpdateProfile(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("There was an error submitting the form: ", error);
      setMessage("Failed to update profile. Please try again.");
    }
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
          {!updateProfile ? (
            <p className="save-button" onClick={handleUpdate}>
              {" "}
              Update
            </p>
          ) : (
            <button className="save-button" onClick={handleSubmit}>
              Save
            </button>
          )}
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
          {updateProfile && (
            <React.Fragment>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="form-input"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="form-input"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </React.Fragment>
          )}
        </form>
        {message && (
          <div className="message">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDetailsPage;
