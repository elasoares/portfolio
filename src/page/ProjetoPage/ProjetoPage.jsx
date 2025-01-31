import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { axios } from "../../axios";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";
import styles from './ProjetoPage.module.css';
import { Card } from "../../components/Card/Card";
import { FotoPerfil } from "../../components/FotoPerfilGet/FotoPerfil";
import { MensagemCVerMais } from "../../components/MensagemCVerMais/MensagemCVerMais";
import { Link } from "react-router-dom";

export function ProjetoPage() {
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
      toast("Erro na requisição de dados!" + error.message);
    }
  }

  useEffect(() => {
    pegarDados();
  }, []);

  return (
    <div className={styles.PrimeiroContainer}>
      <div className={styles.container}>
        <LoadingOverlay />
        {dados.length > 0 ? (
            dados
              .filter((dado) => dado.select === "projeto") // Filtra apenas os projetos
              .map((dado, index) => (
                <Card className={styles.card} key={"post_" + index}>
                  <Link to={`/visualizar/${dado.id}`}>
                    <div className={styles.header}>
                      <div className={styles["container-header-perfil"]}>
                        <FotoPerfil className={styles.fotoPerfil} />
                        <div className={styles['container-header-titulo']}>
                          <h2>Elaine Soares</h2>
                          <p>{dado.subtitle}</p> 
                        </div>
                      </div>
                    </div>
                    <div className={styles["container-imagem-postada"]}>
                      {dado.imageUrl && <img src={dado.imageUrl} alt="Imagem do post" className={styles.imagem} />}
                    </div>
                    <div className={styles.containerMensagem}>
                      <MensagemCVerMais 
                        classNameContainer={styles['container-info']} 
                        classNameFilho={styles.mensagem}
                      >
                        {dado.about}
                      </MensagemCVerMais>
                    </div>
                  </Link>
                </Card>
              ))
          ) : (
            <LoadingOverlay />
          )}

      </div>
    </div>
  );
}
