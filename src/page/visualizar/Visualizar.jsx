/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axios } from '../../axios';
import toast from 'react-simple-toasts';
import { LoadingOverlay } from '../../Layout/LoadingOverlay';
import styles from './Visualizar.module.css';
import { IoMdClose } from 'react-icons/io';
import { CiCircleInfo } from 'react-icons/ci';
import { TbBrandGithub } from "react-icons/tb";
import { BiWindowOpen } from "react-icons/bi";
import { PiBuildingLight } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { TbClockHour5 } from "react-icons/tb";

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

  return (
    <div className={styles.primeiroContainer}>
      <div className={styles.container1}>
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2>{post.title}</h2>
            <IoMdClose className={styles.close} onClick={()=> navigate(-1)} />
          </div>
          
          <div className={styles.conatinerTechHeader}>
            {post.tecnologia && (<p>{"</>"} Tecnologias</p>)}
            <ul>
              {post.tecnologia && post.tecnologia.map((itemTech, index) => (
                  <li key={index}>{itemTech}</li>
              ))}
            </ul>
              {post.select === "certificado" &&(
                <div>
                  <div className={styles["container-info"]}>
                    <PiBuildingLight /> 
                    <p>{post.institute}</p>
                  </div>
                  <div  className={styles["container-info"]}>
                    <IoCalendarOutline />
                    <p>{post.date}</p>
                  </div>
                  <div  className={styles["container-info"]}>
                    <TbClockHour5 />  
                    <p>{post.hour}</p>
                  </div>
                </div>
              )}
          </div>
          {
            post.link && (
              <div className={styles["container-redirecionamento"]}>
                <a href={post.link} target="_blank" rel="noopener noreferrer" className={styles["container-redirecionamento-icon"]}>
                  {post.select === "projeto" ? (
                    <>
                    <TbBrandGithub /> Ver código
                    </>
                  ):(
                    <>
                    <BiWindowOpen /> Verificar certificado
                    </>
                  )}
                </a>
              </div>
            )
          }
          <div className={styles.containerImagemPostada}>
            <img className={styles.imagem} src={post.imageUrl} alt={post.title} />
          </div>

          {post.select === "projeto" && (
            <div className={styles.containerInfo}>
              <div className={styles.info}>
                <h3 className={styles.tituloSobre}><CiCircleInfo /> Sobre o projeto</h3>
                <p className={styles.mensagem}>{post.about}</p>
              </div>
              {post.functionality && (
                <div className={styles.info}>
                  <h4 className={styles.funcionalidade}>Funcionalidades</h4> 
                  <p className={styles.mensagem}>{post.functionality}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Visualizar;
