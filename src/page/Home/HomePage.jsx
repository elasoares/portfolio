import styles from "./HomePage.module.css";
import { GoDownload } from "react-icons/go";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { Card } from "../../components/Card/Card";
import curriculo from "../../components/Img/curriculo.pdf";
import { Link } from "react-router-dom";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";


const iconLinks = [
  { icon: <FaLinkedinIn />, link: "www.linkedin.com/in/ela-284860153" },
  { icon: <FaGithub />, link: "https://github.com/elasoares" },
  { icon: <FaInstagram />, link: "#" },
  {link: "/contate-me"}
];



export function HomePage() {


  return (
    <div className={`${styles["container-main"]} fadeIn`}>
    <LoadingOverlay/>
      <Card className={styles["container-icon-lista"]}>
        <div className={styles.icon}>
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

        <div className={styles["container-info"]}>
          <h2 className={styles.titulo}>
          
  

             <span className={`${styles.titulo} ${styles.typingAnimation}`}>
              {" "}
              Elaine Soares Almeida
            </span> 
          </h2>
          <h3 className={styles.subtitulo}>DESENVOLVEDORA FRONT-END</h3>
          <div className={styles["container-botao"]}>
          <Link className={`${styles["botao-contato"]}`} to={iconLinks[3].link}> CONTATE-ME</Link>
         
            <a href={curriculo} download="curriculo" className={styles.botao}>
              <span className={styles["icon-download"]}>
                <GoDownload />
              </span>{" "}
              CURRÍCULO
            </a>
          </div>
        </div>
        <img src="\portfolio\src\components\Img\Captura de tela 2024-05-22 222252-Photoroom.png" className={styles.foto} />
      </Card>
    </div>
  );
}
