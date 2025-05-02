import axios from "axios";

const AuthApi = {
  async fetchUserApi() {
    try {
      return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/user`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
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
};

export default AuthApi;
