import React, { useState } from "react";
import ChatService from "../services/ChatService";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageText = e.target.text.value;
    setMessages([...messages, messageText]);
    try {
      const response = ChatService.sendMessage(messageText)
      console.log("Message sent:", response);
    } catch (error) {
      console.error("There was an error sending the message.", error);
    }
    e.target.reset();
  };

  // const handleReceiveMessage = (message) => {
  //   setMessages([...messages, message]);
  // }

  return (
    <div className="chat-room">
      <div className="chat-room-messages">
        <div className="message">
          <div className="message-content">
            <h3>User Name</h3>
          </div>
        </div>
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="message-content">
              <h3>{message}</h3>
            </div>
          </div>
        ))}
      </div>
      <form className="chat-room-message-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          name="text"
          id="message-text-container"
          placeholder="Type your message"
        />
        <button>send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
