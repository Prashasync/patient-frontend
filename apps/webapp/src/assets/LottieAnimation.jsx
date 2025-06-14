import React from "react";
import Lottie from "lottie-react";
import animationData from "./icons/framer.json"

const LottieAnimation = () => {
  return (
    <div>
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
};

export default LottieAnimation;
