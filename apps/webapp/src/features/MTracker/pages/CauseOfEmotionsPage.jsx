import React from 'react';
import { FaCar, FaRegCalendar } from 'react-icons/fa6';
import { LuBicepsFlexed } from 'react-icons/lu';
import { IoPeople, IoFastFood } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import MTrackerService from '../services/MTrackerService';

const CauseOfEmotionPage = () => {
  const navigate = useNavigate();

  const causes = [
    { icon: <FaRegCalendar />, label: 'Work' },
    { icon: <FaCar />, label: 'Car' },
    { icon: <LuBicepsFlexed />, label: 'Exercise' },
    { icon: <FaRegCalendar />, label: 'Friends' },
    { icon: <IoPeople />, label: 'Friends' },
    { icon: <IoFastFood />, label: 'Friends' },
  ];

  const handleClick = async (data) => {
    try {
      const response = await MTrackerService.addMoodCause(data);
      if (response.status === 200) {
        navigate('/symptom-tracker/questionare/3');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
      console.error('Error logging cause of emotion:', error);
    }
  };

  return (
    <div className="emotion-questionare">
      <h1 className="title">What made you feel this way?</h1>

      <ul className="emotions-list">
        {causes.map((cause, index) => (
          <li onClick={() => handleClick(cause.label)} key={index}>
            <span className="emotion-background">{cause.icon}</span>
            <span>{cause.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CauseOfEmotionPage;
