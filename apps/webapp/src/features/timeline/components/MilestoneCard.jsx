import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const MilestoneCard = ({ title, date, image }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/milestones/${title.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div className="milestone-card">
      <img src={image} alt={title} />
      <div className="milestone-info">
        <h3>{title}</h3>
        <p>Last updated on {date}</p>
      </div>
      <button onClick={handleClick} className="milestone-arrow">
        →
      </button>
    </div>
  );
};

MilestoneCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
};

export default MilestoneCard;
