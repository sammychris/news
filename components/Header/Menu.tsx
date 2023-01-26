import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.css";

const Menu = () => {
  const router = useRouter();
  return (
    <div className={styles.navContainer}>
      <nav className={`${styles.navContent}`}>
        <Link
          href="/"
          className={router.pathname === "/" ? styles.tabActive : styles.tab}
        >
          Home
        </Link>
        <Link
          href="/politics"
          className={
            router.pathname === "/politics" ? styles.tabActive : styles.tab
          }
        >
          Politics
        </Link>
        <Link
          href="/culture"
          className={
            router.pathname === "/culture" ? styles.tabActive : styles.tab
          }
        >
          Culture
        </Link>
        <Link
          href="/health"
          className={
            router.pathname === "/health" ? styles.tabActive : styles.tab
          }
        >
          Health
        </Link>
        <Link
          href="/trending"
          className={
            router.pathname === "/trending" ? styles.tabActive : styles.tab
          }
        >
          Trending
        </Link>
      </nav>
    </div>
  );
};

export default Menu;
