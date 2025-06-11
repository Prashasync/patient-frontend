import React, { useEffect } from "react";
import "../../../shared/styles/chat.css";
import SearchBar from "../components/SearchBar";
import MessageDisplay from "../components/AllMessages";

const ChatPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="messages">
      <SearchBar />
      <MessageDisplay />
    </div>
  );
};

export default ChatPage;
