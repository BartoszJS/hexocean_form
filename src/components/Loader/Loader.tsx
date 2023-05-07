import imageSvg from "../../assets/Eclipse200px.svg";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={imageSvg} alt='loader' className={styles.loader__img} />
    </div>
  );
};

export default Loader;
