import React, { useEffect, useState } from "react";
import "../../../shared/styles/settings.css";
import { FaUser, FaBell, FaSlidersH, FaSignOutAlt } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AuthService from "../../auth/services/authService";

const SettingsItem = ({ icon, title, subtitle, onClick }) => (
  <div className="settings-item" onClick={onClick}>
    <div className="settings-left">
      <div className="settings-icon">{icon}</div>
      <div className="settings-text">
        <div className="settings-title">{title}</div>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>
    </div>
    <IoChevronForward className="chevron" />
  </div>
);

const SettingsAccount = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleLogout = async () => {
    const response = await AuthService.logout();
    if (response.status === 200) {
      localStorage.clear();
      navigate("/");
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await AuthService.fetchUserData();
      setUserData(response.data);
    } catch (error) {
      console.error("There was an error: ", error);
    }
  };

  const handleRedirectToAccount = () => {
    navigate(`/account-details`);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="settings-container">
      <h2 className="settings-header">Settings & Account</h2>

      <div className="section">
        <SettingsItem
          onClick={handleRedirectToAccount}
          icon={<FaUser />}
          title={userData?.first_name + " " + userData?.last_name}
          subtitle="Personal Info"
        />
      </div>

      <div className="section">
        <SettingsItem icon={<FaBell />} title="Notifications" />
        <SettingsItem icon={<FaSlidersH />} title="Preferences" />
      </div>

      <div className="section">
        <SettingsItem
          onClick={handleLogout}
          icon={<FaSignOutAlt />}
          title="Logout"
        />
      </div>
    </div>
  );
};

export default SettingsAccount;
