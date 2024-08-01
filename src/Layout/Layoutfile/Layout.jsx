/* eslint-disable react/prop-types */
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import styles from "./Layout.module.css";

export function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main>
      {children}
      </main>
      <Footer />
    </div>
  );
}
