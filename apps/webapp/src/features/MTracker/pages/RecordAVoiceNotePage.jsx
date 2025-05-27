import React, { useRef, useState } from 'react';
import { Mic, StopCircle, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MTrackerService from '../services/MTrackerService';

const RecordAVoiceNotePage = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      setAudioBlob(blob);
      setMessage('Voice note recorded successfully ✅');
    };

    mediaRecorderRef.current.start();
    setRecording(true);
    setMessage('Recording...');
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleSkip = () => {
    navigate('/mtracker');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioBlob) {
      setMessage('No voice note to submit.');
      return;
    }

    const formData = new FormData();
    formData.append('voiceNote', audioBlob, 'voicenote.webm');

    try {
      const response = await MTrackerService.addMoodVoiceNote(formData);
      if (response.status === 200) {
        navigate('/mtracker');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      console.error('Upload error:', error);
      setMessage('Error uploading voice note ❌');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-10 ">
      <h2 className="text-xl font-semibold mb-4">
        🎤 Would You Like To Leave a Voice Note
      </h2>

      <div className="flex items-center gap-4 mb-4">
        {!recording ? (
          <button
            type="button"
            onClick={startRecording}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 w-full text-center"
          >
            <Mic size={20} /> Record
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <StopCircle size={20} /> Stop
          </button>
        )}

        {audioBlob && (
          <audio controls className="w-full">
            <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>

      <button
        type="submit"
        disabled={!audioBlob}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <UploadCloud size={18} /> Submit Voice Note
      </button>
      <button onClick={handleSkip} className="skip">
        Skip
      </button>

      {message && (
        <p className="mt-3 text-sm text-center text-gray-700">{message}</p>
      )}
    </form>
  );
};

export default RecordAVoiceNotePage;
