import { getDownloadURL, ref } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "../../firebaseConfig";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";

/* eslint-disable react/prop-types */
export function FotoPerfil({className}){

    
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
      
    useEffect(() => {
       
        const imageRef = ref(storage, "images/Captura de tela 2024-05-22 222252-Photoroom.png"); 
    
       
        getDownloadURL(imageRef)
          .then((url) => {
            console.log("URL da imagem obtida:", url); 
            setImageUrl(url);
          })
          .catch((error) => {
            console.error("Erro ao obter a URL da imagem:", error);
            setError(error.message);
          });
      }, []);
      
        return (
            <div>
            {imageUrl ? (
              <img className={className} src={imageUrl} alt="Foto do perfil" />
            ) : (
              <div>
               <LoadingOverlay/>
                {error && <p>Erro: {error}</p>}
              </div>
            )}
          </div>
        );
      }
      
