import { useState } from 'react';
import styles from './Comentar.module.css';
import { dataBase } from '../../firebaseConfig.js';
import { ref, push } from 'firebase/database';
import toast from 'react-simple-toasts';

export function Comentar() {
  const [comentario, setComentario] = useState('');
  const [comentariosEnviados, setComentariosEnviados] = useState([]);
  const [confirmaEnvio, setConfirmaEnvio] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setComentario(value);
  };

  const enviarParaFirebase = () => {
    const mensRef = ref(dataBase, '/comentário');

    push(mensRef, { texto: comentario })
      .then(() => {
        setComentariosEnviados((prevComentarios) => [...prevComentarios, comentario]);
        setComentario('');
        setConfirmaEnvio(true);
        toast('Comentário realizado com sucesso!');
      })
      .catch((erro) => {
        toast('Error: ' + erro.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles['container-mensagem']}>

        
      <fieldset>
      <textarea
          placeholder="Deixe seu comentário aqui"
          value={comentario}
          name="message"
          id="message"
          rows="1"
          cols="30"
          className={styles['compo-input']}
          onChange={handleChange}
        />
      </fieldset>
      <button className={styles.botao} onClick={enviarParaFirebase}>Enviar</button>

      </div>

      {confirmaEnvio && (
        <div>
          {comentariosEnviados.map((comentar, index) => (
            <div key={index} className={styles.comentario}>
            <h6>Comentário:</h6>  <p>{comentar}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
