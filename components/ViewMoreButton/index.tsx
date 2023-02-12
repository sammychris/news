import React from "react";
import styles from "./ViewMoreButton.module.css";
import Link from "next/link";

const ViewMoreButton = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link href={link} className={styles.viewMoreNews}>
      {title}
    </Link>
  );
};

export default ViewMoreButton;
