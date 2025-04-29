import React, { useEffect, useState } from 'react';
import "../../../shared/styles/splashScreen.css";
import logo from '../../../assets/icons/prasha-logo.svg';
import SplashScreen1 from './SplashScreen1';


const SplashScreen = () => {
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNext(true);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showNext ? (
        <SplashScreen1 />
      ) : (
        <div className="splash-container bg-primary flex items-center justify-center min-h-screen transition-opacity duration-500">
          <img src={logo} alt="Prasha Sync Logo" className="logo" />
        </div>
      )}
    </>
  );
};

export default SplashScreen;
