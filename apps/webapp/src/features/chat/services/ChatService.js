import ChatApi from "../apis/ChatApi";

const ChatService = {
  async getAiDoctorChatHistory() {
    try {
      return await ChatApi.getAiDoctorChatHistory();
    } catch (error) {
      console.error("There was an error inside getChatService:", error);
      throw error;
    }
  },

  async sendAiDoctorMessage(data) {
    try {
      const response = await ChatApi.sendAiDoctorMessage(data);
      return response;
    } catch (error) {
      console.error("There was an error inside sendMessage:", error);
      throw error;
    }
  },

  async saveAiDoctorResponse(data) {
    try {
      const response = await ChatApi.saveAiDoctorResponse(data);
      return response;
    } catch (error) {
      console.error("There was an error inside getChatRoom:", error);
      throw error;
    }
  },

  async sendFeedback() {
    try {
      const response = await ChatApi.sendFeedback(data);
      return response;
    } catch (error) {
      console.error("There was an error inside getChatRoom:", error);
      throw error;
    }
  },

  async getChatRoom(doctor_id) {
    try {
      const response = await ChatApi.getChatRoom(doctor_id);
      return response;
    } catch (error) {
      console.error("There was an error inside getChatRoom:", error);
      throw error;
    }
  },
};

export default ChatService;
