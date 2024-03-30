import WeatherCard from "./WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "./ItemCard/ItemCard";
import "./Main.css";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTemperatureUnit);
  const temp = weatherData?.temp?.[currentTemperatureUnit] || 999;

  // console.log(temp);
  // const weatherType = useMemo(() => {
  //   if (temp >= 86) {
  //     return "hot";
  //   } else if (temp >= 66 && temp <= 85) {
  //     return "warm";
  //   } else if (temp <= 65) {
  //     return "cold";
  //   }
  // }, [weatherData]);

  return (
    <main>
      <WeatherCard weatherData={temp} />
      <section className="cards">
        <p className="cards__text">
          Today is {temp} &deg; {[currentTemperatureUnit]} / You may want to
          wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
