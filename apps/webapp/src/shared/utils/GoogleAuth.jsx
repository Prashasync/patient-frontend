import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const navigate = useNavigate();
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={async (response) => {
          try {
            const serverResponse = await axios.post(
              `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/create-google-account`,
              response,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
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
