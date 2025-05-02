import React from "react";
import PropTypes from "prop-types";

const Emotion = ({ symptomTrackerHistory }) => {
  if (!symptomTrackerHistory || symptomTrackerHistory.length === 0) {
    return <div className="emoji">No emotions tracked yet.</div>;
  }

  const latestEmotion = symptomTrackerHistory[symptomTrackerHistory.length - 1];

  return (
    <div className="emoji">
      {latestEmotion?.emoji_icon ? (
        <div className="emotion">
          <span className="emotion-icon">{latestEmotion.emoji_icon}</span>
        </div>
      ) : (
        <div className="emotion">
          <span className="emotion-name">Emotion not found</span>
        </div>
      )}
    </div>
  );
};

Emotion.propTypes = {
  symptomTrackerHistory: PropTypes.array.isRequired,
};

export default Emotion;
