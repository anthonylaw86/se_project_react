import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className="switch">
      <input
        type="checkbox"
        className={`switch__box ${theme}`}
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? `switch__slider switch__slider-F ${theme}`
            : `switch__slider switch__slider-C ${theme}`
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        } ${theme}`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        } ${theme}`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
