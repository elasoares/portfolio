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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saveTech, setSaveTech] = useState([]);
  const [changeTech, setChangeTech] = useState("");
  const [certificadoClicado, setCertificado] = useState(false);

  const schemaValidationForm = yup.object({
    title: yup.string()
      .min(1, "O campo de título deve conter no mínimo um caractere.")
      .max(100, "O campo de título deve conter no máximo cem caracteres.")
      .required("O campo de título não pode ficar vazio."),
    select: yup.string()
      .required("O campo de selecionar o tipo não pode ficar vazio."),
    about: yup.string().required("O campo de mensagem não pode ficar vazio."),
    functionality: yup.string(),
    tecnologia: yup.string(),
    link: yup.string(),
    institute: yup.string()
    .min(1, "O campo instituto deve conter no mínimo um caractere.")
    .max(100, "O campo instituto deve conter no máximo cem caracteres."),
    date: yup.string()
    .min(1, "O campo data deve conter no mínimo um caractere.")
    .max(50, "O campo data deve conter no máximo ciquenta caracteres."),
    hour: yup.string()
    .min(1, "O campo hora deve conter no mínimo um caractere.")
    .max(20, "O campo hora deve conter no máximo vinte caracteres."),

  });

  const postar = async (values, { setSubmitting, resetForm }) => {
    if (!selecionarArquivo) {
      toast('Por favor, selecione uma imagem para enviar.');
      setSubmitting(false);
      return;
    }

    const { about, title, select, functionality, link, institute, date, hour  } = values;
    const fileName = selecionarArquivo.name;
    const storageReference = storageRef(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageReference, selecionarArquivo);
 try {
uploadTask.on(
  'state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress);
  },
  (error) => {
  console.error("Erro ao enviar imagem:", error);
},
  async () => {
    try {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      const data = { about, title, imageUrl: url, tecnologia: saveTech, functionality, select, link, institute, date, hour};
      const refData = ref(dataBase, "/meu-post");
      await push(refData, data);
      toast("Post realizado com sucesso.");
      setSubmitting(false);
      resetForm();
      setselecionarArquivo(null);
      setImagem(true);
      setTimeout(() => setImagem(false), 1000);
      setChangeTech("");
    }catch (error) {
    console.error("Erro ao salvar dados no Firebase:", error);
    toast("Erro ao realizar o post, verifique e tente novamente.");
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
    <Formik
      validationSchema={schemaValidationForm}
      initialValues={{
        title: "",
        select:"",
        about: "",
        functionality:"",
        tecnologia:"",
        link:"",
        date:"",
        hour:"",
        institute:"",
      }}
      onSubmit={postar}>
      {({ handleBlur, handleChange, handleSubmit, values, touched, errors }) => (
        <div className={styles.container}>
        <Card className={styles.card}>
          <LoadingOverlay />
          <form onSubmit={handleSubmit} noValidate className={styles.formulario}>
            <h2 className={styles.titulo}>Compartilhe suas conquistas!</h2>
            <UpLoadsImagens onFileSelect={(file) => setselecionarArquivo(file)} clear={imagem} />
            {uploadProgress > 0 && <progress value={uploadProgress} max="100">{uploadProgress}%</progress>}
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
              certificadoClicado && ( 
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
                  Add tecnologias
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
            <div className={styles[`container-envio-e-camera`]}>
              <Button type="submit" className={styles.botao}>  Enviar </Button>
            </div>
          </form>
        </Card>
        </div>
      )}
    </Formik>
  );
}
