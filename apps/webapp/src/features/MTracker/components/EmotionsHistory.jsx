import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EmotionHistory = ({ symptomTrackerHistory }) => {
  console.log(symptomTrackerHistory)
  return (
    <div className="emotions-container">
      <h2>Your Mental Health Report</h2>
      {symptomTrackerHistory && symptomTrackerHistory.length > 0 ? (
        <ul className="emotion-list">
          {symptomTrackerHistory.map((emotion, index) => (
            <li key={index} className="emotion-item">
              <Link
                to={`/symptom-tracking/${emotion.log_id}`}
                className="emotion-link"
              >
                <div className="emotion-row">
                  <strong>{emotion.feelings}</strong>
                  <span>{new Date(emotion.symptom_date).toLocaleString()}</span>
                  <span className="view-report">View Report</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No emotions tracked yet.</p>
      )}
    </div>
  );
};

EmotionHistory.propTypes = {
  symptomTrackerHistory: PropTypes.array.isRequired,
};

export default EmotionHistory;
