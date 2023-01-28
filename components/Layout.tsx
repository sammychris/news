import React, { FunctionComponent, ReactNode } from "react";
import { useState } from "react";

import Header from "../components/Header";

type Props = {
  state: boolean;
  children: ReactNode;
};

export const Layout: FunctionComponent<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <main>
        <div style={{ display: isOpen ? "none" : "" }}>{props.children}</div>
        {/* <footer  className={`${styles.row} ${styles.footer}`}>`
                Bigly 
            </footer> */}
      </main>
    </div>
  );
};

export default Layout;
