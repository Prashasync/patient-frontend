import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatService from "../services/ChatService";
import MessageThread from "./MessgeThread";
import AiChatBot from "./AiChatBot";

const MessageDisplayPage = () => {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState([]);

  const fetchChatHistory = async () => {
    try {
      const response = await ChatService.getChatHistory();
      if (!response) {
        navigate("/");
      }
      setChatHistory(response);
    } catch (error) {
      console.error("There was an error fetching your chat history.", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  return (
    <div className="message-display">
      {chatHistory && chatHistory.length > 0 ? (
        chatHistory.map((message) => (
          <MessageThread key={message.chat_message_id} message={message} />
        ))
      ) : (
        <h1>No Messages</h1>
      )}
      <AiChatBot />
    </div>
  );
};

export default MessageDisplayPage;
