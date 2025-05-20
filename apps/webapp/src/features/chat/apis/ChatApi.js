import axios from "axios";

const ChatApi = {
  async getAiDoctorChatHistory() {
    try {
      return await axios.get(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/chat/ai-doctor`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      if (error.response?.status === 401) {
        return { unauthorized: true };
      }
      console.error("Chat API error:", error);
      throw error;
    }
  },

  async sendAiDoctorMessage(data) {
    try {
      return await axios.post(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/chat/ai-doctor`,
        { data },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Chat API error:", error);
      throw error;
    }
  },

  async saveAiDoctorResponse(data) {
    try {
      return await axios.post(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/chat/ai-doctor-response`,
        { data },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Chat API error:", error);
      throw error;
    }
  },

  async getChatRoom(doctor_id) {
    try {
      return await axios.get(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/chat/${doctor_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Chat API error:", error);
      throw error;
    }
  },

  async sendFeedback(data) {
    try {
      return await axios.get(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/chat/ai-doctor-feedback`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Chat API error:", error);
      throw error;
    }
  }
};

export default ChatApi;
