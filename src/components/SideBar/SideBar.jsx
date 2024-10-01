import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

function SideBar({ handleEditProfile, setLoggedIn }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar}
          alt="Default avatar"
        />
        <p className={`sidebar__username ${theme}`}>{currentUser?.name}</p>
      </div>
      <div className="sidebar__profile-data">
        <button
          className={`sidebar__user-button ${theme}`}
          type="text"
          onClick={handleEditProfile}
        >
          Change profile data
        </button>
        <button
          className={`sidebar__user-button ${theme}`}
          type="text"
          onClick={() => {
            navigate("/");
            setLoggedIn(false);
            localStorage.removeItem("jwt");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
