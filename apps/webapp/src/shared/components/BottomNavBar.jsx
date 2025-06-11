import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/bottomNavBar.css";
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
    { icon: statsIcon, label: "Stats", path: "/stats" },
    { icon: appointmentIcon, label: "Appt", path: "/appointments" },
    { icon: timelineIcon, label: "Timeline", path: "/timeline" },
    { icon: mtrackerIcon, label: "MTracker", path: "/mtracker" },
    { icon: chatIcon, label: "Chat", path: "/chat" },
  ];

  return (
    <>
      <Outlet />
      <div className="fixed-bottom-nav">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={index}
              className="nav-button"
              onClick={() => navigate(item.path)}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={isActive ? "active" : ""}
              />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default BottomNavBar;
