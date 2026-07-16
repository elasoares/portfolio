import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { supabase } from "../../Supabaseconfig";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";
import styles from './ProjetoPage.module.css';
import { Card } from "../../components/Card/Card";
import { FotoPerfil } from "../../components/FotoPerfilGet/FotoPerfil";
import { VerMais } from "../../components/VerMais/VerMais";
import { Link } from "react-router-dom";

export function ProjetoPage() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  async function pegarDados() {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("tipo", "projeto")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setDados(data || []);
    } catch (error) {
      toast("Erro na requisição de dados!" + error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    pegarDados();
  }, []);

  if (loading) return <LoadingOverlay />;

  return (
    <div className={styles.PrimeiroContainer}>
      <div className={styles.container}>
        {dados.length > 0 ? (
          dados.map((dado, index) => (
            <Card className={styles.card} key={"post_" + index}>
              <Link to={`/visualizar/${dado.id}`}>
                <div className={styles["container-header-perfil"]}>
                  <FotoPerfil className={styles.fotoPerfil} />
                  <div className={styles['container-header-titulo']}>
                    <h2>Elaine Soares</h2>
                  </div>
                </div>
                <div className={styles["container-imagem-postada"]}>
                  {dado.image_url && <img src={dado.image_url} alt="Imagem do post" className={styles.imagem} />}
                </div>
                <div className={styles.containerMensagem}>
                  <VerMais to={dado.id}>{dado.about}</VerMais>
                </div>
              </Link>
            </Card>
          ))
        ) : (
          <p>Nenhum projeto encontrado.</p>
        )}
      </div>
    </div>
  );
}