import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { axios } from "../../axios";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";
import styles from './Certificado.module.css';
import { Card } from "../../components/Card/Card";
import { PiBuildingLight } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { TbClockHour5 } from "react-icons/tb";
import { VerMais } from "../../components/VerMais/VerMais";

export function Certificado() {
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
              .filter((dado) => dado.select === "certificado") 
              .map((dado, index) => (
                <Card className={styles.card} key={"post_" + index}>
                    <h1>{dado.title}</h1>
                  <div className={styles["container-info"]}>
                    <PiBuildingLight /> 
                    <p>{dado.institute}</p>
                  </div>
                  <div  className={styles["container-info"]}>
                    <IoCalendarOutline />
                    <p>{dado.date}</p>
                  </div>
                  <div  className={styles["container-info"]}>
                    <TbClockHour5 />  
                    <p>{dado.hour}</p>
                  </div>
                  <VerMais to={dado.id}/>
                </Card>
              ))
          ) : (
            <LoadingOverlay />
          )}

      </div>
    </div>
  );
}
