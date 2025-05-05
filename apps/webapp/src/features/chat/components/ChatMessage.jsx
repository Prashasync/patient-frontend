import React from "react";

const ChatMessage = ({ text, time, isSender }) => {
  return (
    <div className={`message-container ${isSender ? "sent" : "received"}`}>
      {!isSender && (
        <img
          src="https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhlYWRzaG90fGVufDB8fDB8fHww"
          alt="User"
          className="profile-picture"
        />
      )}
      <div className="message-bubble">{text}</div>
      <span className="message-time">{time}</span>
    </div>
  );
};

export default ChatMessage;