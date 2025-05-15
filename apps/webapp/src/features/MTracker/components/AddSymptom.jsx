import React from "react";
import PropTypes from "prop-types";

const AddSymptom = ({ handleClick }) => {
  return (
    <div className="add-symptom">
      <svg
        className="plus-btn"
        onClick={handleClick}
        width="58"
        height="58"
        viewBox="0 0 58 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="29" cy="29" r="29" fill="#979797" />
        <path
          d="M22 29H36M29 22V36"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

AddSymptom.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default AddSymptom;
