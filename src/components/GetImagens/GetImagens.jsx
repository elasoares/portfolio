/* eslint-disable react/prop-types */
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { storage } from "../../firebaseConfig";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";


export function GetImagens({nomeDaImagem}){
    const[imageUrl, setImageUrl] = useState("");

    

    useEffect(()=>{
        const pegarImagem = async () => {
            try{
                const storageRef = ref(storage, `images/${nomeDaImagem}`);
                const url = getDownloadURL(storageRef);
                setImageUrl(url);
            } catch(error){
                toast("Error na requisição da imagem.");
            }
        }
            pegarImagem();
    },[nomeDaImagem]);

   
return(
    <div>
        {imageUrl ? (
            <img src={imageUrl}/> 
            ):(
            <LoadingOverlay/>
        )}
    </div>
);
}