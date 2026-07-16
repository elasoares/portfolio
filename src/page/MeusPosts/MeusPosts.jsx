import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { supabase } from "../../Supabaseconfig";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";
import { Card } from "../../components/Card/Card";
import styles from './MeusPosts.module.css';
import { EditarEDeletar } from "../../components/EditarEDeletar/EditarEDeletar";
import { FotoPerfil } from "../../components/FotoPerfilGet/FotoPerfil";
import { VerMais } from "../../components/VerMais/VerMais";



export function MeusPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function requisitarMeusPosts() {
        try {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            toast("Error na requisição dos dados" + error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        requisitarMeusPosts();
    }, []);


    const handleDelete = async (postId) => {
        try {
            const { error } = await supabase
                .from("posts")
                .delete()
                .eq("id", postId);

            if (error) throw error;
            setPosts(posts.filter(post => post.id !== postId));
            toast("Seu post foi deletado!");
        } catch (error) {
            toast("Erro ao tentar deletar, verifique e tente novamente." + error.message);
        }
    }

    if (loading) return <LoadingOverlay />;

    return (
        <div className={styles.PrimeiroContainer}>
            <div className={styles.container}>

                {posts.length > 0 ? (posts.map((postado, index) => (

                    <Card className={styles.card} key={"post_" + index}>

                        <div className={styles.header}>
                            <div className={styles["container-header-perfil"]}>
                                <FotoPerfil className={styles.fotoPerfil} />
                                <div className={styles['container-header-titulo']}>
                                    <h2>Elaine Soares</h2>
                                </div>
                            </div>
                            <EditarEDeletar
                                className={styles.EditarEDeletar}
                                onDelete={() => handleDelete(postado.id)}
                                editar={`/editar/${postado.id}`}
                                visualizar={`/visualizar/${postado.id}`}
                            />
                        </div>

                        <div className={styles["container-imagem-postada"]}>
                            {postado.image_url && <img src={postado.image_url} alt="Imagem do post" className={styles.imagem} />}
                        </div>

                        {postado.tipo === "projeto" && (
                            <div className={styles.containerMensagem}>
                                <VerMais to={postado.id}>
                                    {postado.about}
                                </VerMais>
                            </div>
                        )}

                    </Card>
                ))) : (
                    <p className={styles.semPosts}>Nenhum post encontrado.</p>
                )}
            </div>
        </div>
    )
}