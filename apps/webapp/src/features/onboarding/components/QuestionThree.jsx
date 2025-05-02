import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import OnboardingService from "../services/onboardingServices";

const QuestionThree = ({ setCurrentQuestion }) => {
  const [reminderChoice, setReminderChoice] = useState("");
  const [reminderTime, setReminderTime] = useState("8:00 AM");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    setCurrentQuestion(2);
  };

  const handleRadioChange = (e) => {
    setReminderChoice(e.target.value);
  };

  const handleTimeChange = (e) => {
    setReminderTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await OnboardingService.postOnboardingData({
        question_number: 3,
        reminder_choice: reminderChoice,
        reminder_time: reminderTime,
      });
      if (response.status !== 200) {
        setMessage(response.data.error);
        return;
      }
      navigate("/home");
    } catch (error) {
      console.error(error);
      console.log("There was an error storigng your 3rd response", error);
    }
  };

  return (
    <div className="questions">
      <div className="sub-title">
        <h2>Daily Mood Tracking Reminder</h2>
        <h3>Would you like a gentle reminder to track your mood every day?</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="reminder-container">
          <label htmlFor="reminder-yes">Yes</label>
          <input
            type="radio"
            name="reminder"
            id="reminder-yes"
            value="yes"
            checked={reminderChoice === "yes"}
            onChange={handleRadioChange}
          />
        </div>

        {reminderChoice === "yes" && (
          <div className="time-selection">
            <h4>Remind me at:</h4>
            <select
              name="reminder-time"
              id="reminder-time"
              value={reminderTime}
              onChange={handleTimeChange}
            >
              <option value="8:00 AM">8:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
              <option value="9:00 PM">9:00 PM</option>
            </select>
          </div>
        )}

        <div className="reminder-container">
          <label htmlFor="reminder-no">No</label>
          <input
            type="radio"
            name="reminder"
            id="reminder-no"
            value="no"
            checked={reminderChoice === "no"}
            onChange={handleRadioChange}
          />
        </div>

        <div className="redirect-options">
          <button onClick={handleBack} type="button">
            Back
          </button>
          <button type="submit" className="forward">
            Save & Continue
          </button>
        </div>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

QuestionThree.propTypes = {
  setCurrentQuestion: PropTypes.func.isRequired,
};

export default QuestionThree;
