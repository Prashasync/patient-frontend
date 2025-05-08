import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import PlusIcon from "../../../assets/icons/plus.svg";
import "../../../shared/styles/appointments.css";
import AppointmentCard from "../../../features/appointment/components/AppointmentCard";
import AppointmentsServices from "../services/AppointmentsService";
import { useNavigate } from "react-router-dom";

const AppointmentPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/schedule-appointment");
  };

  const fetchAppointments = async () => {
    try {
      const response = await AppointmentsServices.getAppointments();
      if (response.status === 200) {
        setAppointments(response.data);
      }
    } catch (error) {
      if (error.status === 401) {
        navigate("/");
      }
      console.error("There was an error fetching the appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-poppins">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Appointments</h1>
        <img
          onClick={handleClick}
          src={PlusIcon}
          alt="Add"
          className="w-6 h-6 cursor-pointer"
        />
      </header>

      <section className="px-4 mb-4">
        <Calendar />
      </section>

      <div className="flex justify-around mb-4 px-4">
        <button
          className={`flex-1 py-2 rounded-full mx-1 transition-all duration-300 ${
            activeTab === "upcoming"
              ? "bg-[#7C3AED] text-white font-semibold shadow-md"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`flex-1 py-2 rounded-full mx-1 transition-all duration-300 ${
            activeTab === "previous"
              ? "bg-[#7C3AED] text-white font-semibold shadow-md"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => setActiveTab("previous")}
        >
          Previous
        </button>
      </div>

      {appointments.length > 0 ? (
        <section className="px-4 mb-20">
          <AppointmentCard
            status="Your appointment is confirmed"
            name="Appointment with Theresa Webb"
            time="March 6th at 12:00am to 1:00pm"
          />
          <AppointmentCard
            status="Your appointment is confirmed"
            name="Appointment with Octavia"
            time="March 10th at 1:00pm to 1:45pm"
          />
        </section>
      ) : (
        <p className="no-appointments">No Appointments</p>
      )}
    </div>
  );
};

export default AppointmentPage;
