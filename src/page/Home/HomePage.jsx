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
const socialMedia = [
{link: "https://www.linkedin.com/in/elaine-soares-ti/", icon: <SlSocialLinkedin /> },
{link: "https://github.com/elasoares", icon: <TbBrandGithub /> },
{link: "mailto:elaine.almeida@al.infnet.edu.br", icon:  <MdOutlineMailOutline /> }
]


export function HomePage() {


  return (
    <div className={styles["container-main"]}>
      <LoadingOverlay/>
        <div className={styles["container"]}>
          
          <div className={styles.section1}>
            
            <div className={styles["container-icon-foto"]}>
              <ul className={styles["container-icon"]}>
                {socialMedia.map((icon, index)=>(
                  <li key={"icon_"+index}><a href={icon.link}>{icon.icon}</a></li>
                ))}
              </ul>
              <div className={styles["background-foto"]}>
                <FotoPerfil className={styles.foto} />
              </div>
            </div>
            
            <div className={styles["container-titulo"]}>
              <h1 className={styles.titulo}>
                Olá, eu sou 
                  <span className={` ${styles.typingAnimation}`}>
                      {" "}
                      Elaine Soares
                    </span> 
                </h1>
            </div>
          </div>
          <div className={styles.section2}>
          <div className={styles["container-info"]}>
              <div className={styles.subtitulo}>
                <p className={styles["descricao-sub"]}>
                  Sou desenvolvedora <span>Front-end. </span>
                  Possuo experiência no desenvolvimento de interfaces responsivas e 
                  acessíveis. Além disso, 
                  tenho conhecimento em:
                </p>
              </div>
            </div>
            <div className={styles["container-habilidades"]}>
              <ul className={styles["ul-lista"]}>
                <li className={styles["itens-lista"]}>JavaScript</li>
                <li className={styles["itens-lista"]}>React</li>
                <li className={styles["itens-lista"]}>Firebase</li>
                <li className={styles["itens-lista"]}>Node.js</li>
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
    </div>
  );
}
