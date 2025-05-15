import AuthApi from "../api/authApi";

const AuthService = {
  async fetchUserData() {
    try {
      const response = await AuthApi.fetchUserApi();
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

  async fetchAWSCreds() {
    try {
      return await AuthApi.getAWSCreds();
    } catch (error) {
      console.error("There was an error fetching the creds", error);
      throw error;
    }
  },

  async googleLogin(data) {
    try {
      const response = await AuthApi.googleLogin(data);
      localStorage.setItem("email", JSON.stringify(response.data.user.email));
      return {
        message: "GOOGLE_LOGIN_SUCCESS",
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Google login error:", error);
      return {
        message: "GOOGLE_LOGIN_FAILED",
        status: error.response?.status || 500,
        data: error.response?.data || { error: "Unknown error occurred" },
      };
    }
  },

  async verifyRecoveryOtp(data) {
    try {
      const response = await AuthApi.verifyRecoveryOtp(data);
      return {
        message: "RECOVERY_OTP_VERIFIED",
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Recovery OTP verification error:", error);
      return {
        message: "RECOVERY_OTP_VERIFICATION_FAILED",
        status: error.response?.status || 500,
        data: error.response?.data || { error: "Unknown error occurred" },
      };
    }
  },

  async resetPassword(data) {
    try {
      const response = await AuthApi.resetPassword(data);
      return {
        message: "PASSWORD_RESET_SUCCESS",
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Password reset error:", error);
      return {
        message: "PASSWORD_RESET_FAILED",
        status: error.response?.status || 500,
        data: error.response?.data || { error: "Unknown error occurred" },
      };
    }
  }
};

export default AuthService;
