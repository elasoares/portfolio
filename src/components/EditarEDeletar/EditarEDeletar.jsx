/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from './EditarEDeletar.module.css';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";





export function EditarEDeletar ({onDelete, editar,visualizar, className }){
const[mostrarBotoes, setMostrarBotoes] = useState(false);


  const handleClick = ()=>{
    setMostrarBotoes(!mostrarBotoes);
}


const botaoDeletar = mostrarBotoes ?<AiOutlineDelete onClick={onDelete} />    : null;
const botaoEditar= mostrarBotoes ? <CiEdit />    : null;
const botaoVisualizar = mostrarBotoes ? <FaEye /> : null;






    return (
       <div className={className}>
               <div className={styles.tresPontinhos} onClick={handleClick}><HiOutlineDotsVertical /></div>
                <div className={styles['container-deletar-editar']}>
                <button className={styles.deletar} >{botaoDeletar} </button>
                <Link className={styles.editar}  to={editar}>{botaoEditar} </Link>
                <Link className={styles.editar} to={visualizar}>{botaoVisualizar}</Link>
                </div>
        </div>
           
         
     



    )
}

