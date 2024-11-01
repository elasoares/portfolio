/* eslint-disable react/prop-types */
import { Menu } from "../Menu/Menu";
import { Footer } from "../Footer/Footer";
import styles from "./Layout.module.css";
import { Header } from "../Header/Header";

export function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header className={styles.header}/>
      <Menu className={styles.menu}/>
      <main className={styles.main}> {children} </main> 
      <Footer className={styles.footer} /> 
    </div>
  );
}
