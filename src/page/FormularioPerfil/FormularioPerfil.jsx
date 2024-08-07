import { useState } from "react";
import { Formik } from "formik";
import * as yup from 'yup';
import { Card } from "../../components/Card/Card";
import styles from './FormularioPerfil.module.css';
import { TextField } from "../../components/TextField/TextField";
import { dataBase, storage } from '../../firebaseConfig';
import { push, ref } from "firebase/database";
import { LoadingOverlay } from "../../Layout/LoadingOverlay";
import { Button } from "../../components/Button/Button";
import toast from "react-simple-toasts";
import { UpLoadsImagens } from "../../components/UpLoadsImagens/UpLoadsImagens";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function FormularioPerfil() {
  const [selecionarArquivo, setselecionarArquivo] = useState(null);
  const [imagem, setImagem] = useState(false);

  const schemaValidationForm = yup.object({
    subtitle: yup.string()
      .min(1, "O campo de subtítulo deve conter no mínimo um caractere.")
      .max(55, "O campo de subtítulo deve conter no máximo cinquenta e cinco caracteres.")
      .required("O campo de subtítulo não pode ficar vazio."),
    message: yup.string().required("O campo de mensagem não pode ficar vazio."),
  });

  const postar = async (values, { setSubmitting, resetForm }) => {
    if (!selecionarArquivo) {
      toast('Por favor, selecione uma imagem para enviar.');
      setSubmitting(false);
      return;
    }

    const { message, subtitle } = values;
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
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            const data = { message, subtitle, imageUrl: url };
            const refData = ref(dataBase, "/meu-post");
            await push(refData, data);
            toast("Post realizado com sucesso.");
            setSubmitting(false);
            resetForm();
            setselecionarArquivo(null);
            setImagem(true);
            setTimeout(() => setImagem(false), 1000);
          } catch (error) {
            toast("Erro ao realizar o post, verifique e tente novamente. " + error.message);
            setSubmitting(false);
          }
        }
      );
    } catch (error) {
      console.error("Erro no upload da imagem:", error);
      toast("Erro no upload da imagem, tente novamente.");
      setSubmitting(false);
    }
  };

  return (
    <Formik
      validationSchema={schemaValidationForm}
      initialValues={{
        subtitle: "",
        message: "",
      }}
      onSubmit={postar}>
      {({ handleBlur, handleChange, handleSubmit, values, touched, errors }) => (
        <Card className={styles.card}>
          <LoadingOverlay />
          <form onSubmit={handleSubmit} noValidate className={styles.formulario}>
            <h2 className={styles.titulo}>Compartilhe suas ideias</h2>
            <UpLoadsImagens onFileSelect={(file) => setselecionarArquivo(file)} clear={imagem} />
            <fieldset>
              <TextField
                className={styles.textfield}
                name="subtitle"
                type="text"
                value={values.subtitle}
                placeholder="Data"
                onChange={handleChange}
                onBlur={handleBlur} />
            </fieldset>
            <p className={styles.errorFormk}>
              {touched.subtitle && errors.subtitle}
            </p>
            <fieldset>
              <textarea
                placeholder="O que você está pensando?"
                value={values.message}
                name="message"
                id="message"
                rows="4"
                cols="20"
                className={styles.textAreaMessagem}
                onChange={handleChange}
                onBlur={handleBlur}>
              </textarea>
            </fieldset>
            <p className={styles.errorFormk}>
              {touched.message && errors.message}
            </p>
            <div className={styles[`container-envio-e-camera`]}>
              <Button type="submit" className={styles.botao}>Enviar</Button>
            </div>
          </form>
        </Card>
      )}
    </Formik>
  );
}
