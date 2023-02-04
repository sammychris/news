import React from "react";
import styles from "./Header.module.css";
import Top from "./Top";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { IoLocationOutline, IoNotificationsOutline } from "react-icons/io5";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header: React.FC<Props> = ({ isOpen, toggleMenu }) => {
  return (
    <header>
      <div className={styles.container}>
        <div
          className={styles.mobileToggle}
          onClick={() => toggleMenu(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <Image width={200} height={38} src="/images/logo.png" alt="logo" />
          </div>
          <div className={styles.navContainer}>
            <Menu />
          </div>
          <div className={styles.searchSection}>
            <form className={styles.searchContainer}>
              <input type="text" placeholder="Search for people" />
              <FaSearch size={16} />
            </form>
            <div>
              <a href="" className={styles.shopLink}>
                SHOP
              </a>
            </div>
          </div>
        </div>
        {/* <Menu /> */}
      </div>
      <div className={styles.mobile} style={{ height: isOpen ? "100vh" : 0 }}>
        <MobileMenu openState={isOpen} toggleMenu={toggleMenu} />
      </div>
      {isOpen && <img className={styles.overlayImg} src="/images/nav-bg.png" />}
      {isOpen && <div className={styles.overlay}></div>}
    </header>
  );
};

export default Header;
