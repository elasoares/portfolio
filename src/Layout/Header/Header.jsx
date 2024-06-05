/* Importe as bibliotecas necessárias */
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PiTextAlignLeftLight } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig.js";

export function Header() {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(()=>{
const userLogado = onAuthStateChanged(auth, (users)=>{ setUser(users)})
return ()=> userLogado();
  },[])

  function sideNavFunctionClick() {
    setNav(!nav);
  }



  const navigationLinks = [
 
    { name: "Home", link: "/" },
    { name: "Feed", link: "/feed" },
    { name: "Sobre", link: "/sobre" },
   /* { name: "Projetos", link: "/projetos" },*/
    { name: "Contato", link: "/contate-me" },
    { link: "/entrar" }, 
  ];
  const socialLinks = [
      {
      icon: <FaLinkedinIn />,
      link: "https://www.linkedin.com/in/ela-284860153",
    },
    { icon: <FaGithub />, link: "https://github.com/elasoares" },
    { icon: <FaInstagram />, link: "#" },
 
  ];

  return (
    <>
      <header className={styles["container-header"]}>
        <div>
          <Link className={styles.logo} to={navigationLinks[0].link}>
            Elaine Soares
          </Link>
        </div>

        <div
          className={`${styles["container-item"]} ${
            nav ? styles.mostrarNav : ""
          }`}
        >
          <div
            className={`${styles["container-item"]} ${
              nav ? styles.mostrarNav : ""
            }`}
          >
            {navigationLinks.map((navigation, index) => (
              <div key={index} className={styles["container-navigation"]}>
                <Link className={styles["item-menu"]} to={navigation.link}>
                  {navigation.name}
                </Link>
              </div>
            ))}


           {!user ? (
            <div className={styles["container-perfil"]} >
            <Link  to={"/entrar"}><IoIosLogIn className={styles["item-icon-perfil"]} /></Link>
            </div> 
           ):(
         <div className={styles["container-perfil"]} >
          <Link className={styles["botao-contato"]} to="/perfil">
          <img className={styles.perfil} src="\src\components\Img\foto.png"/>
          </Link>
         
            <Link  to="/entrar" onClick={()=>auth.signOut()}><IoIosLogOut className={styles["item-icon-perfil"]}/></Link>
         </div> 
            )}
          </div>

          <div className={styles["container-icon"]}>
            {socialLinks.map((navigation, index) => (
              <div key={index} className={styles["item-icon"]}>
                <a
                  className={styles["icon-item-link"]}
                  href={navigation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {navigation.icon}
                </a>
              </div>
            ))}
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
