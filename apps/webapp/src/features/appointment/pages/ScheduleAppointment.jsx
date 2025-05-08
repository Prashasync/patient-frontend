import React, { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../../../assets/icons/plus.svg";
import AppointmentsServices from "../services/AppointmentsService";
import "../../../shared/styles/appointments.css";
import PropTypes from "prop-types";
import Filter from "../components/Filter";
import { MdFilterList } from "react-icons/md";

const ScheduleAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [select, setSelect] = useState(false);
  const [doctorId, setDoctorId] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowFilter(!showFilter);
  };

  const handleCreateAppointment = (data) => {
    setSelect(true);
    setDoctorId(data);
  };

  const handleRedirect = () => {
    navigate(`/schedule-appointment/${doctorId}`);
  };

  const fetchAppointments = async () => {
    try {
      const response = await AppointmentsServices.getDoctorProfile();
      if (response.status === 200) {
        setDoctors(response.data);
      }
    } catch (error) {
      if (error.status === 401) {
        navigate("/");
      }
      console.error("There was an error fetching the appointments:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);
  return (
    <div className="appointment-list">
      <div
        className={`appointment-blur-wrapper ${showFilter ? "blurred" : ""}`}
      >
        <header className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold">Appointments</h1>
          <img src={PlusIcon} alt="Add" className="w-6 h-6 cursor-pointer" />
        </header>

        <section className="appointment-list-main">
          <h2>Select your specialist</h2>
          <div className="appointment-list-search">
            <input type="search" placeholder="Search Here" />
            <p className="filter-button" onClick={handleClick}>
              <MdFilterList size={25} />
            </p>
          </div>
          <ul className="appointment-list-doctor-types">
            <li>All</li>
            <li>Psychiatrist</li>
            <li>Therapist</li>
            <li>Psychiatrist</li>
            <li>Therapist</li>
          </ul>
          {doctors.length > 0
            ? doctors.map((doctor) => (
                <DoctorCard
                  createAppointment={handleCreateAppointment}
                  key={doctor.doctor_id}
                  doctor={doctor}
                />
              ))
            : "There are no doctors available"}
        </section>
      </div>
      {select ? (
        <button onClick={handleRedirect}>Make Appointment</button>
      ) : null}
      <div className={showFilter ? "render-filter" : "hide-filter"}>
        <Filter handleClick={handleClick} />
      </div>
    </div>
  );
};

ScheduleAppointment.propTypes = {
  doctor: PropTypes.object.isRequired,
};

export default ScheduleAppointment;
