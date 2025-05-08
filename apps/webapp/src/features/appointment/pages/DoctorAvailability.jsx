import React, { useEffect } from "react";
import Calendar from "../components/Calendar";
import DoctorCard from "../components/DoctorCard";
import AppointmentsServices from "../services/AppointmentsService";

const DoctorAvailability = () => {
    const id = ""
    const fetchDoctorWithId = async () => {
        try {
            const response = await AppointmentsServices.getDoctorProfileById(id);
        } catch (error) {
            console.error("There was an error fetching doctor.", error);
            throw error;
        }
    }
  useEffect(() => {
    fetchDoctorWithId()
  }, []);
  return (
    <div className="doctor-availability">
      <DoctorCard />
      <Calendar />
    </div>
  );
};

export default DoctorAvailability;
