import { useEffect, useState } from "react";
import { axios } from "../../axios";
import toast from "react-simple-toasts";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";
import { Card } from "../../components/Card/Card";
import styles from './MeusPosts.module.css';
import { EditarEDeletar } from "../../components/EditarEDeletar/EditarEDeletar";






export function MeusPosts (){
const[posts, setPosts] = useState([]);



    async function requisitarMeusPosts(){
        try{
            const response = await axios.get("/meu-post.json");
            const data = response.data;
            const paraObjeto = Object.keys(data).map((key)=>{
               return{ id:key,
                ...data[key]
            }
        });
        setPosts(paraObjeto);

        }catch(error){
            toast("Error na requisição dos dados" + error.message);
        }        
    }

    useEffect(()=>{
        requisitarMeusPosts();
    },[]);



const handleDelete=async(postId)=>{
try{
 await axios.delete(`/meu-post/${postId}.json`);
setPosts(posts.filter(post => post.id !== postId));
toast("Seu post foi deletado!");
}catch(error){
toast("Erro ao tentar deletar, verifique e tente novamente." + error.message); 
}
}




    return (
        <div  className={styles.container} >
            <LoadingOverlay/>
         
            {posts.length > 0 ?(
              posts.map((postado, index)=>(
               <Card className={styles.card}  key={"post_" + index}>
                              
              <div className={styles['container-header']}> 
              
              
                <div className={styles['container-titulo']}>
                    <h5>{postado.title}</h5>
                    <p>{postado.subtitle}</p>
                    {postado.imageUrl && <img src={postado.imageUrl} alt="Imagem do post" className={styles.imagem} />}
                </div>
                <div> 
                <EditarEDeletar className={styles.EditarEDeletar} onDelete={()=> handleDelete(postado.id)}  editar={`/editar/${postado.id}`} visualizar={`/visualizar/${postado.id}`}  />
              
                </div>
              </div>

              

                <div  className={styles['container-mensagem']}>
                <p>{postado.message}</p>
               </div>
            
               </Card>
             )) 
            ):(
                <p>Nenhum dado encontrado!</p>
            )
            }


         



        </div>
    )
}