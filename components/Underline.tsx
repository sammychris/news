import { FunctionComponent } from "react";
import styles from "../styles/Main.module.css";
interface Props {
  width: number;
}

export const Underline: FunctionComponent<Props> = ({ width }) => {
  return (
    <div className={`${styles.row}`}>
      <div
        className={`${styles.underline}`}
        style={{
          width: "" + width + "%",
        }}
      ></div>
    </div>
  );
};

export default Underline;
