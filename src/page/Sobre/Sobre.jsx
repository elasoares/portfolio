import styles from './Sobre.module.css';
import css from "../../../public/Img/css.png";
import html5 from "../../../public/Img/html5.png";
import java from "../../../public/Img/JAVA.png";
import javaScript from "../../../public/Img/javaScript.png";
import react from "../../../public/Img/React.png";
import git from "../../../public/Img/git.png";
import github from "../../../public/Img/github-mark.png";

 const habilidades = [
  {nome:"HTML", link: html5},
  {nome:"CSS", link: css },
  {nome:"JAVA", link: java},
  {nome:"JAVASCRIPT", link: javaScript},
  {nome:"REACT", link: react },
  {nome:"GIT", link: git},
  {nome:"GITHUB", link: github },
] 




export function Sobre() {
  return (
    
    <div className={styles['container']}>
        <div className={styles['container-sobre']}>
            <h4 className={styles.titulo}>Sobre</h4>
          
          <div className={styles['container-header']}>
            <span className={styles['border-style']}></span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sodales diam velit, at bibendum nulla laoreet et. Fusce maximus erat lectus, quis maximus dui dapibus maximus. Morbi ornare egestas lacus, sit amet condimentum nunc ultricies ut. Cras lacinia, lacus eget posuere semper, risus felis porta orci, non bibendum lorem lectus ut urna. Aenean fermentum felis ac lacus malesuada, et semper eros accumsan. Pellentesque vitae ante tortor. Cras est elit, consequat nec mi sed, fringilla tristique justo. Cras egestas malesuada porttitor. Curabitur magna sapien, congue eu tortor nec, commodo viverra eros. Nam a imperdiet orci. Maecenas varius dictum venenatis.</p>
          </div>
        </div> 
     


    <div className={styles['container-habilidades']}>
        <h4 className={styles.titulo}> Minhas habilidades</h4>

        <div  className={styles['container-itens-habilidades']}>
            {habilidades.map((habilidade, index)=>(
              <div key={index} className={styles['itens-habilidades']}>
                  <div><img className={styles.imgStyle2}  src={habilidade.link}/></div>
                  <div><p className={styles.itens}>{habilidade.nome}</p></div>
              </div>
            ))}
        </div>
        
    </div> 


  </div>

  );
}
