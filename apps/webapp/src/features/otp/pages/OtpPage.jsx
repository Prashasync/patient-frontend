import React, { useEffect, useState } from "react";
import "../../../shared/styles/otp.css";
import EmailVerification from "../components/EmailVerification.jsx";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("email");
    if (!user) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
    }
  }, []);
  return (
    <div className="otp">
      <EmailVerification user={user} />
    </div>
  );
};

export default OtpPage;
