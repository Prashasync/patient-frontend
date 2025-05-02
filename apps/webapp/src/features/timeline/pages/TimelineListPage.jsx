import React from "react";
import MilestoneCard from "../components/MilestoneCard";
import "../../../shared/styles/milestone.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../../../shared/components/BottomNavBar";

const TimelineListPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/auth/check`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
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
      <BottomNavBar />
    </div>
  );
};

export default TimelineListPage;
