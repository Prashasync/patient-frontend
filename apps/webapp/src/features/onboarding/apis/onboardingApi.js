import axios from "axios";

const OnboardingApi = {
  async getOnboardingData() {
    try {
      return await axios.get(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/onboarding-status`,
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error fetching onboarding data:", error);
      throw error;
    }
  },

  async postOnboardingData(data) {
    try {
      return await axios.post(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/onboarding-status`,
        data,
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error posting onboarding data:", error);
      throw error;
    }
  }
};

export default OnboardingApi;
