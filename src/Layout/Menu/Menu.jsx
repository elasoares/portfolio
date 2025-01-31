/* eslint-disable react/prop-types */
import styles from "./Menu.module.css";
import { Link, useLocation } from "react-router-dom"; 
import { PiTextAlignLeftLight } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";


const iconLinks = [
  { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/elaine-soares-ti" },
  { icon: <FaGithub />, link: "https://github.com/elasoares" },
  { icon: <FaInstagram />, link: "#" }
];


export function Menu({className}) {
  const [nav, setNav] = useState(false);
  const location = useLocation();

  function sideNavFunctionClick() {
    setNav(!nav);
  }

  function clicarEFecharOmenu(){
    setNav(false);
  }
 
 

  const navigationLinks = [
    { name: "Home", link: "/home" },
    { name: "Projetos", link: "/projetos" },
    { name: "Certificado", link: "/certificado" },
    { name: "Contato", link: "/contate-me" }
  ];

  return (
    <>
      <header className={`${styles["container-menu"]} ${className}`}>
        <div
          className={`${styles["container-menu-navegacao"]} ${
            nav ? styles.mostrarNav : ""}`}
        >
          <div className={styles["container-item-navegador"]}>
            {navigationLinks.map((navigation, index) => (
                <div key={index} className={styles["container-navigation"]}>
                  <Link
                    to={navigation.link}
                    className={`${styles["item-menu"]} ${
                      location.pathname === navigation.link ? styles.active : ""
                    }`}
                    onClick={clicarEFecharOmenu}
                  >
                    {navigation.name}
                  </Link>
                </div>
              ))}
          </div>
            <ul className={styles.icon}>
              {iconLinks.map((icons, index) => (
                <li key={index}>
                  <a className={styles["item-icon"]} href={icons.link}>
                    {icons.icon}
                  </a>
                </li>
              ))}
            </ul>
        </div>

        {!nav ? ( 
          <PiTextAlignLeftLight
            className={`${nav ? styles["humburger-animation"] : ""} ${
              styles.humburger
            }`}
            onClick={sideNavFunctionClick}
          />
        ):(
          <IoMdClose
            className={`${nav ? styles["humburger-animation"] : ""} ${
              styles.humburger
            }`}
            onClick={sideNavFunctionClick}
          />
        )}
      </header>
    </>
  );
}
