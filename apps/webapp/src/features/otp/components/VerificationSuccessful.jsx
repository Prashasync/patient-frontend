import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationSuccessful = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/onboarding');
    }, 3000);
  }, []);
  return (
    <div className="container">
      <h1 className="title">Verification Successful</h1>
      <div className="checkmark-circle">
        <span className="checkmark">✓</span>
      </div>
      <p className="subtitle">
        Your account is now secure. Youre all set to continue.
      </p>
    </div>
  );
};

export default VerificationSuccessful;
