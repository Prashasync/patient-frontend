import React, { useEffect, useState } from "react";
import "../../../shared/styles/onboarding.css";
import axios from "axios";

const QuestionTwo = ({ setCurrentQuestion }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [message, setMessage] = useState("");

  const handleBack = () => {
    setCurrentQuestion(1);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, name]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedOptions.length === 0) {
        setMessage("Please select at least one option");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        return;
      }

      const response = await axios.post(
        `https://ftmwsamij8.execute-api.us-east-1.amazonaws.com/SNS/SNS_SQS_API/api/v1/patients/onboarding-status`,
        {
          selectedOptions,
          question_number: 2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
      if (response.status !== 200) {
        setMessage(response.data.error);
        return;
      }
      setCurrentQuestion(3);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const checkOnboardingStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/patients/onboarding-status`,
        // { withCredentials: true}
      );

      if (response.status === 200) {
        const allAnswers = response.data.onboardingStatus;
        const questionOne = allAnswers.find(
          (item) => item.question_number === 2
        );

        if (questionOne && Array.isArray(questionOne.selected_options)) {
          setSelectedOptions(questionOne.selected_options);
        }
      }
    } catch (error) {
      console.error("Error fetching onboarding status:", error);
    }
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  return (
    <div className="questions">
      <div className="sub-title">
        <h2>Your Coping Strategies</h2>
        <h3>How do you usually manage stress or low moods?</h3>
      </div>
      <form onSubmit={handleSubmit}>
        {[
          { id: "mood-one", label: "Exercise or Physical Activity" },
          { id: "mood-two", label: "Meditation or Mindfulness" },
          { id: "mood-three", label: "Talking to Friends/Family" },
          { id: "mood-four", label: "Journaling or Writing" },
          { id: "mood-five", label: "Professional Support" },
          { id: "mood-six", label: "Other" },
        ].map(({ id, label }) => (
          <div
            key={id}
            className={`mood-container ${
              selectedOptions.includes(id) ? "selected" : ""
            }`}
          >
            <label htmlFor={id}>{label}</label>
            <input
              type="checkbox"
              name={id}
              id={id}
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes(id)}
            />
          </div>
        ))}
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

export default QuestionTwo;
