import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axios } from '../../axios';
import toast from 'react-simple-toasts';
import { LoadingOverlay } from '../../Layout/LoadingOverlay';
import styles from './Visualizar.module.css';
import { Curtir } from '../../components/Curtir/Curtir';
import { Comentar } from '../../components/Comentar/Comentar';
import { FotoPerfil } from '../../components/FotoPerfilGet/FotoPerfil';
import { IoMdClose } from "react-icons/io";

export function Visualizar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/meu-post/${id}.json`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        toast("Erro ao carregar o post: " + error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!post) {
    return <p>Post não encontrado!</p>;
  }

  function navegarParaFeed(destino){
      navigate(destino);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.header}>

          <div className={styles["container-header"]}>
            <FotoPerfil className={styles.fotoPerfil} />
            <div className={styles['container-header-titulo']}>
              <h2>Elaine Soares</h2>
              <p>{post.subtitle}</p> 
            </div>
          </div>
          <IoMdClose onClick={()=>navegarParaFeed('/feed')}/>
        </div>

        <div className={styles["container-imagem-postada"]}>
            <img className={styles.imagem} src={post.imageUrl} />
        </div>
       

        <div className={styles['container-info']}>    
          <div className={styles.mensagem}>{post.message}</div>
        </div>

        <div className={styles.footer}>
          <Curtir className={styles['container-curtir']}/>
          <Comentar/>
        </div>

      </div>
    </div>
  );
}

export default Visualizar;
