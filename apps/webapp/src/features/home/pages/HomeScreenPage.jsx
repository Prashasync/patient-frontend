import React, { useEffect, useState } from "react";
import "../../../shared/styles/bottomNavBar.css";
import "../../../shared/styles/homeScreenPage.css";
import Notifications from "../components/Notifications";
import AuthService from "../../auth/services/authService";
import { Link, useNavigate } from "react-router-dom";
import AiChatBot from "../../chat/components/AiChatBotIcon";
import MTrackerService from "../../MTracker/services/MTrackerService";
import HeaderIcons from "../../../assets/HeaderIcons";

const HomeScreenPage = () => {
  const [patient, setPatient] = useState(null);
  const [inSights, setInSights] = useState(null);
  const [moodScore, setmoodScore] = useState(null);
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

  const fetchSymptomTracker = async () => {
    try {
      const response = await MTrackerService.getMoodHistory();
      setInSights(response?.data.symptomHistory);
    } catch (error) {
      console.error("There was an error: ", error);
    }
  };

  const fetchMoodScore = async () => {
    try {
      const response = await MTrackerService.getMoodScore(patient?.patient_id);
      setmoodScore(response.mood_score);
    } catch (error) {
      console.error("Error calling mood score", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchSymptomTracker();
  }, []);

  useEffect(() => {
    if (patient && patient.patient_id) {
      fetchMoodScore();
    }
  }, [patient]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-container">
      <HeaderIcons />
      <div className="greeting-text">
        Hello, {patient && `${patient.first_name} ${patient.last_name}`}.<br />
        You’ve taken a step to care for yourself.
      </div>
      <div className="card-grid">
        <div className="card card-gray">
          <p>
            {inSights && inSights.length > 0 ? inSights[0]?.emoji_icon : "😊"}
          </p>
          {!inSights ? (
            <span>No Mood!</span>
          ) : (
            <Link to="/mtracker">
              <span>You look {inSights[0]?.feelings}</span>
            </Link>
          )}
        </div>
        <div className="card card-gray">
          <span style={{ fontWeight: 600, fontSize: 48 }}>
            {moodScore ? moodScore : 50}
          </span>
          <span>Mood Score</span>
        </div>
      </div>
      <Notifications />
      <AiChatBot />
    </div>
  );
};

export default HomeScreenPage;
