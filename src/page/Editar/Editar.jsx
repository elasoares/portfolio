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
import { supabase } from "../../Supabaseconfig";
import { UpLoadsImagens } from "../../components/UpLoadsImagens/UpLoadsImagens";
import { IoMdClose } from "react-icons/io";

export function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selecionarArquivo, setselecionarArquivo] = useState(null);
  const [saveTech, setSaveTech] = useState([]);
  const [changeTech, setChangeTech] = useState("");

  useEffect(() => {
    if (!id) {
      toast("Erro: dados do post não encontrado!");
      setLoading(false);
      return;
    }
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts").select("*").eq("id", id).single();
        if (error) throw error;
        if (data) {
          setEditando(data);
          setSaveTech(data.tecnologia || []);
        }
      } catch (error) {
        toast("Erro ao carregar o post: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <LoadingOverlay />;
  if (!editando) return <p>Post não encontrado!</p>;

  const schemaValidationForm = yup.object({
    title: yup.string().min(1).max(100).required("O campo de título não pode ficar vazio."),
    select: yup.string().required("O campo de selecionar o tipo não pode ficar vazio."),
    about: yup.string().required("O campo de mensagem não pode ficar vazio."),
    functionality: yup.string(),
    tecnologia: yup.array(),
    link: yup.string(),
    institute: yup.string().min(1).max(100),
    date: yup.string().min(1).max(50),
    hour: yup.string().min(1).max(20),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let imageUrl = editando.image_url;

      if (selecionarArquivo) {
        const fileName = `${Date.now()}_${selecionarArquivo.name}`;
        const { error: uploadError } = await supabase.storage
          .from("imagens").upload(fileName, selecionarArquivo);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from("imagens").getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      const { select, ...rest } = values;
      const updatedData = {
        ...rest,
        tipo: select,
        tecnologia: saveTech,
        image_url: imageUrl,
      };

      const { error } = await supabase
        .from("posts").update(updatedData).eq("id", id);
      if (error) throw error;

      toast("Edição realizada com sucesso!");
      navigate("/perfil");
    } catch (error) {
      toast("Erro ao atualizar o post: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveTech = (event) => {
    event.preventDefault();
    if (changeTech.trim() !== "" && !saveTech.includes(changeTech)) {
      setSaveTech([...saveTech, changeTech]);
      setChangeTech("");
    }
  };
  const deleteTecnology = (index) => {
    setSaveTech(saveTech.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          title: editando.title || "",
          select: editando.tipo || "",
          about: editando.about || "",
          functionality: editando.functionality || "",
          tecnologia: editando.tecnologia || [],
          link: editando.link || "",
          date: editando.date || "",
          hour: editando.hour || "",
          institute: editando.institute || "",
        }}
        validationSchema={schemaValidationForm}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, touched, errors, handleBlur, handleChange, values }) => (
          <Card className={styles.card}>
            <form onSubmit={handleSubmit} noValidate className={styles.formulario}>
              <div className={styles["container-header-editar"]}>
                <h2 className={styles.titulo}>Editar</h2>
                <IoMdClose className={styles.closedTech} onClick={() => navigate(-1)} />
              </div>

              <UpLoadsImagens onFileSelect={(file) => setselecionarArquivo(file)} />

              <fieldset>
                <TextField className={styles.textfield} name="title" type="text"
                  value={values.title} placeholder="Titulo"
                  onChange={handleChange} onBlur={handleBlur} />
              </fieldset>
              <p className={styles.errorFormk}>{touched.title && errors.title}</p>

              <fieldset>
                <select name="select" value={values.select} className={styles.textfield}
                  onChange={handleChange} onBlur={handleBlur}>
                  <option value="">Selecione o tipo de conquista</option>
                  <option value="certificado">Certificado</option>
                  <option value="projeto">Projeto</option>
                </select>
              </fieldset>
              <p className={styles.errorFormk}>{touched.select && errors.select}</p>

              {values.select === "certificado" && (
                <div>
                  <fieldset>
                    <TextField className={styles.textfield} name="institute" type="text"
                      value={values.institute} placeholder="Instituto"
                      onChange={handleChange} onBlur={handleBlur} />
                    <p className={styles.errorFormk}>{touched.institute && errors.institute}</p>
                  </fieldset>
                  <fieldset>
                    <TextField className={styles.textfield} name="date" type="text"
                      value={values.date} placeholder="Data"
                      onChange={handleChange} onBlur={handleBlur} />
                    <p className={styles.errorFormk}>{touched.date && errors.date}</p>
                  </fieldset>
                  <fieldset>
                    <TextField className={styles.textfield} name="hour" type="text"
                      value={values.hour} placeholder="Horas"
                      onChange={handleChange} onBlur={handleBlur} />
                    <p className={styles.errorFormk}>{touched.hour && errors.hour}</p>
                  </fieldset>
                </div>
              )}

              <fieldset>
                <TextField className={styles.textfield} name="link" type="text"
                  value={values.link} placeholder="Link para direcionamento"
                  onChange={handleChange} onBlur={handleBlur} />
              </fieldset>
              <fieldset>
                <textarea placeholder="Conte aqui sobre sua conquista"
                  value={values.about} name="about" id="about" rows="4" cols="20"
                  className={styles.textAreaMessagem}
                  onChange={handleChange} onBlur={handleBlur}></textarea>
              </fieldset>
              <fieldset>
                <textarea placeholder="Mencione as funcionalidades"
                  value={values.functionality} name="functionality" id="functionality"
                  rows="4" cols="20" className={styles.textAreaMessagem}
                  onChange={handleChange} onBlur={handleBlur}></textarea>
              </fieldset>
              <div className={styles.containerTech}>
                <fieldset className={styles.inputTech}>
                  <input type="text" placeholder="Adicione uma tecnologia"
                    value={changeTech}
                    onChange={(event) => setChangeTech(event.target.value)}
                    className={styles.textfieldTech} />
                  <Button type="button" onClick={handleSaveTech} className={styles.botaoTech}>
                    Adicionar tecnologia
                  </Button>
                </fieldset>
                <ul className={styles.techList}>
                  {saveTech.map((tech, index) => (
                    <li key={index} className={styles.techItem}>
                      {tech}{" "}
                      <button type="button" onClick={() => deleteTecnology(index)} className={styles.closedTech}>X</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles['container-envio-e-camera']}>
                <Button type="submit" className={styles.botao}>Enviar</Button>
              </div>
            </form>
          </Card>
        )}
      </Formik>
    </div>
  );
}