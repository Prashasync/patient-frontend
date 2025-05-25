import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatService from "../services/ChatService";
import MessageThread from "./MessgeThread";
import AiChatBot from "./AiChatBotIcon";

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
        <div className="no-messages-wrapper">
          <div className="no-messages-icon">💬</div>
          <h2 className="no-messages-title">No Messages Yet</h2>
          <p className="no-messages-subtext">Your inbox is empty.</p>
          <p className="no-messages-subtext">
            You can reach out to a licensed expert or check in with Tova, your
            AI companion.
          </p>
        </div>
      )}
      <AiChatBot />
    </div>
  );
};

export default MessageDisplayPage;
