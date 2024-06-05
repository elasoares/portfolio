/* import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "./firebaseConfig";

const UserContext = createContext(null)

const AuthUserProvider =({children})=>{
    const[user, setUser]=useState(null);

    useEffect(()=>{
        const dadosUser = onAuthStateChanged(auth, setUser)
        return()=>dadosUser();
    },[])

    return(
        <div>{user ? <p>{`Entrou com email: ${user.email}`}</p> : <p>Não logado</p>}</div>
    )
}

export default AuthUserProvider; */