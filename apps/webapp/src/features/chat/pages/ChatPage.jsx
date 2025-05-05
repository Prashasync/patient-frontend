import React from "react";
import "../../../shared/styles/chat.css";
import SearchBar from "../components/SearchBar";
import MessageDisplay from "../components/AllMessages";

const ChatPage = () => {
  return (
    <div className="messages">
      <h2>Messages</h2>
      <SearchBar />
      <MessageDisplay />
    </div>
  );
};

export default ChatPage;
