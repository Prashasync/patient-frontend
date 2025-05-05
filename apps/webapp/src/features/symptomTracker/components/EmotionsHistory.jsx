import React from "react";
import { Link } from "react-router-dom";

const EmotionHistory = ({ symptomTrackerHistory }) => {
  return (
    <div className="emotions-container">
      <h2>Your Mental Health Report</h2>
      {symptomTrackerHistory && symptomTrackerHistory.length > 0 ? (
        <ul className="emotion-list">
          {symptomTrackerHistory.map((emotion, index) => (
            <Link
              className="emotion-item"
              key={index}
              to={`${process.env.REACT_APP_SERVER_ENDPOINT}/symptom-tracking/${emotion.log_id}`}
            >
              <li style={{ cursor: "pointer" }}>
                <strong>{emotion.feelings}</strong>
              </li>
              <span>{new Date(emotion.symptom_date).toLocaleString()}</span>
              <span>View Report</span>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No emotions tracked yet.</p>
      )}
    </div>
  );
};

export default EmotionHistory;
