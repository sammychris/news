import React from "react";
import styles from "./Header.module.css";
import { IoLocationOutline, IoNotificationsOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
// import UserIcon from "../Assets/Images/user.png";
// import Logo from "../Assets/Images/logo.png";

const Top = () => {
  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // handle search form submission
  };

  return (
    <div className={styles.headerContent}>
      <div className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchContainer}>
          <input type="text" placeholder="Search for people" />
          <FaSearch size={16} />
        </form>
      </div>

      <div className={styles.logoContainer}>
        <img src={"Logo"} alt="logo" />
      </div>

      <div className={styles.iconsContainer}>
        <a href="#">
          <IoLocationOutline color="#fff" size={28} />
        </a>
      </div>
    </div>
  );
};

export default Top;
