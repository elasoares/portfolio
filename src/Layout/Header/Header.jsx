/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from  "./Header.module.css";
import { AcessarPerfil } from "../../components/AcessarPerfil/AcessarPerfil.jsx";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig.js";


export function Header({className}){
    const [user, setUser] = useState(null);
    const [nav, setNav] = useState(false);

    useEffect(() => {
        const userLogado = onAuthStateChanged(auth, (users) => {
        setUser(users);
        });
        return () => userLogado();
    }, []);

    function clicarEFecharOmenu(){
        setNav(!nav);
    }
    


    return(
    <div className={`${className} ${styles.container}`}>        
        <Link className={styles.logo} to="/">
            Ela 
            <span>.</span>
        </Link>
        <div className={styles.perfil}>
            {!user ? (
                <div className={styles["perfil-container"]}>
                    <Link className={styles.entrar} to={"/entrar"} onClick={clicarEFecharOmenu}>
                        Entrar
                    </Link>
                </div>
            ) : (
            <AcessarPerfil className={styles.acessarPerfil} />
            )}
        </div>
        
    </div>
    );
}