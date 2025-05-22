import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";

const VoiceToVoicePage = ({
  text,
  audioSrc,
  onClose,
  webSocket,
  addMessage,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const jwtToken = process.env.REACT_APP_DOCTOR_TOKEN;
  const mediaRecorderRef = useRef(null);

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
    // setShowTyping(true);

    reader.onload = () => {
      const base64Audio = reader.result.split(",")[1];
      if (
        webSocket.current &&
        webSocket.current.readyState === WebSocket.OPEN
      ) {
        webSocket.current.send(JSON.stringify({ audio: base64Audio }));
        console.log("Audio sent to server");
      } else {
        console.error("WebSocket not connected");
        alert("WebSocket not connected. Please refresh the page.");
        // setShowTyping(false);
      }
    };

    reader.readAsDataURL(audioBlob);
  };

  useEffect(() => {
    if (webSocket?.readyState === WebSocket.OPEN) {
      try {
        webSocket.send(JSON.stringify({ type: "auth", token: jwtToken }));
      } catch (error) {
        console.error("Error sending auth message:", error);
      }
    } else {
      console.warn("WebSocket not open. Unable to send token.");
    }
  }, []);
  

  return (
    <div className="voice-to-voice-screen">
      <span></span>
      <img
        src="/voice-avatar.png"
        // alt="Voice Assistant"
        className="center-image"
      />
      <div className="ai-text">{text}</div>
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
