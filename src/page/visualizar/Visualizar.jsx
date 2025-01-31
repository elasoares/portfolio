/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axios } from '../../axios';
import toast from 'react-simple-toasts';
import { LoadingOverlay } from '../../Layout/LoadingOverlay';
import styles from './Visualizar.module.css';
import { IoMdClose } from 'react-icons/io';
import { CiCircleInfo } from 'react-icons/ci';

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
      } catch (error) {
        toast('Erro ao carregar o post: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <LoadingOverlay />;
  if (!post) return <p>Post não encontrado!</p>;

  function fecharModal() {
    navigate('/projetos');
  }

  return (
    <div className={styles.primeiroContainer} onClick={fecharModal}>
      <div className={styles.container1}>
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2>{post.title}</h2>
            <IoMdClose className={styles.close} onClick={fecharModal} />
          </div>
          <div>
            <p>{"</>"}</p>
            <p>Tecnologias</p>
            <ul>
              {post.tecnologia && post.tecnologia.map((itensTech, index)=>(
                <li key={index}>{itensTech}</li> 
              )) }
              </ul>
          </div>
          <div className={styles.containerImagemPostada}>
            <img className={styles.imagem} src={post.imageUrl} alt={post.title} />
          </div>
          <div className={styles.containerInfo}>
            <div className={styles.info}>
              <h3 className={styles.tituloSobre}><CiCircleInfo /> Sobre o projeto</h3>
              <p className={styles.mensagem}>{post.about}</p>
                  
                  {post.functionality ? (
                    <div>
                      <h4 className={styles.funcionalidade}>Funcionalidades</h4> 
                      <p className={styles.mensagem}></p>
                    </div>
                  ):(
                    <p></p>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visualizar;