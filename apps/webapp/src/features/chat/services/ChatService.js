import ChatApi from "../apis/ChatApi";

const ChatService = {
  async getChatHistory() {
    try {
      const response = await ChatApi.getChatHistoryApi();

      if (response?.unauthorized) {
        console.warn("User is unauthorized.");
        return null;
      }

      return response;
    } catch (error) {
      console.error("There was an error inside getChatService:", error);
      throw error;
    }
  },

  async getAiDoctor() {
    try {
      const response = await ChatApi.getAiDoctor();
      console.log(response)
    } catch (error) {
      console.log("There was an error in the service layer.", error);
    }
  }
};

export default ChatService;
