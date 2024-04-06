import React from "react";
import { createContext } from "react";

export const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

export default { CurrentTemperatureUnitContext };
