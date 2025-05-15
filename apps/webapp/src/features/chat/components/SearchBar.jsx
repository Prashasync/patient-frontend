import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import ChatService from "../services/ChatService";
import useSocket from "../../../sockets/useSocket";

const SearchBar = () => {
  const [addMessagePopup, setAddMessagePopup] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState([]);
  const [roomId, setRoomId] = useState(null);

  useSocket(roomId);

  const handleClick = () => {
    setAddMessagePopup(!addMessagePopup);
    setDoctorProfile([]);
  };

  const handleClose = () => {
    setAddMessagePopup(false);
  };

  const handleChatWith = async (doctor_id) => {
    try {
      const response = await ChatService.getChatRoom(doctor_id);

      const room = [response.data.sender_id, response.data.receiver_id]
        .sort()
        .join("-");

      setRoomId(room);

      console.log("Chat room response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="search-bar">
      <form>
        <input
          type="text"
          placeholder="Search messages..."
          className="search-input"
        />
      </form>
      <IoAddCircleOutline size={30} onClick={handleClick} />

      {addMessagePopup && (
        <div className="add-message-popup">
          <div className="popup-header">
            <h2>Send a message</h2>
            <button className="close-btn" onClick={handleClose}>
              ×
            </button>
          </div>

          <div className="doctor-list-messages">
            {doctorProfile.map((doctor) => (
              <div
                onClick={() => handleChatWith(doctor.doctor_id)}
                key={doctor.doctor_id}
                className="doctor-card-messages"
              >
                <img src={doctor.image_url} alt="Doctor" />
                <div>
                  <p className="doctor-name">
                    {doctor.first_name} {doctor.last_name}
                  </p>
                  <p className="doctor-specialization">
                    {doctor.specialization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
