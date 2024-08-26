import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axios } from '../../axios';
import toast from 'react-simple-toasts';
import { LoadingOverlay } from '../../Layout/LoadingOverlay';
import styles from './Visualizar.module.css';
import { FotoPerfil } from '../../components/FotoPerfilGet/FotoPerfil';
import { IoMdClose } from "react-icons/io";
import { MensagemCVerMais } from '../../components/MensagemCVerMais/MensagemCVerMais';

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
    <div className={styles.primeiroContainer}>
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
          <IoMdClose className={styles.close} onClick={()=>navegarParaFeed('/feed')}/>
        </div>

        <div className={styles["container-imagem-postada"]}>
            <img className={styles.imagem} src={post.imageUrl} />
        </div>
       

        <div className={styles.containerMensagem}>
        <MensagemCVerMais 
            classNameContainer={styles['container-info']} 
            classNameFilho={styles.mensagem}>{post.message}

         </MensagemCVerMais>
      </div>

      </div>
    </div>
    </div>
  );
}

export default Visualizar;
