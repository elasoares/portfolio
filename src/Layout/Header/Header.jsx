/* Importe as bibliotecas necessárias */
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
/* import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa"; */
import { Link } from "react-router-dom";
import { PiTextAlignLeftLight } from "react-icons/pi";
/* import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io"; */

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig.js";
import { AcessarPerfil } from "../../components/AcessarPerfil/AcessarPerfil.jsx";


export function Header() {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const userLogado = onAuthStateChanged(auth, (users) => {
      setUser(users);
    });
    return () => userLogado();
  }, []);

  function sideNavFunctionClick() {
    setNav(!nav);
  }

 

  const navigationLinks = [
    { name: "Home", link: "/home" },
    { name: "Feed", link: "/feed" },
    { name: "Sobre", link: "/sobre" },
    /* { name: "Projetos", link: "/projetos" }, */
    { name: "Contato", link: "/contate-me" },
    { link: "/entrar" },
  ];

  return (
    <>
      <header className={styles["container-header"]}>

          <Link className={styles.logo} to={navigationLinks[0].link}>
            Ela
          </Link>
        

        <div
          className={`${styles["container-menu-navegacao"]} ${
            nav ? styles.mostrarNav : ""
          }`}
        >
        <div className={styles["container-item-navegador"]}>
          {navigationLinks.map((navigation, index) => (
            <div key={index} className={styles["container-navigation"]}>
              <Link className={styles["item-menu"]} to={navigation.link}>
                {navigation.name}
              </Link>
            </div>
          ))}
       </div>
        <div className={styles.perfil}>
          {!user ? (
            <div>
              <Link className={styles.entrar} to={"/entrar"}>
                Entrar
              </Link>
            </div>
          ) : (
           <AcessarPerfil/>
          )}
          </div>
        </div>

        <PiTextAlignLeftLight
          className={`${nav ? styles["humburger-animation"] : ""} ${
            styles.humburger
          }`}
          onClick={sideNavFunctionClick}
        />
      </header>
    </>
  );
}
