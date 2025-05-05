import React, { useState } from "react";
import MilestoneCard from "../components/MilestoneCard";
import "../../../shared/styles/milestone.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../auth/services/authService";

const TimelineListPage = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null)

  const fetchUserData = async () => {
    try {
      const response = await AuthService.fetchUserData();
      if (response.status !== 200) {
        navigate("/");
      }
      console.log(response);
      setPatient(response.data);
    } catch (error) {
      console.error("There was an error", error);
    }
  };
  console.log(patient)

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="milestone-container">
      <div className="milestone-header">
        <h2>
          Your Milestones,
          <br />
          Your Story
        </h2>
        <p>
          Track and celebrate milestones—personal achievements, baby moments, or
          life events—all in one place.
        </p>
      </div>

      <MilestoneCard
        title="My Improvement"
        date="03/07/2025"
        image="image-url.jpg"
      />
      <MilestoneCard
        title="Kid Timeline"
        date="02/20/2025"
        image="image-url.jpg"
      />

      <button className="milestone-add">+</button>
    </div>
  );
};

export default TimelineListPage;
