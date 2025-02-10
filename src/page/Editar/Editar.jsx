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
  const [saveTech, setSaveTech] = useState([]);
  const [changeTech, setChangeTech] = useState("");
  const [setCertificado] = useState(false);


  useEffect(() => {
    if (!id) {
      toast("Erro: dados do post não encontrado!");
      setLoading(false);
      return;
    }
    
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/meu-post/${id}.json`);
        if(response.data){
        setEditando(response.data);
        setSaveTech(response.data.tecnologia  || [])
      }
    } catch (error) {
      toast("Erro ao carregar o post: " + error.message);
      setLoading(false);
    } finally{
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
    let imageUrl = editando.imageUrl;
    const updatedData = {... values, tecnologia: saveTech};

    if (selecionarArquivo) {
      try {
        const fileName = selecionarArquivo.name;
        const storageReference = storageRef(storage, `images/${fileName}`);
        const uploadTask = uploadBytesResumable(storageReference, selecionarArquivo);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Progresso do upload: ${progress}%`);
          },
          (error) => {
            console.error("Erro no upload da imagem:", error);
            toast("Erro no upload da imagem, tente novamente.");
            setSubmitting(false);
          },
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            updatedData.imageUrl = imageUrl;
            await updatePostData(updatedData);
            setSubmitting(false);
          }
        );
      } catch (error) {
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



  const handleSaveTech = (event) => {
    event.preventDefault();
    if (changeTech.trim() !== "" && !saveTech.includes(changeTech)) {
      setSaveTech([...saveTech, changeTech]);
      setChangeTech(""); 
    }
  };
  const deleteTecnology = (index) =>{
    setSaveTech( saveTech.filter((_, i) => i !== index))
  }

  const handleSelectChange = (event) =>{
    const value = event.target.value;
    if(value === "certificado"){
      setCertificado(true);
    }else{
      setCertificado(false);
    }
  }

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
        title: editando.title,
        select:editando.select,
        about: editando.about,
        functionality:editando.functionality,
        tecnologia:editando.tecnologia,
        link:editando.link,
        date:editando.date,
        hour:editando.hour,
        institute:editando.institute,
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
                            <TextField
                              className={styles.textfield}
                              name="title"
                              type="text"
                              value={values.title}
                              placeholder="Titulo"
                              onChange={handleChange}
                              onBlur={handleBlur} />
                          </fieldset>
                          <p className={styles.errorFormk}>
                            {touched.title && errors.title}
                          </p>
                          <fieldset>
                          <select 
                            name="select" 
                            value={values.select} 
                            className={styles.textfield}
                            onChange={(e) => {handleChange(e); handleSelectChange(e);}}
                            onBlur={handleBlur}>
                            <option value="">Selecione o tipo de conquista</option>
                            <option value="certificado">Certificado</option>
                            <option value="projeto">Projeto</option>
                          </select>
                          </fieldset>
                          <p className={styles.errorFormk}>{touched.select && errors.select}</p>
              
                          {
                            editando.select === "certificado" && ( 
                              <div>
                                <fieldset>
                                  <TextField
                                    className={styles.textfield}
                                    name="institute"
                                    type="text"
                                    value={values.institute}
                                    placeholder="Instituto"
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                  <p className={styles.errorFormk}>
                                    {touched.institute && errors.institute}
                                </p>
                                </fieldset>
                                <fieldset>
                                  <TextField
                                    className={styles.textfield}
                                    name="date"
                                    type="text"
                                    value={values.date}
                                    placeholder="Data"
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                  <p className={styles.errorFormk}>
                                    {touched.date && errors.date}
                                </p>
                                </fieldset>
                                <fieldset>
                                  <TextField
                                    className={styles.textfield}
                                    name="hour"
                                    type="text"
                                    value={values.hour}
                                    placeholder="Horas"
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                  <p className={styles.errorFormk}>
                                    {touched.hour && errors.hour}
                                </p>
                                </fieldset>
                              </div>
                              )
                            }  
              
                          <fieldset>
                            <TextField
                              className={styles.textfield}
                              name="link"
                              type="text"
                              value={values.link}
                              placeholder="Link para direcionamento"
                              onChange={handleChange}
                              onBlur={handleBlur} />
                          </fieldset>
              
                          <fieldset>
                            <textarea
                              placeholder="Conte aqui sobre sua conquista"
                              value={values.about}
                              name="about"
                              id="about"
                              rows="4"
                              cols="20"
                              className={styles.textAreaMessagem}
                              onChange={handleChange}
                              onBlur={handleBlur}>
                            </textarea>
                          </fieldset>
                          <fieldset>
                            <textarea
                              placeholder="Mencione as funcionalidades"
                              value={values.functionality}
                              name="functionality"
                              id="functionality"
                              rows="4"
                              cols="20"
                              className={styles.textAreaMessagem}
                              onChange={handleChange}
                              onBlur={handleBlur}>
                            </textarea>
                          </fieldset>
                          <div className={styles.containerTech}>
                              <fieldset className={styles.inputTech}>
                                <input
                                  type="text"
                                  placeholder="Adicione uma tecnologia"
                                  value={`${values.tecnologia} ${changeTech}`}
                                  onChange={(event) => setChangeTech(event.target.value)}
                                  className={styles.textfieldTech}
                                />
                                <Button type="button" onClick={handleSaveTech} className={styles.botaoTech}>
                                Adicionar tecnologia
                                </Button>
                              </fieldset>
                            <ul className={styles.techList}>
                              {saveTech.map((tech, index) => (
                                <li key={index} className={styles.techItem}>
                                  {tech}{" "}
                                  <button type="button" onClick={() => deleteTecnology(index)} className={styles.closedTech}>
                                    X
                                  </button>
                                </li>
                              ))}
                            </ul> 
                          </div>
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


