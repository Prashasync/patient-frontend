import { useContext, useEffect, useRef, useState } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { WebSocketContext } from "../../../store/webSocketContext";

const VoiceToVoicePage = ({ onClose, addMessage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [typedText, setTypedText] = useState("");
  const audioRef = useRef(null);

  const mediaRecorderRef = useRef(null);
  const {
    ws,
    response,
    showTyping,
    setShowTyping,
  } = useContext(WebSocketContext);

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
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
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
      addMessage("Recording...", "system");
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
      if (ws && ws.readyState === 1) {
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

  const handleResponse = () => {
    const text = response.data;
    const keywords = response.extracted_keywords;
    const audioData = response.audio;
    
    addMessage(text, "ai", keywords);
    if (audioData && audioRef.current) {
      audioRef.current.src = `data:audio/mp3;base64,${audioData}`;
      audioRef.current
        .play()
        .catch((e) => console.error("Error playing audio:", e));
    }
  };

  useEffect(() => {
    handleResponse();
  }, [response?.data]);

  useEffect(() => {
    if (ws?.readyState === 1) {
      try {
        console.log("VOICE 2 VOICE ws connected");
      } catch (error) {
        console.error("Error connecting VOICE 2 VOICE :", error);
      }
    } else {
      console.warn("WebSocket not open. Unable to send token.");
    }
  }, []);

  useEffect(() => {
    const text = response.data;
    if (!text || typeof text !== "string") return;

    let index = 0;
    setTypedText("");

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index >= text.length) {
          clearInterval(interval);
          return;
        }

        setTypedText((prev) => prev + text.charAt(index));
        index++;
      }, 40);
    }, 0);

    return () => {
      clearTimeout(timeout);
      setTypedText("");
    };
  }, [response]);

  return (
    <div className="voice-to-voice-screen">
      <audio ref={audioRef} style={{ display: "none" }} />

      <img
        src="/voice-avatar.png"
        // alt="Voice Assistant"
        className={`center-image ${showTyping ? "pulse-avatar" : ""}`}
      />
      <div className="ai-text">{typedText}</div>
      <div
        className="voice-assistant-btns"
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={toggleRecording}
          style={{
            backgroundColor: isRecording ? "#e63946" : "#1d3557",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {isRecording ? <FaStop /> : <FaMicrophone />}
        </button>

        <button
          onClick={() => onClose()}
          style={{
            backgroundColor: "#f1faee",
            color: "#1d3557",
            border: "2px solid #1d3557",
            borderRadius: "12px",
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#a8dadc")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#f1faee")}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default VoiceToVoicePage;
