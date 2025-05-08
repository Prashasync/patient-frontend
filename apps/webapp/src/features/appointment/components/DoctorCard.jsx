import React from "react";
import PropTypes from "prop-types";
import { MdStar } from "react-icons/md";

const DoctorCard = ({ createAppointment, doctor }) => {
  return (
    <div
      onClick={() => createAppointment(doctor.doctor_id)}
      className="doctor-card-container"
    >
      <div className="doctor-card">
        <div className="flex">
          <img src="https://www.example.com" alt="image" />
          <div className="doctor-description">
            <h2>
              {doctor.first_name} {doctor.last_name}
            </h2>
            <p>{doctor.specialization}</p>
            <p className="star">
              {doctor.health_score} <MdStar />
            </p>
            <p className="bold">$100</p>
          </div>
        </div>
        <div className="">
          <p>Available Time: Today</p>
        </div>
        <div className="doctor-available-time">
          <p>3:30pm</p>
          <p>3:30pm</p>
          <p>3:30pm</p>
        </div>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.object.isRequired,
  createAppointment: PropTypes.func.isRequired,
};

export default DoctorCard;
