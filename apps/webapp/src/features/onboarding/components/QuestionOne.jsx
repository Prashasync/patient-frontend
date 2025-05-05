import React, { useEffect, useState } from "react";
import "../../../shared/styles/onboarding.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import OnboardingService from "../services/onboardingServices";

const QuestionOne = ({ setCurrentQuestion }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

    if (selectedOptions.length === 0) {
      setMessage("Please select at least one option");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    try {
      const response = await OnboardingService.postOnboardingData({
        question_number: 1,
        selected_options: selectedOptions,
      });
      console.log("Response from server:", response);
      if (response.status !== 200) {
        setMessage(response.data.error);
      }
      setCurrentQuestion(2);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const checkOnboardingStatus = async () => {
    try {
      const response = await OnboardingService.getOnboardingData();
      if (response.status !== 200) {
        navigate("/login");
        return;
      }
      if (response.status === 200) {
        const allAnswers = response.data.selected_option;

        const questionOne = allAnswers.find(
          (item) => item.question === 1
        );

        if (questionOne && Array.isArray(questionOne["answers"])) {
          setSelectedOptions(questionOne["answers"]);
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
        <h2>Identify Your Mood Triggers</h2>
        <h3>
          What situations impact your mood the most? (Select all that apply)
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        {[
          { id: "Work / School Stress", label: "Work / School Stress" },
          { id: "Relationships",        label: "Relationships" },
          { id: "Health Concerns",      label: "Health Concerns" },
          { id: "Financial Worriesr",   label: "Financial Worries" },
          { id: "Lack of Sleep",        label: "Lack of Sleep" },
          { id: "Other",                label: "Other" },
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
        <button className="forward">Save & Continue</button>
        {message && <p className="error-message">{message}</p>}
      </form>
    </div>
  );
};

QuestionOne.propTypes = {
  setCurrentQuestion: PropTypes.func.isRequired,
};

export default QuestionOne;
