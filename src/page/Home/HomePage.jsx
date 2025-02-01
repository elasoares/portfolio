import styles from "./HomePage.module.css";
import { GoDownload } from "react-icons/go";
import { Link } from "react-router-dom";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";
import { FotoPerfil } from "../../components/FotoPerfilGet/FotoPerfil";
import { SlSocialLinkedin } from "react-icons/sl";
import { TbBrandGithub } from "react-icons/tb";
import { MdOutlineMailOutline } from "react-icons/md";


const navigator = [
  {link: "/contate-me"}
];



export function HomePage() {


  return (
    <div className={styles["container-main"]}>
      <LoadingOverlay/>
        <div className={styles["container"]}>
          <div className={styles["primeiro-background-foto"]}>
            <div>
              <a href="https://www.linkedin.com/in/elaine-soares-ti/" className={styles["socialMedia-icon"]}>
              <SlSocialLinkedin /></a>
            </div>
            <div>
              <a href="https://github.com/elasoares" className={styles["socialMedia-icon"]}>
              <TbBrandGithub /></a>
            </div>
            <div>
            <a href="mailto:elaine.almeida@al.infnet.edu.br" className={styles["socialMedia-icon"]}>
            <MdOutlineMailOutline /></a>
            </div>
            <div className={styles["segundo-background-foto"]}>
              <FotoPerfil className={styles.foto} />
            </div>
          </div>


          <div className={styles["container-info"]}>
            <h3 className={styles.titulo}>
              <span className={`${styles.titulo} ${styles.typingAnimation}`}>
                  {" "}
                  Olá, eu sou Elaine Soares
                </span> 
            </h3>
            <h1 className={styles.subtitulo}>Desenvolvedora <span>Front-end</span></h1>
          </div>
          <div className={styles["container-descricao-home"]}>
          <p className={styles["descricao-home"]}>
          Desenvolvedora Front-End. Possuo experiência no desenvolvimento de interfaces responsivas e acessíveis utilizando React, JavaScript, CSS e metodologias ágeis (Scrum, Kanban). Além disso, tenho conhecimento em Node.js e Firebase CRUD, 
          permitindo integração entre front-end e back-end.
            </p>
          </div>
          <div>
            <ul>
              <li>Html</li>
              <li>Css</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Git</li>
              <li>Github</li>
              <li>Styled Comonent</li>
              <li>Bootstrap</li>
              <li>Firebase</li>
              <li>Node.js</li>
              <li>Scrum</li>
            </ul>
          </div>                

          <div className={styles["container-botao"]}>
            <Link className={`${styles["botao-contato"]}`} to={navigator[0].link}> CONTATE-ME</Link>
            <a href="/curriculo.pdf" target="_blank" rel="noopener noreferrer" className={styles.botao}>
            CURRÍCULO 
                <GoDownload />
        
            </a>
          </div>
        </div>
    </div>
  );
}
