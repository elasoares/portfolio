/* eslint-disable react/prop-types */
import { useState } from "react";
import { FotoPerfil } from "../FotoPerfilGet/FotoPerfil";
import styles from "./AcessarPerfil.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

export function AcessarPerfil({className}) {
  const [perfil, setPerfil] = useState(false);
  const navigate = useNavigate();

  function navegarPeloPerfil() {
    setPerfil(!perfil);
  }

  function handleEntrarPerfil(destino) {
    setPerfil(false);
    navigate(destino);
  }

  function handleSair() {
    auth.signOut().then(() => {
      setPerfil(false);
      navigate("/entrar");
    });
  }

  return (
    <div className={styles["container-perfil"]}>
      <button className={`${styles["botao-perfil"]} ${className}`} onClick={navegarPeloPerfil}>
        <FotoPerfil className={styles["foto-perfil"]}/>
      </button>
    
      {perfil && (
        <div className={styles["container-acessar"]}>
        <div className={styles["menu-perfil"]}>
          <Link
            className={styles["item-menu-perfil"]}
            to="/perfil"
            onClick={() => handleEntrarPerfil("/perfil")}
          >
            Perfil
          </Link>
          <button className={styles["item-menu-sair"]} onClick={handleSair}>
            Sair
          </button>
        </div>
        </div>
      )}
      </div>
    
  );
}
