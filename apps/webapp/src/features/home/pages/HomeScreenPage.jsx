import React, { useEffect, useState } from 'react';
import '../../../shared/styles/bottomNavBar.css';
import '../../../shared/styles/homeScreenPage.css';
import gridIcon from '../../../assets/icons/grid-line.svg';
import searchIcon from '../../../assets/icons/search_line.svg';
import bellIcon from '../../../assets/icons/Union.png';
import heartHealth from '../../../assets/icons/heartHealth.svg';
import Notifications from '../components/Notifications';
import AuthService from '../../auth/services/authService';
import { Link, useNavigate } from 'react-router-dom';
import AiChatBot from '../../chat/components/AiChatBotIcon';
import MTrackerService from '../../MTracker/services/MTrackerService';

const HomeScreenPage = () => {
  const [patient, setPatient] = useState(null);
  const [inSights, setInSights] = useState(null);
  const [moodScore, setmoodScore] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await AuthService.fetchUserData();
      console.log('response from fetch user data', response);
      if (response.status !== 200) {
        navigate('/');
      }
      setPatient(response.data);
    } catch (error) {
      console.error('There was an error', error);
    }
  };

  const fetchSymptomTracker = async () => {
    try {
      const response = await MTrackerService.getMoodHistory();
      console.log('insigits here', response.data.symptomHistory);
      setInSights(response?.data.symptomHistory);
    } catch (error) {
      console.error('There was an error: ', error);
    }
  };

  const fetchMoodScore = async () => {
    console.log('patient is here ', patient);
    try {
      const response = await MTrackerService.getMoodScore(patient?.patient_id);
      setmoodScore(response.mood_score);
      console.log('response for the mood score', response);
    } catch (error) {
      console.error('Error calling mood score', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchSymptomTracker();
  }, []);

  useEffect(() => {
    if (patient && patient.patient_id) {
      fetchMoodScore();
    }
  }, [patient]);

  return (
    <div className="home-container">
      <div className="home-header">
        <button>
          <img src={gridIcon} alt="Menu" className="header-button-icon" />
        </button>
        <div className="header-buttons">
          <button>
            <img src={searchIcon} alt="Search" className="header-button-icon" />
          </button>
          <button>
            <img
              src={bellIcon}
              alt="Notifications"
              className="header-button-icon"
            />
          </button>
        </div>
      </div>
      <div className="greeting-text">
        Hello, {patient && `${patient.first_name} ${patient.last_name}`}.<br />
        You’ve taken a step to care for yourself.
      </div>
      <div className="card-grid">
        <div className="card card-gray">
          <p>
            {inSights && inSights.length > 0 ? inSights[0]?.emoji_icon : '😊'}
          </p>
          {!inSights ? (
            <span>No Mood!</span>
          ) : (
            <Link to="/mtracker">
              <span>You look {inSights[0]?.feelings}</span>
            </Link>
          )}
        </div>
        <div className="card card-gray">
          <span style={{ fontWeight: 600, fontSize: 48 }}>
            {moodScore ? moodScore : 50}
          </span>
          <span>Mood Score</span>
        </div>
      </div>
      <Notifications />
      <AiChatBot />
    </div>
  );
};

export default HomeScreenPage;
