import { useEffect, useState } from "react"
import { axios } from "../../axios"
import { toast } from "react-toastify";
import styles from './MensagensExternas.module.css';
import { AiOutlineDelete } from "react-icons/ai";


export function MensagensExternas (){
const[dados, setDados] = useState([]);
const [exibirPorId, setExibirPorId]= useState(false);

 async function requisitarDados(){
    try{
const response =  await axios.get('/mensagens.json');
const data = response.data;
const paraObjeto = Object.keys(data).map((key)=>{
   return{ 
    id: key,
   ...data[key]
}
});
setDados(paraObjeto);

    }catch(error){
        toast("Error na requisição dos dados" + error);
    }

 }

 useEffect(()=>{
    requisitarDados();
 },[]);


 const toggleMessage = (id) => {
  setExibirPorId(exibirPorId === id ? null : id);
};


async function handleDelete(porId){
 try{ await axios.delete(`/mensagens/${porId}.json`);
  setDados(dados.filter(dado => dado.id !== porId));
  toast("Mensagem apagada!");
}catch(error){
  toast("Erro ao tentar deletar, verifique e tente novamente." + error.message); 
  }
}

/*     const handleNaoDeletar=()=>{
      setDeletar(false);
    }

  async function deletar (porId){
    setDeletar(!deleta);
  } */


     return (
    <div>
        {
            dados.length > 0 ?  (
            
              dados.map((mensagem, index)=>(
            <div  key={'mensagem_' + index}>
            <div onClick={()=>toggleMessage(mensagem.id)} className={styles.container}>
            <div><h4>Mensagem de: {mensagem.name} {mensagem.surname}</h4></div>
          
           
            <div className={styles['botao-delete']}>
            <AiOutlineDelete  onClick={() => handleDelete(mensagem.id)}/>
            </div>
          {/*   {deleta && (
                <div>
                <button  onClick={() => handleDelete(mensagem.id)}>Sim</button>  
                <button onClick={handleNaoDeletar}>Não</button>
                </div>
            )} */}
          

            </div>
            {exibirPorId == mensagem.id && (
              <div className={styles['container-items']}>
              <p> <span className={styles.assunto}>De:</span> {mensagem.name} {mensagem.surname}</p>
              <p className={ styles['exibir-display']}> <span className={styles.assunto}>Assunto:</span> {mensagem.opcao}</p>
              <p className={styles['exibir-display']}><span className={styles.assunto}>Mensagem:</span> {mensagem.message}</p>
              </div>
            )}
           
            </div>
           
       ) )
        ):( 
        <p>Nenhum dado encontrado.</p>
        
        )}
   
    </div>
  );
}