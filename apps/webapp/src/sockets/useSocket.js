// /src/sockets/useSocket.js
import { useEffect } from "react";
import socket from "./socket";

const useSocket = (roomId, onMessageReceived) => {
  useEffect(() => {
    if (!roomId) return;

    socket.connect();
    socket.emit("joinRoom", roomId);

    socket.on("newMessage", onMessageReceived);

    return () => {
      socket.off("newMessage", onMessageReceived);
      socket.disconnect();
    };
  }, [roomId, onMessageReceived]);
};

export default useSocket;
