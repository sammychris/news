import React from "react";
import styles from "./ViewMoreButton.module.css";

const ViewMoreButton = ({ title }: { title: string }) => {
  return <button className={styles.viewMoreNews}>{title}</button>;
};

export default ViewMoreButton;
