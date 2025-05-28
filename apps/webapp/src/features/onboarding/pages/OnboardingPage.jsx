import React, { useState, useEffect } from "react";
import QuestionOne from "../components/QuestionOne";
import QuestionTwo from "../components/QuestionTwo";
import QuestionThree from "../components/QuestionThree";
import { useNavigate } from "react-router-dom";
import "../../../shared/styles/onboarding.css";
import OnboardingService from "../services/onboardingServices";

const OnboardingPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProgress = async () => {
    try {
      const response = await OnboardingService.getOnboardingData();
      if (response.status !== 200) {
        navigate("/login");
        return;
      }
      if (!response.data.question_number) {
        setCurrentQuestion(1);
        return;
      }
      if (response.data.question_number + 1 === 4) {
        navigate("/home");
      }
      setCurrentQuestion(response.data.question_number + 1);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user progress:", error);
    }
  };

  useEffect(() => {
    const initializeOnboarding = async () => {
      await fetchUserProgress();
      setLoading(false);
    };
    initializeOnboarding();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="onboarding-questions">
      <div className="title">
        <h1>Personalized Wellness Starts Here</h1>
        {currentQuestion === 1 && (
          <QuestionOne setCurrentQuestion={setCurrentQuestion} />
        )}
        {currentQuestion === 2 && (
          <QuestionTwo setCurrentQuestion={setCurrentQuestion} />
        )}
        {currentQuestion === 3 && (
          <QuestionThree setCurrentQuestion={setCurrentQuestion} />
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
