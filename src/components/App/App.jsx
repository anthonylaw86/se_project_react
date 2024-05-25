import "./App.css";
import React from "react";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

// Hooks and Routes
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Utils
import api from "../../utils/api";
import { coordinates, APIkey } from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import * as auth from "../../utils/auth";

// Contexts
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // Modal Handlers
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleSignUpModal = () => {
    setActiveModal("signup");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  // Item Handlers
  const handleDeleteCard = (card) => {
    const token = localStorage.getItem("jwt");
    api
      .deleteClothingItem(card._id, token)
      .then(() => {
        setClothingItems((cards) => cards.filter((x) => x._id !== card._id));
        closeActiveModal();
      })
      .catch((res) => {
        console.log(`Error: ${res}`);
      });
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    api
      .addNewClothingItems({ name, imageUrl, weather })
      .then((newClothingItem) => {
        setClothingItems([newClothingItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((res) => {
        console.log(`Error: ${res}`);
      });
  };

  // Authorization Handlers
  const handleSignup = ({ email, password, name, avatar }) => {
    auth
      .signUp({ email, password, name, avatar })
      .then(() => {
        handleSignUpModal({ email, password, name, avatar });
        closeActiveModal();
        setCurrentUser({ email, password, name, avatar });
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = ({ email, password }) => {
    auth
      .signIn({ email, password })
      .then((res) => {
        handleLoginModal({ email, password });
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  // useEffect API's
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((res) => {
        console.log(`Error: ${res}`);
      });
  }, []);

  useEffect(() => {
    api
      .getClothingItems()
      .then((items) => {
        setClothingItems(items);
        console.log(clothingItems);
      })
      .catch((res) => {
        console.log(`Error: ${res}`);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleSignUpModal={handleSignUpModal}
              handleLoginModal={handleLoginModal}
              isLoggedIn={loggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    cards={clothingItems}
                    onCardDelete={handleDeleteCard}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      cards={clothingItems}
                      onCardDelete={handleDeleteCard}
                      handleAddClick={handleAddClick}
                      loggedIn={loggedIn}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onCardDelete={handleDeleteCard}
          />

          <RegisterModal
            isOpen={activeModal === "signup"}
            onClose={closeActiveModal}
            handleSignUp={handleSignup}
            handleLoginModal={handleLoginModal}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            handleSignUpModal={handleSignUpModal}
            handleLogin={handleLogin}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
