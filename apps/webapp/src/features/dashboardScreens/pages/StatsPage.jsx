import React, { useEffect, useState } from "react";
import "../../../shared/styles/bottomNavBar.css";
import "../../../shared/styles/stats.css";
import Bell from "../../../assets/icons/Union.png";
import Search from "../../../assets/icons/search_line.svg";
import Grid from "../../../assets/icons/grid-line.svg";
import MoodChart from "../components/MoodChart";
import MoodHistoryCard from "../components/MoodHistoryCard";
import DataInsights from "../components/DataInsights";
import AuthService from "../../auth/services/authService";
import MTrackerService from "../../MTracker/services/MTrackerService";

const StatsPage = () => {
  const [userData, setUserData] = useState([]);
  const [patient, setPatient] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await AuthService.fetchUserData();
      setPatient(response.data);
    } catch (error) {
      console.error("There was an error fetching the user data: ", error);
    }
  };

  const fetchUserInsights = async () => {
    try {
      const response = await MTrackerService.getInsights(patient.patient_id);
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("There was an error fetching the user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserInsights();
  }, [patient]);

  useEffect(() => {
    fetchUserData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="menu-icons">
          <img src={Grid} alt="Menu" className="icon" />
        </div>
        <div className="utility-icons">
          <img src={Search} alt="Search" className="icon" />
          <img src={Bell} alt="Notifications" className="icon" />
        </div>
      </header>

      <section className="dashboard-section">
        <h1 className="dashboard-greeting">Good morning, Matt,</h1>
        <p className="dashboard-subtext">How do you feel today</p>
      </section>

      <section className="dashboard-section">
        <MoodChart userData={userData} />
      </section>

      <section className="dashboard-section">
        <MoodHistoryCard />
      </section>

      <section className="dashboard-section last-section">
        <DataInsights />
      </section>
    </div>
  );
};

export default StatsPage;
