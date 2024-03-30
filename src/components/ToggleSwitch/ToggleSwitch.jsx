import React, { useContext, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  //   currentTemperatureUnit === 'F'
  //     ? setCurrentTemperatureUnit('C')
  //     : setCurrentTemperatureUnit('F');
  // };
  // const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");

  // const handleChange = (e) => {
  //   if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  //   if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  // };

  // console.log(currentTemperatureUnit);

  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
