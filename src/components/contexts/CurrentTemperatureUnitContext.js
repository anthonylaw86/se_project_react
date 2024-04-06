import React from "react";
import { createContext } from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

export default { CurrentTemperatureUnitContext };
