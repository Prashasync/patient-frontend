import React, { createContext, useRef, useState } from 'react';
export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children, remoteServerUrl, jwtToken }) => {
  const wsRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [retreivePatientId, setRetreivePatientId] = useState('');
  const [response, setResponse] = useState({});
  const [transcription, setTranscription] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [currentPersona, setCurrentPersona] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const connectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    try {
      const protocol = remoteServerUrl.startsWith('https') ? 'wss:' : 'ws:';
      const host = remoteServerUrl.replace(/^https?:\/\//, '');
      const wsUrl = `${protocol}//${host}/chat-final/${retreivePatientId}`;

      const websocket = new WebSocket(wsUrl);
      wsRef.current = websocket;

      websocket.onopen = () => {
        console.log('WebSocket connection opened');
        setIsConnected(true);
        websocket.send(JSON.stringify({ token: jwtToken }));
      };

      websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setShowTyping(false);

          if (data.error) {
            console.error('Server error:', data.error);
            setErrorMessage(`Error: ${data.error}`);
            return;
          }

          if (data.transcription) {
            setTranscription(data.transcription);
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

            setResponse({
              data: data.response,
              extracted_keywords: data.extracted_keywords,
              audio: data.audio,
            });
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      websocket.onclose = () => setIsConnected(false);
      websocket.onerror = () => setIsConnected(false);
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        ws: wsRef.current,
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
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
