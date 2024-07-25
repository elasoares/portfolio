import  { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Card } from '../../components/Card/Card';
import { VscSend } from 'react-icons/vsc';
import { IoCameraOutline } from 'react-icons/io5';
import styles from './Editar.module.css';
import { TextField } from '../../components/TextField/TextField';
import { LoadingOverlay } from '../../Layout/LoadingOverlay';
import { Button } from '../../components/Button/Button';
import toast from 'react-simple-toasts';
import {axios} from '../../axios';

export function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(true);

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
    title: yup.string()
      .min(1, "O campo de título deve conter no mínimo um caractere.")
      .max(25, "O campo de título deve conter no máximo vinte e cinco caracteres.")
      .required("O campo de título não pode ficar vazio."),
    subtitle: yup.string()
      .min(1, "O campo de subtítulo deve conter no mínimo um caractere.")
      .max(25, "O campo de subtítulo deve conter no máximo vinte e cinco caracteres.")
      .required("O campo de subtítulo não pode ficar vazio."),
    message: yup.string().required("O campo de mensagem não pode ficar vazio."),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(`/meu-post/${id}.json`, values);
      setSubmitting(false);
      toast("Editação realizada com sucesso!");
      navigate("/perfil");
    } catch (error) {
      toast("Erro ao atualizar o post: " + error.message);
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          title: editando.title,
          subtitle: editando.subtitle,
          message: editando.message,
        }}
        validationSchema={schemaValidationForm}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, touched, errors, handleChange, values }) => (
          <Card className={styles.card}>
            <form onSubmit={handleSubmit} noValidate className={styles.formulario}>
              <h2 className={styles.titulo}>Editar</h2>

              <fieldset>
                <TextField
                  className={styles.textfield}
                  name="title"
                  type="text"
                  placeholder="Título"
                  value={values.title}
                  onChange={handleChange}
                />
                <p className={styles.errorFormk}>
                  {touched.title && errors.title}
                </p>
              </fieldset>

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
                <IoCameraOutline className={styles.botao} />
                <Button type="submit" className={styles['botao-container']} >
                  <VscSend className={styles.botao} />
                </Button>
              </div>
            </form>
          </Card>
        )}
      </Formik>
    </div>
  );
}

export default Editar;
