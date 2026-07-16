import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { supabase } from "../../Supabaseconfig";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";
import styles from './Certificado.module.css';
import { Card } from "../../components/Card/Card";
import { PiBuildingLight } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { TbClockHour5 } from "react-icons/tb";
import { VerMais } from "../../components/VerMais/VerMais";

export function Certificado() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  async function pegarDados() {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("tipo", "certificado")
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
              <h1>{dado.title}</h1>
              <div className={styles["container-info"]}>
                <PiBuildingLight />
                <p>{dado.institute}</p>
              </div>
              <div className={styles["container-info"]}>
                <IoCalendarOutline />
                <p>{dado.date}</p>
              </div>
              <div className={styles["container-info"]}>
                <TbClockHour5 />
                <p>{dado.hour}</p>
              </div>
              <VerMais to={dado.id} />
            </Card>
          ))
        ) : (
          <p>Nenhum certificado encontrado.</p>
        )}
      </div>
    </div>
  );
}