import styles from "./AllDishes.module.scss";
import { RootState, Dish } from "../../redux/foodSlice";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const AllDishes = () => {
  const foodList = useSelector((state: RootState) => state.food.list);

  return (
    <div className={styles.container}>
      <div className={styles.dish}>
        <h2>DISH LIST</h2>
      </div>
      {foodList.length === 0 && (
        <div className={styles.dish}>
          <div>No added dishes </div>
        </div>
      )}

      {foodList.map((dish: Dish, index: number) => (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={styles.dish}
          key={index}
        >
          <div className={styles.dish__row}>
            <div>ID: </div>
            <div> {index}</div>
          </div>
          <div className={styles.dish__row}>
            <div>Name: </div>
            <div> {dish.name}</div>
          </div>
          <div className={styles.dish__row}>
            <div>Preparation time: </div>
            <div> {dish.preparation_time}</div>
          </div>
          <div className={styles.dish__row}>
            <div>Type: </div>
            <div> {dish.type}</div>
          </div>

          {dish.type === "pizza" && (
            <div>
              <div className={styles.dish__row}>
                <div>Number of slices: </div>
                <div> {dish.no_of_slices}</div>
              </div>
              <div className={styles.dish__row}>
                <div>Diameter: </div>
                <div> {dish.diameter}</div>
              </div>
            </div>
          )}
          {dish.type === "soup" && (
            <div className={styles.dish__row}>
              <div>Spiciness scale: </div>
              <div> {dish.spiciness_scale}</div>
            </div>
          )}
          {dish.type === "sandwich" && (
            <div className={styles.dish__row}>
              <div>Slices od bread: </div>
              <div> {dish.slices_of_bread}</div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AllDishes;
