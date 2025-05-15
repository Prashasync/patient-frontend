import axios from "axios";

const AuthApi = {
  async fetchUserApi() {
    try {
      return axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/profile`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },

  async loginUserApi(data) {
    try {
      return axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  },

  async googleLogin(response) {
    try {
      return axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/create-google-account`,
        response,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error during Google login:", error);
      throw error;
    }
  },

  async registerUserApi(data) {
    try {
      return axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  async sendOtpApi(data) {
    try {
      return axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/send-otp`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  },  

  async verifyOtpApi(data) {
    try {
      return axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/verify-otp`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  },

  async getAWSCreds() {
    try {
      return axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/aws_configs`
      );
    } catch (error) {
      console.error("There was an error in the auth api:", error);
      throw error;
    }
  },

  async verifyRecoveryOtp(data) {
    try {
      return await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/verify-password-recovery-otp`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error verifying recovery OTP:", error);
      throw error;
    }
  },

  async resetPassword(data) {
    try {
      return axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/reset-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  },
};

export default AuthApi;
