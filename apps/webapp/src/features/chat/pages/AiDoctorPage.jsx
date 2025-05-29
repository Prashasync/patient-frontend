import React, { useState, useEffect, useRef, useContext } from "react";
import {
  FaMicrophone,
  FaArrowRight,
  FaArrowLeft,
  FaStop,
  FaVoicemail,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "../../../shared/styles/aiDoctor.css";
import ChatService from "../services/ChatService";
import VoiceToVoicePage from "./VoiceToVoicePage";
import { WebSocketContext } from "../../../store/webSocketContext";

const AiDoctorPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState(null);
  const [messageInput, setMessageInput] = useState(null);
  const [messages, setMessages] = useState([]);
  const [voiceToVoice, setVoiceToVoice] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [updatePatientId, setUpdatePatientId] = useState(null);
  const lastAiMsg = [...messages].reverse().find((msg) => msg.sender === "ai");
  const lastAiText = lastAiMsg?.text || "";
  const lastAiAudio = lastAiMsg?.audioUrl || "";
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const audioChunksRef = useRef([]);

  const {
    ws,
    isConnected,
    connectWebSocket,
    setRetreivePatientId,
    response,
    transcription,
    patientInfo,
    currentPersona,
    errorMessage,
    showTyping,
    setShowTyping,
  } = useContext(WebSocketContext);

  const fetchAiDoctorHistory = async () => {
    try {
      const response = await ChatService.getAiDoctorChatHistory();
      if (response.status !== 200) {
        navigate("/");
        return;
      }

      console.log(response.data.chat);

      const formattedMessages = response.data.chat
        ?.filter((msg) => msg.message_text && msg.message_text.trim() !== "")
        .map((msg) => {
          const dateObj = new Date(msg.createdAt);
          const time = dateObj.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
          const date = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return {
            id: msg.chat_message_id,
            text: msg.message_text,
            sender: msg.sender_id,
            keywords: msg.keywords || [],
            time: `${time} - ${date}`,
          };
        });

      setMessages(formattedMessages);
    } catch (err) {
      console.error("Failed to fetch chat history", err);
    }
  };

  const handleFeedback = async (id, type) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, feedback: type } : msg
      )
    );

    await ChatService.sendFeedback({ messageId: id, type });
  };

  const handleTranscription = (transcription) => {
    addMessage(transcription, "user");
  };

  const sendMessage = (messageInput) => {
    const message = messageInput.trim();
    if (!message || !ws || ws.readyState !== WebSocket.OPEN) {
      alert("Not connected to server or message is empty.");
      return;
    }

    try {
      ws.send(JSON.stringify({ text: message }));
    } catch (error) {
      console.error("Error sending message:", error);
      setShowTyping(false);
    }
  };

  const handleResponse = (response) => {
    const text = response.data;
    const keywords = response.extracted_keywords;
    if (
      response.extracted_keywords.includes("greeting", "introduction") &&
      localStorage.getItem("introduction")
    ) {
      return;
    }
    localStorage.setItem("introduction", true);
    addMessage(text, "ai", keywords);
  };

  const addMessage = async (text, sender, keywords = []) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      keywords,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      feedback: null,
    };

    setMessages((prev) => [...prev, newMessage]);
    try {
      if (newMessage.sender === "user") {
        await ChatService.sendAiDoctorMessage(newMessage);
      }
      if (newMessage.sender === "ai") {
        await ChatService.saveAiDoctorResponse(newMessage);
      }
    } catch (error) {
      console.error(
        `There was an error saving message ${newMessage.id} to the db.`,
        error
      );
    }
  };

  const handleSendMessage = async () => {
    const message = messageInput.trim();
    try {
      sendMessage(message);
      addMessage(message, "user");
      setMessageInput("");
      setShowTyping(true);
    } catch (error) {
      console.error("There was an error sending the message: ", error);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  const getPersonaClass = () => `persona-indicator persona-${currentPersona}`;
  const getPersonaName = () => {
    const names = {
      general: "Dr. Ori",
      psychologist: "Psychologist",
      dietician: "Dietician",
    };
    return names[currentPersona] || "General OPD";
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Audio recording is not supported in this browser.");
      return;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      console.warn("Already recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef.current = mediaRecorder;
      setAudioChunks([]);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        sendAudio();
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
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
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    audioChunksRef.current = [];
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

  const handleBack = () => {
    navigate("/home");
  };

  const handleVoiceToVoice = () => {
    setVoiceToVoice(!voiceToVoice);
  };

  useEffect(() => {
    connectWebSocket();
  }, [updatePatientId]);

  useEffect(() => {
    setUpdatePatientId(patientId);
    setRetreivePatientId(patientId);
  }, []);

  useEffect(() => {
    if (response?.data) {
      handleResponse(response);
    }
  }, [response]);

  useEffect(() => {
    handleTranscription(transcription);
  }, [transcription]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isConnected && !historyLoaded) {
      fetchAiDoctorHistory();
      setHistoryLoaded(true);
    }
  }, [isConnected]);

  return (
    <React.Fragment>
      {voiceToVoice ? (
        <VoiceToVoicePage
          text={lastAiText}
          audioSrc={lastAiAudio}
          onClose={() => setVoiceToVoice(false)}
          addMessage={addMessage}
        />
      ) : (
        <div className="chat-container">
          <audio ref={audioRef} style={{ display: "none" }} />

          <div className="chat-header">
            <button className="back-button" onClick={handleBack}>
              <FaArrowLeft />
            </button>
            <h2 className="chat-title">
              <span className={getPersonaClass()}>{getPersonaName()}</span>
            </h2>
            <div className="connection-status">
              <span className={isConnected ? "connected" : "disconnected"}>
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>

          <div className="chat-body">
            {patientInfo && (
              <div className="sidebar">
                <div className="patient-info">
                  <h3>Patient Information</h3>
                  <div className="info-content">
                    {patientInfo.name && (
                      <div className="info-section">
                        <h4>Basic Info</h4>
                        <div className="info-item">
                          <strong>Name:</strong> {patientInfo.name}
                        </div>
                        <div className="info-item">
                          <strong>Gender:</strong> {patientInfo.gender}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  ref={chatMessagesRef}
                  className={`message ${
                    msg.sender === process.env.REACT_APP_DOCTOR_ID ||
                    msg.sender === "ai"
                      ? "ai"
                      : "user"
                  }`}
                >
                  <div className="text">{msg.text}</div>
                  <span className="time">{msg.time}</span>

                  {msg.sender === "ai" && (
                    <div className="feedback-buttons">
                      <button
                        onClick={() => handleFeedback(msg.id, "up")}
                        className={`thumb-button ${
                          msg.feedback === "up" ? "active" : ""
                        }`}
                      >
                        👍
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, "down")}
                        className={`thumb-button ${
                          msg.feedback === "down" ? "active" : ""
                        }`}
                      >
                        👎
                      </button>
                    </div>
                  )}
                  <div ref={chatMessagesRef} />
                </div>
              ))}
              {showTyping && (
                <div className="message ai">
                  <div className="text">typing...</div>
                </div>
              )}
            </div>
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button onClick={handleSendMessage}>
              <FaArrowRight />
            </button>
            <button onClick={toggleRecording}>
              {isRecording ? <FaStop /> : <FaMicrophone />}
            </button>
            <button onClick={handleVoiceToVoice}>
              <FaVoicemail />
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AiDoctorPage;
