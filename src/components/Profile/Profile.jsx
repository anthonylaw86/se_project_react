import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  onCardClick,
  cards,
  handleAddClick,
  handleEditProfileModal,
  setLoggedIn,
  loggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfile={handleEditProfileModal}
          setLoggedIn={setLoggedIn}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          cards={cards}
          handleAddClick={handleAddClick}
          loggedIn={loggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;
