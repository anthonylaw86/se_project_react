import { checkResponse } from "./api";

export const getWeather = (location, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
};

export const getUserLocationAndWeather = (APIkey) => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          getWeather({ latitude, longitude }, APIkey)
            .then((weatherData) => resolve(weatherData))
            .catch((error) => reject(error));
        },
        (err) => {
          reject(`Geolocation error: ${err.message}`);
        }
      );
    } else {
      reject("Geolocation is not supported on this browser.");
    }
  });
};

export const filterWeatherData = (data) => {
  const fahrenheitTemp = Math.round(data.main.temp);
  const celsiusTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);

  const result = {
    city: data.name,
    temp: { F: fahrenheitTemp, C: celsiusTemp },
    type: getWeatherType(fahrenheitTemp),
    condition: data.weather[0].main.toLowerCase(),
    isDay: isDay(data.sys, Date.now()),
    weather: {
      temp: {
        F: `${fahrenheitTemp}°F`,
        C: `${celsiusTemp}°C`,
      },
    },
  };
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
