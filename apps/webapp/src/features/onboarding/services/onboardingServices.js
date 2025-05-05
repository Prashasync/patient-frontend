import OnboardingApi from "../apis/onboardingApi";

const OnboardingService = {
  async getOnboardingData() {
    try {
      const response = await OnboardingApi.getOnboardingData();
      return response;
    } catch (error) {
      console.error("Error in OnboardingService:", error);
      throw error;
    }
  },

  async postOnboardingData(data) {
    try {
      const response = await OnboardingApi.postOnboardingData(data);
      return response;
    } catch (error) {
      console.error("Error in OnboardingService:", error);
      throw error;
    }
  },
};

export default OnboardingService;
