import React, { useEffect, useState } from "react";
import "../../../shared/styles/onboarding.css";
import axios from "axios";

const QuestionOne = ({ setCurrentQuestion }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [message, setMessage] = useState("");

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
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/patients/onboarding-status`,
        {
          selectedOptions,
          question_number: 1,
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
      }
      setCurrentQuestion(2);
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
          (item) => item.question_number === 1
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
        <h2>Identify Your Mood Triggers</h2>
        <h3>
          What situations impact your mood the most? (Select all that apply)
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        {[
          { id: "Work / School Stress", label: "Work / School Stress" },
          { id: "Relationships", label: "Relationships" },
          { id: "Health Concerns", label: "Health Concerns" },
          { id: "Financial Worriesr", label: "Financial Worries" },
          { id: "Lack of Sleep", label: "Lack of Sleep" },
          { id: "Other", label: "Other" },
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

export default QuestionOne;
