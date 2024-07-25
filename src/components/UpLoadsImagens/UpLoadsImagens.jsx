/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styles from './UpLoadsImagens.module.css';

export function UpLoadsImagens({ onFileSelect, clear }) {
  const [imgURL, setImgURL] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
      setImgURL(URL.createObjectURL(file));
    }
  };

  useEffect(()=>{
if(clear){
  setImgURL("");
  fileInputRef.current.value = '';
}
  },[clear])

  return (
    <div className={styles.container}>
      <input type="file" onChange={handleFileSelect} ref={fileInputRef} />
      {imgURL && <img src={imgURL} alt="Imagem" height={100} />}
    </div>
  );
}
