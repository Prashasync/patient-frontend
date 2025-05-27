import React from "react";
import "../../../shared/styles/chat.css";
import SearchBar from "../components/SearchBar";
import MessageDisplay from "../components/AllMessages";

const ChatPage = () => {
  return (
    <div className="messages">
      <SearchBar />
      <MessageDisplay />
    </div>
  );
};

export default ChatPage;
