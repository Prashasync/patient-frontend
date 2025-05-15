import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import DoctorCard from "../components/DoctorCard";
import AppointmentsServices from "../services/AppointmentsService";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../auth/services/authService";

const DoctorAvailability = () => {
  const { doctor_id } = useParams();
  const [doctor, setDoctor] = useState({});
  const navigate = useNavigate();

  const fetchAWSCreds = async () => {
    try {
      const response = await AuthService.fetchAWSCreds();
      console.log(response);
    } catch (error) {
      console.error("There was an error fetching the variables", error);
    }
  };

  const fetchDoctorWithId = async () => {
    try {
      const response = await AppointmentsServices.getDoctorProfileById(
        doctor_id
      );
      console.log(response);
      setDoctor(response);
    } catch (error) {
      if (error.status === 401) {
        navigate("/");
      }
      console.error("There was an error fetching doctor.", error);
    }
  };
  useEffect(() => {
    fetchDoctorWithId();
    fetchAWSCreds();
  }, []);
  return (
    <div className="doctor-availability">
      <DoctorCard doctor={doctor} />
      <Calendar />
    </div>
  );
};

export default DoctorAvailability;
