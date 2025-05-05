import React, { useEffect } from "react";
// import "../../../shared/styles/header.css";
import { useDarkMode } from "usehooks-ts";
import ThemeToggle from "../utils/ThemeToggle";

const Header = () => {
  const { isDarkMode } = useDarkMode();

  // useEffect(() => {
  //   document.body.classList.toggle("dark", isDarkMode);
  // }, [isDarkMode]);
  return (
    <div>
      <Header />
      <ThemeToggle />
    </div>
  );
};

export default Header;
