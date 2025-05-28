import React from 'react';
import { Apple } from 'lucide-react';

const AppleLoginButton = () => {
  const handleClick = () => {
    alert('Login with Apple coming soon!');
  };

  return (
    <div className="social-login-container">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:opacity-90 transition"
      >
        Login via Apple
        <Apple size={20} />
      </button>
    </div>
  );
};

export default AppleLoginButton;
