/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styles from './Comentar.module.css';
import { dataBase } from '../../firebaseConfig.js';
import { ref, push, onValue } from 'firebase/database';
import toast from 'react-simple-toasts';
/* import { Curtir } from '../Curtir/Curtir.jsx'; */

export function Comentar({ postID }) {
  const [comentario, setComentario] = useState('');
  const [comentariosEnviados, setComentariosEnviados] = useState([]);

  useEffect(() => {
    const mensRef = ref(dataBase, `/comentarios/${postID}`);
    const unsubscribe = onValue(mensRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const comentariosArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          texto: value.texto,
        }));
        setComentariosEnviados(comentariosArray);
      } else {
        setComentariosEnviados([]);
      }
    });
    return () => unsubscribe();
  }, [postID]);

  const handleChange = (event) => {
    const { value } = event.target;
    setComentario(value);
  };

  const enviarParaFirebase = () => {
    const mensRef = ref(dataBase, `/comentarios/${postID}`);

    push(mensRef, { texto: comentario })
      .then(() => {
        setComentario('');
        toast('Comentário realizado com sucesso!');
      })
      .catch((erro) => {
        toast('Erro: ' + erro.message);
      });
  };

  return (
    <div className={styles.container}>
      <div>
        {comentariosEnviados.map((comentar) => (
          <div key={comentar.id} className={styles["container-comentario"]}>
            <span className={styles.comentario}>Comentário:</span>
            <p>{comentar.texto}</p>
          </div>
        ))}
      </div>

      <div className={styles['container-mensagem']}>
        {/* <Curtir className={styles['container-curtir']} /> */}
        <fieldset>
          <textarea
            placeholder="Deixe seu comentário aqui"
            value={comentario}
            name="mensagem"
            id="mensagem"
            rows="1"
            cols="30"
            className={styles['campo-input']}
            onChange={handleChange}
          />
        </fieldset>
        <button className={styles.botao} onClick={enviarParaFirebase}>
          Enviar
        </button>
      </div>
    </div>
  );
}
