import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Card } from '../../components/Card/Card';
import styles from './Editar.module.css';
import { TextField } from '../../components/TextField/TextField';
import { LoadingOverlay } from '../../Layout/LoadingOverlay';
import { Button } from '../../components/Button/Button';
import toast from 'react-simple-toasts';
import { axios } from '../../axios';
import { UpLoadsImagens } from "../../components/UpLoadsImagens/UpLoadsImagens";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { dataBase, storage } from '../../firebaseConfig';
import { ref, update } from "firebase/database";
import { IoMdClose } from "react-icons/io";


export function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selecionarArquivo, setselecionarArquivo] = useState(null);
  const[cancelar, setCancelar] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (id === undefined) {
        toast("Erro: dados do post não encontrado!");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/meu-post/${id}.json`);
        setEditando(response.data);
        setLoading(false);
      } catch (error) {
        toast("Erro ao carregar o post: " + error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!editando) {
    return <p>Post não encontrado!</p>;
  }

  const schemaValidationForm = yup.object({
    subtitle: yup.string()
      .min(1, "O campo de subtítulo deve conter no mínimo um caractere.")
      .max(25, "O campo de subtítulo deve conter no máximo vinte e cinco caracteres.")
      .required("O campo de subtítulo não pode ficar vazio."),
    message: yup.string().required("O campo de mensagem não pode ficar vazio."),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    let imageUrl = editando.imageUrl;

    if (selecionarArquivo) {
      const fileName = selecionarArquivo.name;
      const storageReference = storageRef(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageReference, selecionarArquivo);

      try {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Progresso do upload: ${progress}%`);
          },
          (error) => {
            throw error;
          },
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const updatedData = { ...values, imageUrl };
            await updatePostData(updatedData);
            setSubmitting(false);
          }
        );
      } catch (error) {
        console.error("Erro no upload da imagem:", error);
        toast("Erro no upload da imagem, tente novamente.");
        setSubmitting(false);
      }
    } else {
      await updatePostData(values);
      setSubmitting(false);
    }
  };



  const updatePostData = async (data) => {
    try {
      const refData = ref(dataBase, `/meu-post/${id}`);
      await update(refData, data);
      toast("Edição realizada com sucesso!");
      navigate("/perfil");
    } catch (error) {
      toast("Erro ao atualizar o post: " + error.message);
    }
  };


const cancelarEditacao =()=>{
  setCancelar(!cancelar);
}
/* const navegar =(destino)=>{
  navigate(destino);
} */


  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          subtitle: editando.subtitle,
          message: editando.message,
        }}
        validationSchema={schemaValidationForm}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, touched, errors, handleChange, values }) => (
          <Card className={styles.card}>
            <form onSubmit={handleSubmit} noValidate className={styles.formulario}>

              <div className={styles["container-header-editar"]}>
              <h2 className={styles.titulo}>Editar</h2>
              <IoMdClose
                className={`${cancelar ? navigate("/meu-post/:id") : ""} ${styles.cancelar}`}
                onClick={cancelarEditacao}
              />
              </div>
         



              <UpLoadsImagens onFileSelect={(file) => setselecionarArquivo(file)} />

              <fieldset>
                <TextField
                  className={styles.textfield}
                  name="subtitle"
                  type="text"
                  placeholder="Subtítulo"
                  value={values.subtitle}
                  onChange={handleChange}
                />
                <p className={styles.errorFormk}>
                  {touched.subtitle && errors.subtitle}
                </p>
              </fieldset>

              <fieldset>
                <textarea
                  placeholder="O que você está pensando?"
                  name="message"
                  id="message"
                  rows="4"
                  cols="20"
                  className={styles.textAreaMessagem}
                  value={values.message}
                  onChange={handleChange}
                />
                <p className={styles.errorFormk}>
                  {touched.message && errors.message}
                </p>
              </fieldset>

              <div className={styles['container-envio-e-camera']}>
                <Button type="submit" className={styles.botao} >
                  Enviar
                </Button>
              </div>
            </form>
          </Card>
        )}
      </Formik>
    </div>
  );
}


