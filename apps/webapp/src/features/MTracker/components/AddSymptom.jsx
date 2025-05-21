import React from "react";
import PropTypes from "prop-types";

const AddSymptom = ({ handleClick }) => {
  return (
    <div className="add-symptom">
      <button onClick={handleClick}>How are you feeling now?</button>
    </div>
  );
};

AddSymptom.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default AddSymptom;
