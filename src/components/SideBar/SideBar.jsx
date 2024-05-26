import avatar from "../../assets/avatar.png";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SideBar({ handleEditProfile, setLoggedIn }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar}
          alt="Default avatar"
        />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__profile-data">
        <button
          className="sidebar__user-button"
          type="text"
          onClick={handleEditProfile}
        >
          Change profile data
        </button>
        <button
          className="sidebar__user-button"
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
