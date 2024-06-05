import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import toast from "react-simple-toasts";
import styles from './UpLoadsImagens.module.css';

export function UpLoadsImagens() {
  const [imgURL, setImgURL] = useState('');
  const[progresso, setProgresso] = useState(0);
  const fileInputRef = useRef(null);


  const handleUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (!file) {
      toast('Por favor, selecione um arquivo para enviar.');
      return;
    }
    

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot)=>{
         const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) *100;
         setProgresso(progress);
      },
      (error)=>{
          console.log("Error: " + error.message);
      },
      
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          setImgURL(url); 
         fileInputRef.current.value = "";
         toast('Upload realizado com sucesso!');
        });
      
      }
    );
  };

  return (
   
   <div className={styles.container}>
      <input type="file" onChange={handleUpload} ref={fileInputRef}/>
      {progresso > 0 && progresso < 100 &&(
        <progress value={progresso} max="100"/>
      )}
      {imgURL && <img src={imgURL} alt="Imagem" height={200} />}
    </div>

  );
}
