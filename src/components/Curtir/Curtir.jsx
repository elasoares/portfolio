    import { useState } from "react";
    import PropTypes from "prop-types";
    import { GoHeart } from "react-icons/go";
    import styles from './Curtir.module.css';
    import { GoHeartFill } from "react-icons/go";


    export function Curtir({className}){
    const [curtido, setCurtido] = useState(0);



    const handleCurtir=()=>{
        setCurtido(curtido + 1 );
    }

    const handleDescurtir=()=>{
        setCurtido(curtido - 1);
    }



        return(
            <div className={className}>
                {curtido === 0 ? (
                     <button className={styles.botao} onClick={handleCurtir}><GoHeart className={styles.coracao}/></button>
                ):(
                    <button className={styles.botao}  onClick={handleDescurtir}><GoHeartFill className={styles[`coracao-vermelho`]}/> </button>
                ) }
                <p>{curtido}</p>
            </div>
        
        );
    }

    Curtir.propTypes={
        className: PropTypes.func.isRequired,
    }