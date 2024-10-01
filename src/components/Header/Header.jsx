import "./Header.css";
import logo from "../../assets/logo.svg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import ThemeToggleSwitch from "../ThemeToggleSwitch/ThemeToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function Header({
  handleAddClick,
  weatherData,
  handleSignUpModal,
  handleLoginModal,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city || "Unknown Location"}
      </p>

      <div className="header-theme-toggle_container">
        <ThemeToggleSwitch onToggle={toggleTheme} isDay={theme === "day"} />
      </div>

      <div className={`header__button-container ${theme}`}>
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className={`header__add-clothes-btn ${theme}`}
            >
              + Add clothes
            </button>

            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className={`header__username ${theme}`}>
                  {currentUser?.name}
                </p>
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="header__avatar"
                />
              </div>
            </Link>
          </>
        ) : (
          <>
            <div>
              <button
                onClick={handleSignUpModal}
                type="text"
                className={`header__button ${theme}`}
              >
                Sign Up
              </button>
              <button
                onClick={handleLoginModal}
                type="text"
                className={`header__button ${theme}`}
              >
                Log In
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
