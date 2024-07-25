import { useState } from "react";
import { FotoPerfil } from "../FotoPerfilGet/FotoPerfil";
import styles from "./AcessarPerfil.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

export function AcessarPerfil() {
  const [perfil, setPerfil] = useState(false);
  const navigate = useNavigate();

  function navegarPeloPerfil() {
    console.log("Foto do perfil clicada");
    setPerfil(!perfil);
  }

  function handleLinkClick(destination) {
    setPerfil(false);
    navigate(destination);
  }

  function handleSignOut() {
    auth.signOut().then(() => {
      setPerfil(false);
      navigate("/entrar");
    });
  }

  return (
    <div className={styles["container-perfil"]}>
      <button className={styles["botao-perfil"]} onClick={navegarPeloPerfil}>
        <FotoPerfil className={styles["foto-perfil"]} />
      </button>
      
      {perfil && (
        <div className={styles["menu-perfil"]}>
          <Link
            className={styles["item-menu-perfil"]}
            to="/perfil"
            onClick={() => handleLinkClick("/perfil")}
          >
            Perfil
          </Link>
          <button className={styles["item-menu-sair"]} onClick={handleSignOut}>
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
