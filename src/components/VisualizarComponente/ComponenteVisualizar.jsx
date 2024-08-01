/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from './componenteVisualizar.module.css';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
/* import { IoMdClose } from "react-icons/io"; */




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
