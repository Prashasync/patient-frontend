import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import { IoIosArrowDropleft } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, Octavias", time: "11:25pm", isSender: true },
    {
      text: "Hi Matt, hope you are doing fine, tell me how can I help you",
      time: "11:25pm",
      isSender: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/messages");
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { text: newMessage, time: "11:26pm", isSender: true },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-screen">
      <div className="chat-screen-header">
        <IoIosArrowDropleft size={20} onClick={handleClick}/>
        <h2 className="chat-header">Octavias</h2>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            text={msg.text}
            time={msg.time}
            isSender={msg.isSender}
          />
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;
