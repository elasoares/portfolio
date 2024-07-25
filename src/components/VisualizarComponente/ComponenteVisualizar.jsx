
import { useState } from "react";
import styles from './componenteVisualizar.module.css';
import { HiOutlineDotsVertical } from "react-icons/hi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";





export function ComponenteVisualizar({visualizar, className }){
const[mostrarBotoes, setMostrarBotoes] = useState(false);


  const handleClick = ()=>{
    setMostrarBotoes(!mostrarBotoes);
}



const botaoVisualizar = mostrarBotoes ? <FaEye /> : null;






    return (
       <div className={className}>
               <div className={styles.tresPontinhos} onClick={handleClick}><HiOutlineDotsVertical /></div>
                <div className={styles['container-visualizar']}>
                <Link className={styles.visualizar} to={visualizar}>{botaoVisualizar}</Link>
                </div>
        </div>
           
         
     



    )
}

ComponenteVisualizar.propTypes = {
    visualizar: PropTypes.func.isRequired,
    className: PropTypes.func.isRequired
     
}