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
/* const socialMedia = [
{link: "https://www.linkedin.com/in/elaine-soares-ti/", icon: <SlSocialLinkedin /> },
{link: "https://github.com/elasoares", icon: <TbBrandGithub /> },
{link: "mailto:elaine.almeida@al.infnet.edu.br", icon:  <MdOutlineMailOutline /> }
] */


export function HomePage() {


  return (
    <div className={styles["container-main"]}>
      <LoadingOverlay/>
        <div className={styles["container"]}>
          <div className={styles.section1}>
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
            <h1 className={styles.titulo}>
              Olá, eu sou 
                <span className={` ${styles.typingAnimation}`}>
                    {" "}
                    Elaine Soares
                  </span> 
              </h1>
            <div className={styles["container-botao"]}>
              <Link className={`${styles["botao-contato"]}`} to={navigator[0].link}> CONTATE-ME</Link>
              <a href="/curriculo.pdf" target="_blank" rel="noopener noreferrer" className={styles.botao}>
              CURRÍCULO 
                  <GoDownload />
              </a>
            </div>
          </div>
          <div className={styles.section2}>
          <div className={styles["container-info"]}>
              <div className={styles.subtitulo}>
                <h3>Sou desenvolvedora <span>Front-end</span></h3>
                
                <p className={styles["descricao-sub"]}>
                  Possuo experiência no desenvolvimento de interfaces responsivas e 
                  acessíveis. Além disso, 
                  tenho conhecimento em:
                </p>
              </div>
            </div>
            <div className={styles["container-habilidades"]}>
              <ul>
                <li>React</li>
                <li>Styled Comonent</li>
                <li>Tailwind CSS</li>
                <li>Bootstrap</li>
                <li>Firebase</li>
                <li>Node.js</li>
              </ul>
            </div>                
          </div>
          
        </div>
    </div>
  );
}
