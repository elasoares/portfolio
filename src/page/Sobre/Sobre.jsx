import styles from './Sobre.module.css';
import css from '/Img/css.png';
import html5 from '/Img/html5.png';
import java from '/Img/JAVA.png';
import javaScript from '/Img/javaScript.png';
import react from '/Img/React.png';
import git from '/Img/git.png';
import github from '/Img/github-mark.png';

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
    
    <div className={styles['primeiro-container']}>
    <div className={styles['container']}>
        <div className={styles['container-sobre']}>
            <h4 className={styles.titulo}>Sobre</h4>
          
          <div className={styles['container-header']}>
            <span className={styles['border-style']}></span>
            <div className={styles["header-texto-sobre"]}>
            <p className={styles["texto-sobre"]}>Meu nome é Elaine Soares Almeida e sou graduanda em Análise e Desenvolvimento de Sistemas, com previsão de conclusão para Outubro de 2025. Estou em busca de uma oportunidade
que me permita aplicar e expandir as habilidades que venho desenvolvendo nessa caminhada da
minha formação acadêmica e experiência profissional.
</p>
<p className={styles["texto-sobre"]}>Minha jornada inclui uma formação robusta em tecnologia, evidenciada por linguagens e frameworks como JavaScript, React, Java, e SQL,
além de ter participado do Santander Bootcamp 2024 focado em back-end Java.
Complementando meu perfil técnico, estou cursando Inglês na Universidade Federal do Ceará,
com o nível atual intermediário B1, o que me capacita a atuar em ambientes internacionais.</p>
          </div>
          </div>
        </div> 
     


    <div className={styles['container-habilidades']}>
        <h4 className={styles.titulo}> Minhas habilidades</h4>

        <div  className={styles['container-itens-habilidades']}>
            {habilidades.map((habilidade, index)=>(
              <div key={index} className={styles['itens-habilidades']}>
                  <div><img className={styles.imgStyle2}  src={habilidade.link} alt={`Icon: ${habilidade.nome}`}/></div>
                  <div><p className={styles.itens}>{habilidade.nome}</p></div>
              </div>
            ))}
        </div>
        
    </div> 


  </div>
  </div>

  );
}
