import React from "react";
import { Apple } from "lucide-react"; 

const AppleLoginButton = () => {
  const handleClick = () => {
    alert("Login with Apple coming soon!");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 bg-whitesmoke text-black border border-grey px-4 py-2 rounded-lg hover:opacity-90 transition"
    >
      <Apple size={20} />
      <span>Continue with Apple</span>
    </button>
  );
};

export default AppleLoginButton;
