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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
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
  const [isLoading, setIsLoading] = React.useState(false);

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

  const handleEditProfileModal = () => {
    setActiveModal("edit");
  };

  // Item Handlers
  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(() => {
        closeActiveModal();
      })
      .catch((res) => {
        console.log(`Error: ${res}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteCard = (card) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return api.deleteClothingItem(card._id, token).then(() => {
        setClothingItems((cards) => cards.filter((x) => x._id !== card._id));
      });
    };
    handleSubmit(makeRequest);
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return api
        .addNewClothingItems({ name, imageUrl, weather }, token)
        .then(({ data }) => {
          setClothingItems([data, ...clothingItems]);
        });
    };
    handleSubmit(makeRequest);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };
  // Authorization Handlers
  const handleSignup = ({ email, password, name, avatar }) => {
    const makeRequest = () => {
      return auth.signUp({ email, password, name, avatar }).then(() => {
        handleSignUpModal({ email, password, name, avatar });
        setCurrentUser({ email, password, name, avatar });
        setLoggedIn(true);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleLogin = ({ email, password }) => {
    const makeRequest = () => {
      return auth.signIn({ email, password }).then((res) => {
        handleLoginModal({ email, password });
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return auth.editProfile({ name, avatar }, token).then((res) => {
        handleEditProfileModal({ name, avatar });
        setCurrentUser(res);
      });
    };
    handleSubmit(makeRequest);
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

  // useEffect's
  useEffect(() => {
    if (!activeModal) return;

    const handleEscapeClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [activeModal]);

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
                    onCardLike={handleCardLike}
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
                      handleEditProfileModal={handleEditProfileModal}
                      loggedIn={loggedIn}
                      onCardLike={handleCardLike}
                      setLoggedIn={setLoggedIn}
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
            buttonText={isLoading ? "Saving..." : "Save Garment"}
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
            buttonText={isLoading ? "Saving..." : "Sign Up"}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            handleSignUpModal={handleSignUpModal}
            handleLogin={handleLogin}
            buttonText={isLoading ? "Saving..." : "Log In"}
          />

          <EditProfileModal
            isOpen={activeModal === "edit"}
            onClose={closeActiveModal}
            handleEditProfile={handleEditProfile}
            buttonText={isLoading ? "Saving..." : "Save Changes"}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
