import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import AddSymptom from "../components/AddSymptom";
import EmotionHistory from "../components/EmotionsHistory";
import { useNavigate } from "react-router-dom";
import Emoji from "../components/Emotion";
import "../../../shared/styles/symptoms.css";
import Header from "../../../shared/components/Header";
import axios from "axios";
import BottomNavBar from "../../../shared/components/BottomNavBar";

const SymptomTrackerPage = () => {
  const navigate = useNavigate();
  const [symptomTrackerHistory, setSymptomTrackerHistory] = useState("");

  const handleClick = () => {
    navigate("/symptom-tracker/questionare/1");
  };

  const retreiveSymptomTrackerHistory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/symptoms/history`,
        {
          // withCredentials: true
        }
      );
      if (response.status === 200) {
        setSymptomTrackerHistory(response.data.history);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching symptom tracker history:", error);
      }
    }
  };

  useEffect(() => {
    retreiveSymptomTrackerHistory();
  }, [navigate]);

  return (
    <div className="symptom-tracker">
      <Header />
      <h1>Symptom Tracking</h1>
      <Background />
      <Emoji symptomTrackerHistory={symptomTrackerHistory} />
      <AddSymptom handleClick={handleClick} />
      <EmotionHistory symptomTrackerHistory={symptomTrackerHistory} />
      <BottomNavBar />
    </div>
  );
};

export default SymptomTrackerPage;
