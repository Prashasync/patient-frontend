import React, { useState, useEffect, useRef } from "react";
import {
  FaMicrophone,
  FaArrowRight,
  FaArrowLeft,
  FaStop,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "../../../shared/styles/aiDoctor.css";
import ChatService from "../services/ChatService";

const AiDoctorPage = () => {
  const [ws, setWs] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);
  const navigate = useNavigate();

  const mediaRecorderRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const { patientId } = useParams();

  const jwtToken = process.env.REACT_APP_DOCTOR_TOKEN;
  const remoteServerUrl = process.env.REACT_APP_DOCTOR_URL;

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws) ws.close();
    };
  }, []);

  useEffect(() => {
    fetchAiDoctorHistory();
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchAiDoctorHistory = async () => {
    try {
      const response = await ChatService.getAiDoctorChatHistory();
      if (response.status !== 200) {
        navigate("/");
      }
      setMessageHistory(response.data);
      console.log(response);
    } catch (err) {
      console.error("Failed to fetch chat history", err);
    }
  };

  const handleRedirect = () => {
    navigate("/home")
  }

  const connectWebSocket = () => {
    if (ws) ws.close();

    try {
      const protocol = remoteServerUrl.startsWith("https") ? "wss:" : "ws:";
      const host = remoteServerUrl.replace(/^https?:\/\//, "");
      const wsUrl = `${protocol}//${host}/smart-chat/${patientId}?token=${jwtToken}`;

      const websocket = new WebSocket(wsUrl);
      setWs(websocket);

      websocket.onopen = () => {
        console.log("WebSocket connection opened");
      };

      websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setShowTyping(false);

          if (data.transcription) {
            handleTranscription(data.transcription);
          } else if (data.response) {
            handleResponse(data.response);
          } else if (data.error) {
            console.error("Server error:", data.error);
            alert(`Error: ${data.error}`);
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      websocket.onclose = (event) => {
        console.log(
          `WebSocket closed: Code ${event.code}, Reason: ${event.reason}`
        );
      };

      websocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Error creating WebSocket:", error);
      alert(`Error connecting to server: ${error.message}`);
    }
  };

  const handleTranscription = (text) => {
    addMessage(text, "user");
  };

  const handleResponse = (text) => {
    addMessage(text, "ai");
  };

  const addMessage = (text, sender) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = async () => {
    const message = messageInput.trim();
    if (!message || !ws || ws.readyState !== WebSocket.OPEN) {
      alert("Not connected to server or message is empty.");
      return;
    }

    addMessage(message, "user");
    setShowTyping(true);

    try {
      ws.send(JSON.stringify({ text: message }));
      console.log("Message sent:", message);
    } catch (error) {
      console.error("Error sending message:", error);
      setShowTyping(false);
    }

    setMessageInput("");
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setAudioChunks([]);

      mediaRecorder.ondataavailable = (event) => {
        setAudioChunks((prev) => [...prev, event.data]);
      };

      mediaRecorder.onstop = () => {
        sendAudio();
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      addMessage("🎤 Recording...", "user");
    } catch (error) {
      console.error("Microphone error:", error);
      alert(`Microphone error: ${error.message}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudio = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    const reader = new FileReader();

    setShowTyping(true);

    reader.onload = () => {
      const base64Audio = reader.result.split(",")[1];

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ audio: base64Audio }));
        console.log("Audio sent to server");
      } else {
        console.error("WebSocket not connected");
        alert("WebSocket not connected. Please refresh the page.");
        setShowTyping(false);
      }
    };

    reader.readAsDataURL(audioBlob);
  };
  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-button">
          <FaArrowLeft onClick={handleRedirect}/>
        </button>
        <h2 className="chat-title">Prasha Doctor</h2>
        <div className="header-placeholder" />
      </div>

      <div className="chat-messages" ref={chatMessagesRef}>
        {[...messageHistory, ...messages].length === 0 ? (
          <div className="empty-chat">
            <h1>Start a conversation with Prasha Doctor</h1>
          </div>
        ) : (
          [...messageHistory, ...messages].map((msg, index) => (
            <div
              key={msg.id || index}
              className={`message ${
                msg.sender === "user" ? "user-message" : "ai-message"
              }`}
            >
              <div className="message-text">{msg.message_text}</div>
              <div className="message-time">{msg.time}</div>
            </div>
          ))
        )}

        {showTyping && (
          <div className="typing-indicator">
            <span className="dot" />
            <span className="dot delay-200" />
            <span className="dot delay-400" />
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Message..."
          className="input-field"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="record-button" onClick={toggleRecording}>
          {isRecording ? <FaStop className="stop-icon" /> : <FaMicrophone />}
        </button>
        <button className="send-button" onClick={sendMessage}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AiDoctorPage;
