import axios from "axios";

const MTrackerApi = {
  async getMoodHistory() {
    try {
      return await axios.get(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/mood-history`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      if (error.status === 401) {
        return {
          isAuthorized: false,
        };
      }
      console.error("There was an error with the API request:", error);
      throw error;
    }
  },

  async getEmotions(patient_id) {
    try {
      return await axios.get(
        `${process.env.REACT_APP_DOCTOR_URL}/emotion/patient/${patient_id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_DOCTOR_ID}`,
          },
        }
      );
    } catch (error) {
      console.error("There was an error with the API request: ", error);
      throw error;
    }
  },

  async addMood(emotion) {
    try {
      return await axios.post(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/mood`,
        emotion,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      if (error.status === 401) {
        return {
          isAuthorized: false,
        };
      }
      console.error("There was an error making the API call:", error);
      throw error;
    }
  },

  async addMoodCause(data) {
    try {
      return axios.post(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/cause-of-mood`,
        { data },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("There was an error making the API call: ", error);
      throw error;
    }
  },

  async addMoodNotes(data) {
    try {
      return await axios.post(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/mood-notes`,
        { data },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error inside the API: ", error);
      throw error;
    }
  },

  async addMoodVoiceNote(data) {
    try {
      return await axios.post(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/voicenote`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("There was an error inside the service: ", error);
      throw error;
    }
  },
};

export default MTrackerApi;
