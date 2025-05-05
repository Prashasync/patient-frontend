import React from "react";
import "../../../shared/styles/chat.css";
import SearchBar from "../components/SearchBar";
import MessageDisplay from "./MessageDisplayPage";
import BottomNavBar from "../../../shared/components/BottomNavBar";

const ChatPage = () => {
  return (
    <div className="messages">
      <h2>Messages</h2>
      <SearchBar />
      <MessageDisplay />
      <BottomNavBar />
    </div>
  );
};

export default ChatPage;
