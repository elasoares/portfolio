import styles from "./HomePage.module.css";
import { GoDownload } from "react-icons/go";
import { Link } from "react-router-dom";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";
import { FotoPerfil } from "../../components/FotoPerfilGet/FotoPerfil";


const navigater = [
  {link: "/contate-me"}
];



export function HomePage() {


  return (
    <div className={`${styles["container-main"]} fadeIn`}>
      <LoadingOverlay/>
        <div className={styles["container-info"]}>
          <div className={styles["primeiro-background-foto"]}>
            <div className={styles["segundo-background-foto"]}>
              <FotoPerfil className={styles.foto} />
            </div>
          </div>

          <div className={styles["container-descricao-home"]}>
            <h3 className={styles.titulo}>
              <span className={`${styles.titulo} ${styles.typingAnimation}`}>
                  {" "}
                  Olá, eu me chamo Elaine!
                </span> 
            </h3>
            <h1 className={styles.subtitulo}>DESENVOLVEDORA <span>FRONT-END</span></h1>
          </div>

          <div className={styles["container-botao"]}>
            <Link className={`${styles["botao-contato"]}`} to={navigater[0].link}> CONTATE-ME</Link>
            <a href="/curriculo.pdf" target="_blank" rel="noopener noreferrer" className={styles.botao}>
            CURRÍCULO 
                <GoDownload />
        
            </a>
          </div>
        </div>
    </div>
  );
}
