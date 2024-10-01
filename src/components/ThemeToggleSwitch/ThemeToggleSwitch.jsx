import React from "react";
import "./ThemeToggleSwitch.css";

import sunIcon from "../../assets/sun.svg";
import moonIcon from "../../assets/yellow-crescent-moon.png";

function ThemeToggleSwitch({ onToggle, isDay }) {
  return (
    <div className="toggle-constainer" onClick={onToggle}>
      <img
        src={isDay ? sunIcon : moonIcon}
        alt={isDay ? "Day Mode" : "Night Mode"}
        className="toggle-icon"
      />
      <input
        type="checkbox"
        checked={!isDay}
        readOnly
        className="toggle-input"
      />
    </div>
  );
}

export default ThemeToggleSwitch;
