import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../shared/styles/bottomNavBar.css";
import homeIcon from "../../assets/icons/home-icon.svg";
import statsIcon from "../../assets/icons/stats-icon.svg";
import appointmentIcon from "../../assets/icons/appointment-icon.svg";
import timelineIcon from "../../assets/icons/Timeline.svg";
import mtrackerIcon from "../../assets/icons/Mtracker.svg";
import chatIcon from "../../assets/icons/chat-icon.svg";

const BottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: homeIcon, label: "Home", path: "/home" },
    { icon: statsIcon, label: "Stats", path: "/dashboard" },
    { icon: appointmentIcon, label: "Appt", path: "/appointments" },
    { icon: timelineIcon, label: "Timeline", path: "/timeline" },
    { icon: mtrackerIcon, label: "MTracker", path: "/mtracker" },
    { icon: chatIcon, label: "Chat", path: "/chat" },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#1D0B32] border-t border-gray-700 shadow-lg flex justify-around py-3 w-full max-w-[700px] sm:max-w-[800px] md:max-w-[900px] lg:max-w-[1000px] xl:max-w-[1200px] rounded-2xl backdrop-blur-lg z-50">
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.path;

        return (
          <button
            key={index}
            className="flex flex-col items-center text-xs text-white"
            onClick={() => navigate(item.path)}
          >
            <img
              src={item.icon}
              alt={item.label}
              className={`w-11 h-11 transition-transform duration-300 ease-in-out ${
                isActive ? "brightness-150 scale-110" : "opacity-70"
              } hover:scale-110`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavBar;
