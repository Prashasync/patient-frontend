import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import AuthService from "../../features/auth/services/authService";

const GoogleAuth = () => {
  const navigate = useNavigate();
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={async (response) => {
          try {
            const serverResponse = await AuthService.googleLogin(response)
            console.log(serverResponse)
            if (serverResponse.status === 200) {
              navigate("/otp");
            }
          } catch (error) {
            console.error(error);
            console.log(
              "There was an error retreiving your credentials",
              error
            );
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
