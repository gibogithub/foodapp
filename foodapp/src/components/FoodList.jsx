import PropTypes from "prop-types";
import Fooditem from "./Fooditem";
import styles from "./foodlist.module.css"; // Optional: create this CSS module for styling

export default function FoodList({ foodData, setFoodId }) {
  if (!foodData || foodData.length === 0) {
    return <div>No food items found.</div>;
  }

  return (
    <div className={styles.listContainer}>
      {foodData.map((food) => (
        <Fooditem setFoodId={setFoodId} key={food.id} food={food} />
      ))}
    </div>
  );
}

FoodList.propTypes = {
  foodData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string, // <-- use title, not name
      description: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  setFoodId: PropTypes.func.isRequired,
};
