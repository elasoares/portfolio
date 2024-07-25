import { MensagensExternas } from "../MensagensExternas/MensagensExternas"
import { FormularioPerfil } from "../FormularioPerfil/FormularioPerfil";
import { MeusPosts } from "../MeusPosts/MeusPosts";
import styles from './Perfil.module.css';
import { LoadingOverlay } from "../../Layout/LoadingOverlay";
import { Button } from "../../components/Button/Button";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { MdAllInbox } from "react-icons/md";
import { CgFeed } from "react-icons/cg";


export function PerfilPage(){
const [mostrarPost, setMostrar] = useState(false);
const [mostrarEntrada, setMostrarEntrada] = useState(true);
const [mostrarMeusPosts, setMostrarMeusPosts] = useState(false);


function mostrarCampoPost(){
setMostrar(!mostrarPost);
setMostrarEntrada(false);
setMostrarMeusPosts(false);

}

function mostrarCampoEntrada(){
    setMostrarEntrada(!mostrarEntrada);
    setMostrar(false);
    setMostrarMeusPosts(false);
    
}

function mostrarPosts(){
    setMostrarMeusPosts(!mostrarMeusPosts);
    setMostrarEntrada(false);
    setMostrar(false);
    
}



const exibindoCampoPost = mostrarPost ? <FormularioPerfil /> : "";
const exibindoCampoEntrada = mostrarEntrada ? <MensagensExternas /> : "";
const exibindoMeusPosts = mostrarMeusPosts ? <MeusPosts /> : "";

    return ( 
    <div className={styles.container}>
    <LoadingOverlay/>
   

    <div className={styles.aside}>
     <Button onClick={mostrarCampoPost} className={styles.escrever}> <FaPencilAlt/> Escrever </Button>

    <Button onClick={mostrarCampoEntrada} className={styles['aside-items']}> <MdAllInbox />Caixa de entrada </Button>
    <Button onClick={mostrarPosts} className={styles['aside-items']}> <CgFeed />Meus posts </Button>
    
    </div>

    <div  className={styles.principal}> 
   {exibindoCampoPost}
  {exibindoCampoEntrada}
    {exibindoMeusPosts}
    </div>

    </div>
    );
}