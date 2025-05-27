import React from "react";
import PropTypes from "prop-types";

const TimelineItem = ({ date, title, description, image, emoji }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-dot" />
      <div className="timeline-content">
        <p className="timeline-date">{date}</p>
        <div className="timeline-card">
          <h3>{title}</h3>
          <p>{description}</p>
          {image && <img src={image} alt={title} />}
          {emoji && <span className="emoji">{emoji}</span>}
        </div>
      </div>
    </div>
  );
};

TimelineItem.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
  emoji: PropTypes.node.isRequired,
};

export default TimelineItem;
