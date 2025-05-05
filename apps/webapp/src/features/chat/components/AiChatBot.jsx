import React from "react";
import filterIcon from "../../../assets/icons/filter-icon.svg";
import { useNavigate } from "react-router-dom";

const AiChatBot = () => {
  const navigate = useNavigate();
  const handleRedirectAiDoctor = () => {
    navigate("/ai-doctor");
  };

  return (
    <img
      onClick={handleRedirectAiDoctor}
      src={filterIcon}
      alt="Filter"
      className="fixed bottom-20 right-6 z-50 w-20 h-20 cursor-pointer"
    />
  );
};

export default AiChatBot;
