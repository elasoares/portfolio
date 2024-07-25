/* eslint-disable react/prop-types */
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { storage } from "../../firebaseConfig";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";


export function GetImagens({nomeDaImagem}){
    const[imageUrl, setImageUrl] = useState("");
    const[error, setError] = useState("");

    

    useEffect(()=>{
        const pegarImagem = async () => {
            try{
                const storageRef = ref(storage, `images/${nomeDaImagem}`);
                const url = getDownloadURL(storageRef);
                setImageUrl(url);
            } catch(error){
                console.error("Error na requisição da imagem" + error);
                setError(error.message);
                toast("Error na requisição da imagem.");
            }
        }
            pegarImagem();
    },[nomeDaImagem]);

   
    return(
        <div>
        {
            imageUrl ? (
                <img src={imageUrl}/> 
            ):(
          <div>
          <LoadingOverlay/>          
               {error && <p>Error: {error}</p>}
            </div>
            )
        }
        </div>
    );
}