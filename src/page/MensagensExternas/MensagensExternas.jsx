import { useEffect, useState } from "react";
import { supabase } from "../../Supabaseconfig";
import { toast } from "react-toastify";
import styles from './MensagensExternas.module.css';
import { AiOutlineDelete } from "react-icons/ai";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";

export function MensagensExternas() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exibirPorId, setExibirPorId] = useState(false);

  async function requisitarDados() {
    try {
      const { data, error } = await supabase
        .from("mensagens")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setDados(data || []);
    } catch (error) {
      toast("Error na requisição dos dados" + error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    requisitarDados();
  }, []);

  const toggleMessage = (id) => {
    setExibirPorId(exibirPorId === id ? null : id);
  };

  async function handleDelete(porId) {
    try {
      const { error } = await supabase
        .from("mensagens")
        .delete()
        .eq("id", porId);
      if (error) throw error;
      setDados(dados.filter(dado => dado.id !== porId));
      toast("Mensagem apagada!");
    } catch (error) {
      toast("Erro ao tentar deletar, verifique e tente novamente." + error.message);
    }
  }

  if (loading) return <LoadingOverlay />;

  return (
    <div>
      {dados.length > 0 ? (dados.map((mensagem, index) => (
        <div key={'mensagem_' + index}>
          <div onClick={() => toggleMessage(mensagem.id)} className={styles.container}>
            <div>
              <h4>Mensagem de: {mensagem.name}</h4>
            </div>
            <div className={styles['botao-delete']}>
              <AiOutlineDelete onClick={() => handleDelete(mensagem.id)} />
            </div>
          </div>
          {exibirPorId === mensagem.id && (
            <div className={styles['container-items']}>
              <p><span className={styles.assunto}>De:</span> {mensagem.name}</p>
              <p><span className={styles.assunto}>E-mail: </span> {mensagem.email}</p>
              <p className={styles['exibir-display']}><span className={styles.assunto}>Assunto:</span> {mensagem.subject}</p>
              <p className={styles['exibir-display']}><span className={styles.assunto}>Mensagem:</span> {mensagem.message}</p>
            </div>
          )}
        </div>
      ))) : (
        <p>Nenhuma mensagem recebida.</p>
      )}
    </div>
  );
}