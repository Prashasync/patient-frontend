import React, { useEffect } from "react";
import ChatService from "../services/ChatService";

const AiDoctorPage = () => {
  const validatePatient = async () => {
    try {
      const response = await ChatService.getAiDoctor();

      console.log("Validated patient:", response);
      return response;
    } catch (error) {
      console.error("Validation error:", error.response || error.message);
      throw error;
    }
  };
  useEffect(() => {
    validatePatient();
  }, []);
  return (
    <iframe
    //   src=`${}`
    //   title="AI Doctor"
    //   style={{ width: "100%", height: "100vh", border: "none" }}
    />
  );
};

export default AiDoctorPage;
