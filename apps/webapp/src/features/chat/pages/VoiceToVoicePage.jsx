import { useContext, useEffect, useRef, useState } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { WebSocketContext } from '../../../store/webSocketContext';
import bot_listing_icon from '../../../assets/icons/bot_listing_icon.gif';
import DoctorTova from '../../../assets/icons/doctor-female1.png';
import DoctorMaya from '../../../assets/icons/doctor-female2.png';
import DoctorOri from '../../../assets/icons/doctor-male.jpg';

const VoiceToVoicePage = ({ onClose, addMessage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [recordingMessage, setRecordingMessage] = useState(null);
  const [listening, setListening] = useState();
  const [answerindicator, setAnswerindicator] = useState();
  const [imgsrc, SetImgsrc] = useState('');
  const audioRef = useRef(null);
  const indexRef = useRef(null);

  const mediaRecorderRef = useRef(null);
  const { ws, response, showTyping, currentPersona, setShowTyping } =
    useContext(WebSocketContext);

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      setAnswerindicator(0);
      console.log('value of toggle after stop in toggle', answerindicator);

      setIsRecording(false);
    } else {
      await startRecording();
      console.log('value of togglerecord else part', answerindicator);
    }
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert('Audio recording is not supported in this browser.');
      return;
    }
    setListening(true);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      console.warn('Already recording.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        console.log('event value ', event);
        setAudioChunks((prev) => [...prev, event.data]);
        console.log('audio chunks', audioChunks);
      };

      mediaRecorder.onstop = () => {
        sendAudio();
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      addMessage('Recording...', 'system');
    } catch (error) {
      console.error('Microphone error:', error);
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
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    console.log('audio blob size', audioBlob);
    if (audioBlob.size < 1000) {
      console.warn('Recording too short or empty. Not sending.');
      addMessage('Recording was too short. Try again.', 'system');
      setShowTyping(false);
      return;
    }

    const reader = new FileReader();
    setShowTyping(true);

    reader.onload = () => {
      const base64Audio = reader.result.split(',')[1];
      if (ws && ws.readyState === 1) {
        ws.send(JSON.stringify({ audio: base64Audio }));
        console.log('Audio sent to server');
      } else {
        console.error('WebSocket not connected');
        alert('WebSocket not connected. Please refresh the page.');
        setShowTyping(false);
      }
    };

    reader.readAsDataURL(audioBlob);
  };

  const handleResponse = () => {
    const text = response.data;
    const keywords = response.extracted_keywords;
    const audioData = response.audio;

    addMessage(text, 'ai', keywords);
    if (audioData && audioRef.current) {
      audioRef.current.src = `data:audio/mp3;base64,${audioData}`;
      audioRef.current
        .play()
        .catch((e) => console.error('Error playing audio:', e));
    }
  };

  useEffect(() => {
    if (ws?.readyState === 1) {
      try {
        console.log('VOICE 2 VOICE ws connected');
      } catch (error) {
        console.error('Error connecting VOICE 2 VOICE :', error);
      }
    } else {
      console.warn('WebSocket not open. Unable to send token.');
    }
  }, []);

  //   useEffect(() => {
  //   handleResponse();
  // }, [audioChunks]);

  useEffect(() => {
    setAnswerindicator(1);
    const text = `  ${response?.data}`;
    const keywords = response?.extracted_keywords;
    const audioData = response?.audio;

    console.log('value of useeffect for setindicator', answerindicator);

    if (!text || typeof text !== 'string') return;

    setTypedText('');
    setShowTyping(true);

    let i = 0;
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval);
        setShowTyping(false);
        return;
      }

      setTypedText((prev) => prev + text.charAt(i));
      i++;
    }, 40);

    addMessage(text, 'ai', keywords);
    if (
      audioData &&
      audioRef.current &&
      audioRef.current.src !== `data:audio/mp3;base64,${audioData}`
    ) {
      const audioElement = audioRef.current;

      // Stop any current playback before assigning new source
      audioElement.pause();
      audioElement.currentTime = 0;
      audioRef.current.src = `data:audio/mp3;base64,${audioData}`;
      audioRef.current.play().catch((e) => console.error('Audio error:', e));
    }

    return () => {
      clearInterval(interval);
      setTypedText('');
    };
  }, [response]);

  return (
    <div className="voice-to-voice-screen">
      <audio ref={audioRef} style={{ display: 'none' }} />

      {currentPersona === 'psychologist' ? (
        <img
          className={`center-image ${showTyping ? 'talking-avatar' : ''}`}
          src={DoctorOri}
        />
      ) : currentPersona === 'dietician' ? (
        <img
          className={`center-image ${showTyping ? 'talking-avatar' : ''}`}
          src={DoctorMaya}
        />
      ) : (
        <img
          className={`center-image ${showTyping ? 'talking-avatar' : ''}`}
          src={DoctorTova}
        />
      )}

      {isRecording ? (
        <div style={{ textAlign: 'center' }}>
          <div className="listen"></div>
          <p className="ai-text">Is Listening!</p>
        </div>
      ) : (
        <div className="ai-text">
          {answerindicator ? (
            typedText
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div className="stop-listen"></div>{' '}
              <p>Thinking for a response!</p>
            </div>
          )}
        </div>
      )}
      <div
        className="voice-assistant-btns"
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <button
          onClick={toggleRecording}
          style={{
            backgroundColor: isRecording ? '#e63946' : '#1d3557',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          {isRecording ? <FaStop /> : <FaMicrophone />}
        </button>

        <button
          onClick={() => onClose()}
          style={{
            backgroundColor: '#f1faee',
            color: '#1d3557',
            border: '2px solid #1d3557',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#a8dadc')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#f1faee')}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default VoiceToVoicePage;
