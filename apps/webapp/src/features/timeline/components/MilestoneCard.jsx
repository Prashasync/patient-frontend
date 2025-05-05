import React from 'react';
import { useNavigate } from 'react-router-dom';

const MilestoneCard = ({ title, date, image }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/milestones/${title.toLowerCase().replace(/\s+/g, '-')}`);
  }
  
  return (
    <div className="milestone-card">
      <img src={image} alt={title} />
      <div className="milestone-info">
        <h3>{title}</h3>
        <p>Last updated on {date}</p>
      </div>
      <button onClick={handleClick} className="milestone-arrow">→</button>
    </div>
  );
};

export default MilestoneCard;