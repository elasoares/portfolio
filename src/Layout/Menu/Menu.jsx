/* eslint-disable react/prop-types */
import styles from "./Menu.module.css";
import { Link, useLocation } from "react-router-dom"; 


export function Menu({className}) {
  const location = useLocation();


  const navigationLinks = [
    { name: "Home", link: "/home" },
    { name: "Projetos", link: "/projetos" },
    { name: "Certificado", link: "/certificado" },
    { name: "Contato", link: "/contate-me" }
  ];

  return (
    <>
      <header className={`${styles["container-menu"]} ${className}`}>
        <div className={`${styles["container-menu-navegacao"]}`} >
            {navigationLinks.map((navigation, index) => (
              <div key={index} className={styles["container-navigation"]}>
                <Link
                  to={navigation.link}
                  className={`${styles["item-menu"]} 
                  ${location.pathname === navigation.link ? styles.active : ""  }`}>
                    {navigation.name}
                </Link>
              </div>
            ))}
        </div>
      </header>
    </>
  );
}
