import React from "react";
import { useNavigate } from "react-router-dom";

const MessageDisplayPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/messages/:id`);
  };  
  
  const messages = [
    {
      id: 1,
      userName: "Octavias",
      time: "11:30 pm",
      text: "Hi Matt, hope you are doing fine, tell the boss I might be ...",
      profilePicture:
        "https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhlYWRzaG90fGVufDB8fDB8fHww",
    },
    {
      id: 2,
      userName: "Sophia",
      time: "10:15 am",
      text: "Hi Matt, hope you are doing fine, tell the boss I might be ...",
      profilePicture:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA",
    },
  ];

  return (
    <div className="message-display">
      {messages.map((message) => (
        <div onClick={handleClick} key={message.id} className="message-item">
          <img
            src={message.profilePicture}
            alt={`${message.userName} profile picture`}
            className="profile-picture"
          />
          <div
            onClick={() => navigate(`/messages/${message.id}`)}
            className="message-details"
          >
            <div className="message-header">
              <h3 className="user-name">{message.userName}</h3>
              <span className="message-time">{message.time}</span>
            </div>
            <p className="message-text">{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplayPage;