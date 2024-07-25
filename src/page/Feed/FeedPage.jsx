import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { axios } from "../../axios";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";
import styles from './FeedPage.module.css';
import { Card } from "../../components/Card/Card";
import { ComponenteVisualizar } from '../../components/VisualizarComponente/ComponenteVisualizar';
import { Curtir } from "../../components/Curtir/Curtir";
import { Comentar } from "../../components/Comentar/Comentar";
import { FotoPerfil } from "../../components/FotoPerfilGet/FotoPerfil";

export function FeedPage() {
  const [dados, setDados] = useState([]);

  async function pegarDados() {
    try {
      const response = await axios.get('/meu-post.json');
      const data = response.data;
      const paraObjeto = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key]
        };
      });
      setDados(paraObjeto);
    } catch (error) {
      toast("Error na requisição de dados!" + error.message);
    }
  }

  useEffect(() => {
    pegarDados();
  }, []);

  return (
    <div className={styles.container}>
      <LoadingOverlay />
      {dados.length > 0 ? (
        dados.map((dado, index) => (
          <Card className={styles.card} key={"post_" + index}>
            <div className={styles.header}>
              <div className={styles["container-header-perfil"]}>
                <FotoPerfil className={styles.fotoPerfil} />
                <div className={styles['container-header-titulo']}>
                <h2>Elaine Soares</h2>
                <p>{dado.subtitle}</p> 
                </div>
              </div>
              <ComponenteVisualizar className={styles.visualizar} visualizar={`/visualizar/${dado.id}`} />
            </div>
           
              {/* 
                <h5>{dado.title}</h5>
                <p>{dado.subtitle}</p> 
              </div>*/}
                <div className={styles["container-imagem-postada"]}>
                {dado.imageUrl && <img src={dado.imageUrl} alt="Imagem do post" className={styles.imagem} />}
               </div>
            <div className={styles['container-info']}>
                <p className={styles.mensagem}>{dado.message}</p> 
            </div>

            <div className={styles['container-footer']}>
              <div className={styles['footer-up']}>
                <Curtir className={styles['container-curtir']} />
                <Comentar />
              </div>
            </div>
          </Card>
        ))
      ) : (
        <LoadingOverlay />
      )}
    </div>
  );
}
