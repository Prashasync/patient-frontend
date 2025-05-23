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
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
  <div className="text-5xl mb-4">💬</div>
  <h2 className="text-3xl font-bold text-gray-900 mb-3">No Messages Yet</h2>
  <p className="text-base text-gray-600 mb-1">Your inbox is empty.</p>
  <p className="text-base text-gray-600 max-w-md">
    You can reach out to a licensed expert or check in with Tova, your AI companion.
  </p>
</div>

      )}
      <AiChatBot />
    </div>
  );
};

export default MessageDisplayPage;
