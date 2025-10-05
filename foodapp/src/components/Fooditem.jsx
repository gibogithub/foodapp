import PropTypes from "prop-types";
import styles from "./fooditem.module.css";

export default function Fooditem({ food, setFoodId }) {
  return (
    <div className={styles.itemContainer}>
      <img
        className={styles.itemImage}
        src={food.image}
        alt={food.title || "Food image"}
      />
      <div className={styles.itemContent}>
        <p className={styles.itemName}>{food.title}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => setFoodId(food.id)}
          className={styles.itemButton}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}

Fooditem.propTypes = {
  food: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
  }).isRequired,
  setFoodId: PropTypes.func.isRequired,
};
