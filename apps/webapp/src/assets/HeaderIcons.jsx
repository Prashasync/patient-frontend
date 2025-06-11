import React, { useState } from "react";
import gridIcon from "../assets/icons/grid-line.svg";
import searchIcon from "../assets/icons/search_line.svg";
import bellIcon from "../assets/icons/Union.png";
import SettingsAccount from "../features/settings/components/Settings";

const HeaderIcons = () => {
  const [openSettings, setOpenSettings] = useState(false);

  const handleOpenSettings = () => {
    setOpenSettings(!openSettings);
  };

  return (
    <div className="home-header">
      <button onClick={handleOpenSettings}>
        <img src={gridIcon} alt="Menu" className="header-button-icon" />
      </button>
      <div className="header-buttons">
        <button>
          <img src={searchIcon} alt="Search" className="header-button-icon" />
        </button>
        <button>
          <img
            src={bellIcon}
            alt="Notifications"
            className="header-button-icon"
          />
        </button>
      </div>
      <div className={openSettings ? "settings-open" : "settings-close"}>
        <SettingsAccount />
      </div>
    </div>
  );
};

export default HeaderIcons;
