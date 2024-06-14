import ItemCard from "../Main/ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  cards,
  handleAddClick,
  loggedIn,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userCards = cards.filter((item) => item.owner === currentUser._id);

  return (
    <div className="clothes-section">
      <div className="clothes-section-header">
        <p className="clothes-section-text">Your Items</p>
        <button className="clothes-section-button" onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userCards.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              loggedIn={loggedIn}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
