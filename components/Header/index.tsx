import React from "react";
import styles from "./Header.module.css";
import Top from "./Top";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import { FaBars, FaTimes } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header: React.FC<Props> = ({ isOpen, toggleMenu }) => {
  return (
    <header>
      <div className={styles.headerBackground}>
        <div
          className={styles.mobileToggle}
          onClick={() => toggleMenu(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <Top />
        <Menu />
      </div>
      <div className={styles.mobile} style={{ height: isOpen ? "100vh" : 0 }}>
        <MobileMenu openState={isOpen} toggleMenu={toggleMenu} />
      </div>
      {isOpen && <div className={styles.overlay}></div>}
    </header>
  );
};

export default Header;
