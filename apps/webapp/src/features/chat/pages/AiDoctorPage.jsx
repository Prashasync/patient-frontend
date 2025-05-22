import React, { useState, useEffect, useRef } from "react";
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

const AiDoctorPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [currentPersona, setCurrentPersona] = useState("general");
  const [isConnected, setIsConnected] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [voiceToVoice, setVoiceToVoice] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const audioRef = useRef(null);
  const wsRef = useRef(null);
  const lastAiMsg = [...messages].reverse().find((msg) => msg.sender === "ai");
  const lastAiText = lastAiMsg?.text || "";
  const lastAiAudio = lastAiMsg?.audioUrl || ""; 

  const navigate = useNavigate();
  const { patientId } = useParams();
  const jwtToken = process.env.REACT_APP_DOCTOR_TOKEN;
  const remoteServerUrl = process.env.REACT_APP_DOCTOR_URL;

  const fetchAiDoctorHistory = async () => {
    try {
      const response = await ChatService.getAiDoctorChatHistory();
      if (response.status !== 200) {
        navigate("/");
        return;
      }

      const formattedMessages = response.data.map((msg) => ({
        id: msg.chat_message_id,
        text: msg.message_text,
        sender: msg.sender_id,
        keywords: msg.keywords || [],
        time: new Date(msg.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
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

  const connectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    try {
      const protocol = remoteServerUrl.startsWith("https") ? "wss:" : "ws:";
      const host = remoteServerUrl.replace(/^https?:\/\//, "");
      const wsUrl = `${protocol}//${host}/chat-final/${patientId}`;

      console.log("Connecting to WebSocket:", wsUrl);
      const websocket = new WebSocket(wsUrl);
      wsRef.current = websocket;

      websocket.onopen = () => {
        console.log("WebSocket connection opened");
        setIsConnected(true);
        websocket.send(JSON.stringify({ token: jwtToken }));
      };

      websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log(data)
          setShowTyping(false);

          if (data.error) {
            console.error("Server error:", data.error);
            addMessage(`Error: ${data.error}`, "system");
            return;
          }

          if (data.transcription) {
            handleTranscription(data.transcription);
            return;
          }

          if (data.patient_info) {
            setPatientInfo(data.patient_info);
            return;
          }

          if (data.response) {
            if (data.current_persona) {
              setCurrentPersona(data.current_persona);
            }
            handleResponse(data.response, data.extracted_keywords, data.audio);
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      websocket.onclose = (event) => {
        console.log(
          `WebSocket closed: Code ${event.code}, Reason: ${event.reason}`
        );
        setIsConnected(false);
      };

      websocket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
      };
    } catch (error) {
      console.error("Error creating WebSocket:", error);
      addMessage(`Error connecting to server: ${error.message}`, "system");
    }
  };

  const handleTranscription = (text) => {
    addMessage(text, "user");
  };

  const handleResponse = (text, keywords = [], audioData = null) => {
    addMessage(text, "ai", keywords);
    if (audioData && audioRef.current) {
      audioRef.current.src = `data:audio/mp3;base64,${audioData}`;
      audioRef.current
        .play()
        .catch((e) => console.error("Error playing audio:", e));
    }
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

  const sendMessage = async () => {
    const message = messageInput.trim();
    if (
      !message ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    ) {
      alert("Not connected to server or message is empty.");
      return;
    }

    addMessage(message, "user");
    setShowTyping(true);

    try {
      console.log(message);
      wsRef.current.send(JSON.stringify({ text: message }));
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
        setAudioChunks((prev) => [...prev, event.data]);
      };

      mediaRecorder.onstop = () => {
        sendAudio();
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      // addMessage("Recording...", "system");
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
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ audio: base64Audio }));
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

  const getPersonaClass = () => `persona-indicator persona-${currentPersona}`;
  const getPersonaName = () => {
    const names = {
      general: "Dr. Ori",
      psychologist: "Psychologist",
      dietician: "Dietician",
    };
    return names[currentPersona] || "General OPD";
  };

  const handleVoiceToVoice = () => {
    setVoiceToVoice(!voiceToVoice);
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    fetchAiDoctorHistory();
  }, []);

  return (
    <>
      {voiceToVoice ? (
        <VoiceToVoicePage
          text={lastAiText}
          audioSrc={lastAiAudio}
          onClose={() => setVoiceToVoice(false)}
          webSocket={wsRef.current}
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
              Healthcare Chat{" "}
              <span className={getPersonaClass()}>{getPersonaName()}</span>
            </h2>
            <div className="connection-status">
              <span className={isConnected ? "connected" : "disconnected"}>
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>

          <div className="chat-body" ref={chatMessagesRef}>
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
            <button onClick={sendMessage}>
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
    </>
  );
};

export default AiDoctorPage;
