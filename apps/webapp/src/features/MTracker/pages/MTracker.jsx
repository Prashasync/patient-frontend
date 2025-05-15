import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import AddSymptom from "../components/AddSymptom";
import EmotionHistory from "../components/EmotionsHistory";
import { useNavigate } from "react-router-dom";
import Emoji from "../components/Emotion";
import "../../../shared/styles/symptoms.css";
import MTrackerService from "../services/MTrackerService";

const SymptomTrackerPage = () => {
  const navigate = useNavigate();
  const [symptomTrackerHistory, setSymptomTrackerHistory] = useState([]);

  const handleClick = () => {
    navigate("/symptom-tracker/questionare/1");
  };

  const retreiveSymptomTrackerHistory = async () => {
    try {
      const response = await MTrackerService.getMoodHistory();
      if (response.isAuthorized === false) {
        navigate("/");
      }
      if (response.status === 200) {
        console.log(response)
        setSymptomTrackerHistory(response.data.symptomHistory);
      }
    } catch (error) {
      console.error("Error fetching symptom tracker history:", error);
    }
  };

  useEffect(() => {
    retreiveSymptomTrackerHistory();
  }, [navigate]);

  return (
    <div className="symptom-tracker">
      <h1>Symptom Tracking</h1>
      <Background />
      <Emoji symptomTrackerHistory={symptomTrackerHistory} />
      <AddSymptom handleClick={handleClick} />
      <EmotionHistory symptomTrackerHistory={symptomTrackerHistory} />
    </div>
  );
};

export default SymptomTrackerPage;
