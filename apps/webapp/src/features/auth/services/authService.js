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

  async updateUserProfile(data) {
    try {
      const response = await AuthApi.updateUserProfileApi(data);
      return {
        message: "PROFILE_UPDATED",
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.log(error)
      return {
        message: error.response?.data?.message || "PROFILE_UPDATE_FAILED",
        status: error.status || 500,
      };
    }
  },

  async sendOtp(data) {
    try {
      const response = await AuthApi.sendOtpApi(data);
      return {
        message: "Otp SENT to Email",
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        message: "OTP Failed to send",
        status: error.response?.status || 500,
        data: error.response?.data || { error: "Unknown error occurred" },
      };
    }
  },

  async registerUser(data) {
    try {
      const response = await AuthApi.registerUserApi(data);
      localStorage.setItem("email", response.data.token);
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

  async googleLogin(data) {
    try {
      const response = await AuthApi.googleLogin(data);
      localStorage.setItem("email", response.data.user.email);
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
  },

  async logout() {
    try {
      const response = await AuthApi.logout();
      return {
        message: "Logout successful",
        status: response.status,
      };
    } catch (error) {
      return {
        message: "Logout failed, please try again.",
        status: error.response?.status || 500,
        data: error.response?.data || { error: "Unknown error occurred" },
      };
    }
  },
};

export default AuthService;
