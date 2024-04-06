import WeatherCard from "./WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "./ItemCard/ItemCard";
import "./Main.css";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import React from "react";

function Main({ weatherData, onCardClick, onCardDelete, cards }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.temp?.[currentTemperatureUnit] || 999;

  return (
    <main>
      <WeatherCard weatherData={weatherData?.temp[currentTemperatureUnit]} />
      <section className="cards">
        <p className="cards__text">
          Today is {temp} &deg; {[currentTemperatureUnit]} / You may want to
          wear:
        </p>
        <ul className="cards__list">
          {cards
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                  onCardDelete={onCardDelete}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
