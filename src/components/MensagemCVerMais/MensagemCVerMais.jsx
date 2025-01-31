/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from './MensagemCVerMais.module.css';
import { TiArrowRight } from "react-icons/ti";

export function MensagemCVerMais({classNameContainer, classNameFilho, children}){
    const[mensagem] = useState(false);

    function handleVerMensagem(){
       /*  setVerMensagem(!mensagem); */
    }

    const text = typeof children === 'string' ? children : " ";
    
    return(
        <div>
        <div className={classNameContainer}>
            <p className={classNameFilho}>{mensagem ? text : `${text.substring(0, 105)}...`}</p> 
            </div>
            <div className={styles['container-botao']}>
            <button className={styles.botao} onClick={handleVerMensagem}>
                {mensagem ? "" : <p>Ver detalhes <TiArrowRight/></p>}
            </button>
            </div>
        </div>
    );
}