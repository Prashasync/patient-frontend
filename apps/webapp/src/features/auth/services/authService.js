import AuthApi from "../api/authApi";

const AuthService = {
  async fetchUserData() {
    try {
      const response = await AuthApi.fetchUserApi();
      console.log(response)
      return {
        message: "USER_FETCHED",
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        message: "USER_FETCH_FAILED",
        status: error.response?.status || 500,
        data: error.response?.data || { error: "Unknown error occurred" },
      };
    }
  },

  async registerUser(data) {
    try {
      const response = await AuthApi.registerUserApi(data);
      localStorage.setItem("user", JSON.stringify(response.data.token));
      return {
        message: "REGISTER_SUCCESSFUL",
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        message: "REGISTER_FAILED",
        status: error.response?.status || 500,
        data: error.response?.data || { error: "Unknown error occurred" },
      };
    }
  },

  async verifyOtp(data) {
    try {
      const response = await AuthApi.verifyOtpApi(data);
      return {
        message: "OTP_VERIFIED",
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      // console.log("Error verifying OTP:", error);
      return {
        message: "OTP_VERIFICATION_FAILED",
        status: error.response?.status || 500,
        data: error.response?.data || { error: "Unknown error occurred" },
      };
    }
  },

  async loginUser(data) {
    try {
      const response = await AuthApi.loginUserApi(data);
      return {
        message: response.message,
        status: response.status,
      };
    } catch (error) {
      console.error("Login error:", error);
      const status = error.response?.status || 500;
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      const errorData = error.response?.data || {
        error: "Unknown error occurred",
      };

      return {
        message,
        status,
        data: errorData,
      };
    }
  },
};

export default AuthService;
