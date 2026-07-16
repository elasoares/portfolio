/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { AcessarPerfil } from "../../components/AcessarPerfil/AcessarPerfil.jsx";
import { useEffect, useState } from "react";
import { supabase } from "../../Supabaseconfig.js";
import { GiHamburgerMenu } from "react-icons/gi";

const navigationLinks = [
  { name: "Home", link: "/home" },
  { name: "Projetos", link: "/projetos" },
  { name: "Certificado", link: "/certificado" },
  { name: "Contato", link: "/contate-me" }
];

export function Header({ className }) {
  const [user, setUser] = useState(null);
  const [nav, setNav] = useState(false);
  const [menuEntrar, setMenuEntrar] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  function clicarEFecharOmenu() { setMenuEntrar(!menuEntrar); }
  function toggle() { setNav(!nav); }

  const toggleHamburger = nav ? styles.desativado : styles.ativado;
  const toggleMenu = nav ? styles.ativado : styles.desativado;

  return (
    <div className={`${className} ${styles.container}`}>
      <Link className={styles.logo} to="/">Ela<span>.</span></Link>
      <div className={styles["container-peril"]}>
        <GiHamburgerMenu onClick={toggle} className={`${toggleHamburger} ${styles.hamburger}`} />
        <span onClick={toggle} className={`${toggleMenu} ${styles.fechar}`}>X</span>
        <div className={`${toggleMenu} ${styles.perfil}`}>
          {navigationLinks.map((navigation, index) => (
            <div key={index} className={styles["container-navigation"]}>
              <Link to={navigation.link}
                className={`${styles["item-menu"]} ${location.pathname === navigation.link ? styles.active : ""}`}>
                {navigation.name}
              </Link>
            </div>
          ))}
          {!user ? (
            <div className={styles["botao-entrar"]}>
              <Link className={styles.entrar} to={"/entrar"} onClick={clicarEFecharOmenu}>Entrar</Link>
            </div>
          ) : (
            <AcessarPerfil className={styles.acessarPerfil} />
          )}
        </div>
      </div>
    </div>
  );
}