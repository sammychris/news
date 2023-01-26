import { BeatLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <BeatLoader color="#33509b" loading={true} />
    </div>
  );
};

export default Loader;
