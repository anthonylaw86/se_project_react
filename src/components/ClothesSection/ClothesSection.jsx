import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../Main/ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ onCardClick, cards, handleAddClick, loggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section-header">
        <p className="clothes-section-text">Your Items</p>
        <button className="clothes-section-button" onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {cards.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              loggedIn={loggedIn}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
