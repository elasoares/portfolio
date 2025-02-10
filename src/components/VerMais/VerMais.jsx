/* eslint-disable react/prop-types */
import styles from './VerMais.module.css';
import { TiArrowRight } from "react-icons/ti";
import { Link } from "react-router-dom";

export function VerMais({className, children, to}){

    const text = typeof children === 'string' ? children : " ";
    const textoExibido = text.length > 85 ? `${text.substring(0, 85)}...` : text;

    return(
        <div className={styles["container-info"]}>
            <div>
                <p className={styles.mensagem}>{textoExibido}</p> 
            </div>
                <Link to={`/visualizar/${to}`} className={` ${className}`}>
                    <p className={styles['container-botao']}>Ver detalhes <TiArrowRight className={styles.icon}/></p>
                    
                </Link>
        </div>
    );
}