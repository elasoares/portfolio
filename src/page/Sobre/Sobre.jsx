import styles from './Sobre.module.css';

/* const habilidades = [
  {nome:"HTML", link:"/src/components/Img/html5.png" },
  {nome:"CSS", link:"/src/components/Img/css.png" },
  {nome:"JAVA", link:"/src/components/Img/JAVA.png"},
  {nome:"JAVASCRIPT", link:"/src/components/Img/javaScript.png"},
  {nome:"REACT", link:"/src/components/Img/react.png" },
  {nome:"GIT", link:"/src/components/Img/git.png"},
  {nome:"GITHUB", link:"/src/components/Img/github-mark.png" },
] */

const habilidades = [
  { nome: "HTML", link: "/public/Img/html5.png" },
  { nome: "CSS", link: "/Img/css.png" },
  { nome: "JAVA", link: "/Img/JAVA.png" },
  { nome: "JAVASCRIPT", link: "/Img/javaScript.png" },
  { nome: "REACT", link: "/Img/react.png" },
  { nome: "GIT", link: "/Img/git.png" },
  { nome: "GITHUB", link: "/Img/github-mark.png" },
];



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
