/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styles from './Comentar.module.css';
import { supabase } from "../../Supabaseconfig";
import toast from 'react-simple-toasts';

export function Comentar({ postID }) {
  const [comentario, setComentario] = useState('');
  const [comentariosEnviados, setComentariosEnviados] = useState([]);

  async function carregarComentarios() {
    const { data, error } = await supabase
      .from("comentarios")
      .select("*")
      .eq("post_id", postID)
      .order("created_at", { ascending: true });
    if (!error) setComentariosEnviados(data || []);
  }

  useEffect(() => {
    carregarComentarios();
  }, [postID]);

  const handleChange = (event) => setComentario(event.target.value);

  const enviarComentario = async () => {
    if (comentario.trim() === "") return;
    try {
      const { error } = await supabase
        .from("comentarios")
        .insert([{ post_id: postID, texto: comentario }]);
      if (error) throw error;
      setComentario('');
      toast('Comentário realizado com sucesso!');
      carregarComentarios();
    } catch (erro) {
      toast('Erro: ' + erro.message);
    }
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
        <fieldset>
          <textarea placeholder="Deixe seu comentário aqui" value={comentario}
            name="mensagem" id="mensagem" rows="1" cols="30"
            className={styles['campo-input']} onChange={handleChange} />
        </fieldset>
        <button className={styles.botao} onClick={enviarComentario}>Enviar</button>
      </div>
    </div>
  );
}