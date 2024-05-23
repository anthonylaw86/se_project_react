import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

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

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
<>

      <div className="header__button-container">
        <ToggleSwitch />
{isLoggedIn ? (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      </div>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">{currentUser?.name}</p>
          <img
            src={currentUser?.avatar}
            alt="Terrance"
            className="header__avatar"
          />
        </div>
      </Link>
) : (
      </>
      <>
        <div>
          <button
            onClick={handleSignUpModal}
            type="text"
            className="header__button"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginModal}
            type="text"
            className="header__button"
          >
            Log In
          </button>
        </div>
      </>
      )}
    </header>
  );
}

export default Header;
