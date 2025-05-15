import React, { useEffect, useState } from "react";
import "../../../shared/styles/bottomNavBar.css";
import "../../../shared/styles/homeScreenPage.css";
import gridIcon from "../../../assets/icons/grid-line.svg";
import searchIcon from "../../../assets/icons/search_line.svg";
import bellIcon from "../../../assets/icons/Union.png";
import youlookHappy from "../../../assets/icons/youlookHappy.svg";
import heartHealth from "../../../assets/icons/heartHealth.svg";
import Notifications from "../components/Notifications";
import AuthService from "../../auth/services/authService";
import { useNavigate } from "react-router-dom";
import AiChatBot from "../../chat/components/AiChatBotIcon";

const HomeScreenPage = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await AuthService.fetchUserData();
      if (response.status !== 200) {
        navigate("/");
      }
      setPatient(response.data);
    } catch (error) {
      console.error("There was an error", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <button>
          <img src={gridIcon} alt="Menu" className="header-button-icon" />
        </button>
        <div className="header-buttons">
          <button>
            <img src={searchIcon} alt="Search" className="header-button-icon" />
          </button>
          <button>
            <img
              src={bellIcon}
              alt="Notifications"
              className="header-button-icon"
            />
          </button>
        </div>
      </div>
      <div className="greeting-text">
        Hello, {patient && `${patient.first_name} ${patient.last_name}`}.<br />
        You’ve taken a step to care for yourself.
      </div>
      <div className="card-grid">
        <div className="card card-gray">
          <img src={youlookHappy} alt="Mood" />
        </div>
        <div className="card card-purple">
          <img src={heartHealth} alt="Heart Health" />
        </div>
      </div>
      <Notifications />
      <AiChatBot />
    </div>
  );
};

export default HomeScreenPage;
