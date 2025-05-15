import React from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MTrackerService from "../services/MTrackerService";

const EmotionQuestionarePage = () => {
  const navigate = useNavigate();

  const handleClick = async (emotion) => {
    try {
      const response = await MTrackerService.addMood(emotion);
      if(!response) {
        console.log(response)
      }
      if(response?.isAuthorized === false) {
        navigate("/")
      }
      if (response.status === 200) {
        navigate("/symptom-tracker/questionare/2");
      }
    } catch (error) {
      console.error("There was a problem adding your symptom:", error);
    }
  };

  return (
    <div className="emotion-questionare">
      <div className="emotion-questionare-container">
        <IoMdClose
          size={30}
          className="exit-btn"
          onClick={() => navigate("/mtracker")}
        />

        <>
          <h1 className="title">How are you feeling today?</h1>
        </>
        <ul className="emotions-list">
          {[
            { feeling: "Happy", icon: "😊" },
            { feeling: "Sad", icon: "😢" },
            { feeling: "Angry", icon: "😡" },
            { feeling: "Surprised", icon: "😲" },
            { feeling: "Neutral", icon: "😐" },
            { feeling: "Anxious", icon: "😟" },
            { feeling: "Excited", icon: "😄" },
            { feeling: "Tired", icon: "😴" },
            { feeling: "Confused", icon: "😕" },
            { feeling: "Grateful", icon: "🙏" },
            { feeling: "Loved", icon: "❤️" },
            { feeling: "Frustrated", icon: "😤" },
            { feeling: "Hopeful", icon: "🤞" },
            { feeling: "Lonely", icon: "🥺" },
            { feeling: "Proud", icon: "😌" },
          ].map((emotion, index) => (
            <li onClick={() => handleClick(emotion)} key={index}>
              <span className="emotion-background">{emotion.icon}</span>
              <span>{emotion.feeling}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmotionQuestionarePage;
