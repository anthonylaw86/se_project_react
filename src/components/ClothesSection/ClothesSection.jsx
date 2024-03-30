import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../Main/ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection(handleCardClick) {
  return (
    <div className="clothes-section">
      <div className="clothes-section-header">
        <p className="clothes-section-text">Your Items</p>
        <button className="clothes-section-button">+ Add new</button>
      </div>
      <ul className="clothes-section__cards_list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
