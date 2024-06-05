import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axios } from '../../axios';
import toast from 'react-simple-toasts';
import { LoadingOverlay } from '../../Layout/LoadingOverlay';
import styles from './Visualizar.module.css';
import { Curtir } from '../../components/Curtir/Curtir';
import { Comentar } from '../../components/Comentar/Comentar';

export function Visualizar() {
  const { id } = useParams();
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

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.header}>
          <img src="/path/to/profile-pic.jpg" alt="Profile" />
          <h2>{post.name}</h2>
        </div>

        <img className={styles.image} src={post.imageUrl} />

        <div className={styles.info}>
          <h2>{post.title}</h2>
          <p>{post.subtitle}</p>
          <div className={styles.message}>{post.message}</div>
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
