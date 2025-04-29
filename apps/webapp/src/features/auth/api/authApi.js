import axios from "axios";

const AuthApi = {
  async fetchUserApi() {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/user`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },

  async loginUserApi(data) {
    return axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  async registerUserApi(data) {
    return axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  async verifyOtpApi(data) {
    console.log("Verifying OTP with data:", data);
    return axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/verify-otp`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};

export default AuthApi;
