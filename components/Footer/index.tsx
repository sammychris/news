import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerContent}>
        <div>
          <h2>POPULI PRESS</h2>
          <ul>
            <li>Twitter</li>
            <li>Tiktok</li>
            <li>Instagram</li>
            <li>Youtube</li>
          </ul>
        </div>
        <div>
          <h3>Costumer Service</h3>
          <ul>
            <li>Contact Us</li>
            <li>Live Chat</li>
          </ul>
        </div>
        <div>
          <h3>Terms of Use</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>Ethical Journalism Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>
      <div className={styles.copy}>
        © 2023 POPULI PRESS, LLC. ALL RIGHTS RESERVED
      </div>
    </div>
  );
};

export default Footer;
