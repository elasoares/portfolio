import { TextField } from "../../components/TextField/TextField";
import { Formik } from "formik";
import * as yup from "yup";
import { Button} from  '../../components/Button/Button';
import styles from "./Contato.module.css";
import { Card } from '../../components/Card/Card';
import toast from "react-simple-toasts";

import {dataBase} from '../../firebaseConfig.js'
import { push, ref } from "firebase/database";
import { LoadingOverlay } from "../../Layout/LoadingOverlay.jsx";



const signUpSchema = yup.object({
  name: yup
    .string()
    .min(2, "O campo nome precisa ter pelo menos dois caracteres.")
    .max(16, "O nome precisa ter até 16 caracteres.")
    .required("O campo nome não pode ficar vazio."),
  surname: yup
    .string()
    .min(2, "O campo sobrenome precisa ter pelo menos dois caracteres.")
    .max(24, "O campo sobrenome precisa ter até 24 caracteres.")
    .required("O campo sobrenome não pode ficar vazio."),
  opcao: yup.string().required("Selecione uma opção de interesse."),
  message: yup.string()
  .min(16, "O campo de mensagem precisa ter pelo menos 16 caracteres.")
  .max(104, "O campo de mensagem precisa ter até 104 caracteres.")
  .required("Por favor, escreva uma mensagem."),
  acceptTerms: yup.boolean().equals([true],"O campo termo não pode ficar vazio."),
});



export function Contato() {


  const addToFirebase = (values, {setSubmitting, resetForm})=>{
    const{name, surname, opcao, message} = values;
    const data = {name, surname, opcao, message};
    const mensagemRef = ref(dataBase, "/mensagens");
   push(mensagemRef, data)
   .then(()=>{
    toast("Sua mensagem foi enviada com sucesso!");
    setSubmitting(false);
    resetForm();
   }). catch((error)=>{
    toast("Erro ao enviar mensagem: " + error.message);
    setSubmitting(false);
   })
  }







  return (
    <div className={styles["primeiro-container"]}>
    <div className={styles.containerContato}>
    <div className={styles.textoContato}>
        <h2>Entre em Contato</h2>
        <p>
          Ficarei feliz em ouvir de você! Se você tiver alguma dúvida, sugestão,
          ou simplesmente quiser dizer olá, sinta-se à vontade para entrar em
          contato. Preencha o formulário ao lado e responderei o mais breve
          possível. Estou ansioso para conversar com você!
        </p>
      </div>
      <div className={styles.formContainer}>
      <Formik
        validationSchema={signUpSchema}
        initialValues={{
          name: "",
          surname: "",
          opcao: "",
          message: "",
          acceptTerms: false,
        }}
        onSubmit={addToFirebase}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          values,
          touched,
          
        }) => (
          <Card>
          <LoadingOverlay/>
            <form
              onSubmit={handleSubmit}
              noValidate
              className={styles.formulario}
            >
           
             
              <fieldset>
                <TextField
                  name="name"
                  type="text"
                  placeholder="Digite seu nome"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
             
              </fieldset>

              <p className={styles.errorFormk}>
                  {touched.name && errors.name}
                </p>
                
              <fieldset>
                <TextField
                  name="surname"
                  type="text"
                  placeholder="Digite seu sobrenome"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.surname}
                />
              
              </fieldset>
              <p className={styles.errorFormk}>
                  {touched.surname && errors.surname}
                </p>

              <fieldset>
                <select
                  name="opcao"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={styles.selectStyle}
                >
                  <option value="">
                  Escolha uma opção de interesse
                  </option>
                  <option value="estagio">
                    Estágio 
                  </option>
                  <option value="junior">
                    Júnior 
                  </option>
                  <option value="outros">Outros </option>
                </select>
               
              </fieldset>
              <p className={styles.errorFormk}>
                  {touched.opcao && errors.opcao}
                </p>


              <fieldset>
                <textarea
                  name="message"
                  id="message"
                  rows="2"
                  cols="27"
                  placeholder="Escreva sua mensagem aqui"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  className={styles.textAreaMessagem}
                ></textarea>
               
              </fieldset>
              <p className={styles.errorFormk}>
                  {touched.message && errors.message}
                </p>


              <fieldset className={styles["termo-container"]}>
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={values.acceptTerms}
                  onChange={handleChange}
                  className={styles["input-termo"]}
                /> 
                 <label htmlFor="acceptTerms" className={styles.termStyles}>
                  Para continuar, você deverá preencher o campo, conforme
                  <a className={styles.termLinkStyles} href="https://caiogondim.github.io/piao-da-casa-propria-em-css-3d/">
                    termo de contrato.
                  </a>
                </label> 
              
               </fieldset>
              <p className={styles.errorFormk}>
                  {touched.acceptTerms && errors.acceptTerms}
                </p> 
              <Button
                className={styles.botao}
                type="submit"
              >
                Enviar
              </Button>
            </form>
          </Card>
        )}
      </Formik>
    </div>
    </div>
    </div>
  );
}
