import React, { useEffect, useState } from "react";
import filterIcon from "../../../assets/icons/filter-icon.svg";
import { useNavigate } from "react-router-dom";
import useSocket from "../../../sockets/useSocket";
import AuthService from "../../auth/services/authService";

const AiChatBotIcon = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(null);
  const [patient, setPatient] = useState(null);
  useSocket(roomId);

  const handleRedirectAiDoctor = () => {
    const createRoomId = `ai-doctor/${patient.patient_id}`;
    setRoomId(createRoomId);
    navigate(`/${createRoomId}`);
  };

  const fetchPatientData = async () => {
    try {
      const response = await AuthService.fetchUserData();
      if (response.status !== 200) {
        navigate("/");
      }
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);
  
  return (
    <img
      onClick={handleRedirectAiDoctor}
      src={filterIcon}
      alt="Filter"
      className="fixed bottom-20 right-6 z-50 w-20 h-20 cursor-pointer"
    />
  );
};

export default AiChatBotIcon;
