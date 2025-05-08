import PropTypes from "prop-types";
import React from "react";
import { MdClose } from "react-icons/md";

const Filter = ({ handleClick }) => {
  return (
    <div className="filter-container">
      <MdClose onClick={handleClick} size={40} className="exit" />
      <div className="filter-header">
        <h1>Filter</h1>
        <p>Clear All</p>
      </div>
      <h2 className="bold">Sorting</h2>
      <div className="filter-type">
        <p>Fee: Low to High</p>
        <p>Fee: High to Low</p>
        <p>Rated: Low to High</p>
        <p>Rated: High to Low</p>
      </div>
      <h2 className="bold">Specialist</h2>
      <div className="filter-type">
        <p>All</p>
        <p>Psychiatrists</p>
        <p>Psychologists</p>
        <p>Counselors</p>
        <p>Therapists</p>
        <p>Art therapists</p>
        <p>Psychotherapist</p>
        <p>Social workers</p>
      </div>
      <div className="apply-filter-container">
        <button className="reset-filter">Reset</button>
        <button className="apply-filter">Apply</button>
      </div>
    </div>
  );
};

Filter.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Filter;
