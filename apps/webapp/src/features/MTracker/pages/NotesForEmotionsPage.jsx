import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MTrackerService from '../services/MTrackerService';

const NotesForEmotionsPage = () => {
  const [formData, setFormData] = useState('');
  const navigate = useNavigate();

  const handleTextareaChange = (event) => {
    setFormData(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await MTrackerService.addMoodNotes(formData);
      if (response.status === 200) {
        navigate('/symptom-tracker/questionare/4');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
        return;
      }
      console.error('Error submitting note:', error);
    }
  };

  const handleSkip = () => {
    navigate('/symptom-tracker/questionare/4');
  };

  return (
    <div className="note-container">
      <form>
        <h1 className="title">Would you like to add a note?</h1>
        <label htmlFor="note">Quick Note</label>
        <textarea
          placeholder="Write your note here..."
          className="note-textarea"
          rows={10}
          value={formData}
          onChange={handleTextareaChange}
        ></textarea>
      </form>
      <div className="notes-btn">
        <button onClick={handleSkip}>Skip</button>
        <button onClick={handleSubmit} className="note-submit-button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default NotesForEmotionsPage;
