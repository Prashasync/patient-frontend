import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const MessageThread = ({ message }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chat/${message.id}`);
  };

  return (
    <div
      onClick={handleClick}
      key={message.chat_message_id}
      className="message-item"
    >
      <img
        src={message.profilePicture}
        alt={`${message.userName} profile`}
        className="profile-picture"
      />
      <div className="message-details">
        <div className="message-header">
          <h3 className="user-name">{message.userName}</h3>
          <span className="message-time">{message.time}</span>
        </div>
        <p className="message-text">{message.text}</p>
      </div>
      <input type="text" name="text" id="text" />
    </div>
  );
};

MessageThread.propTypes = {
  message: PropTypes.shape({
    chat_message_id: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    profilePicture: PropTypes.string,
    userName: PropTypes.string.isRequired,
    time: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

export default MessageThread;
