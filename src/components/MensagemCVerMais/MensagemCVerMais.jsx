/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from './MensagemCVerMais.module.css';

export function MensagemCVerMais({classNameContainer, classNameFilho, children}){
    const[mensagem, setVerMensagem] = useState(false);

    function handleVerMensagem(){
        setVerMensagem(!mensagem);
    }

    const text = typeof children === 'string' ? children : " ";
    
    return(
        <div>
        <div className={classNameContainer}>
            <p className={classNameFilho}>{mensagem ? text : `${text.substring(0, 100)}...`}</p> 
            </div>
            <div className={styles['container-botao']}>
            <button className={styles.botao} onClick={handleVerMensagem}>
                {mensagem ? "Ver menos" : "Ver mais..."}
            </button>
            </div>
        </div>
    );
}