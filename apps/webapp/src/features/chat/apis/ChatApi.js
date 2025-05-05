import axios from "axios";

const ChatApi = {
  async getChatHistoryApi() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/chat`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return { unauthorized: true };
      }
      console.error("Chat API error:", error);
      throw error;
    }
  },

  async getAiDoctor() {
    return axios.get(
      `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/ai-doctor`,
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      }
    );
  }
};

export default ChatApi;
