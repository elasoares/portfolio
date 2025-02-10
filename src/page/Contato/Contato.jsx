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
import { GrSend } from "react-icons/gr";



const signUpSchema = yup.object({
  name: yup
    .string()
    .min(2, "O campo nome precisa ter pelo menos dois caracteres.")
    .max(26, "O nome precisa ter até 26 caracteres.")
    .required("O campo nome não pode ficar vazio."),
  email: yup
    .string()
    .email("Digite um e-mail válido.")
    .required("O campo e-mail não pode ficar vazio."),
  subject: yup
  .string()
  .min(5, "O campo assunto precisa ter pelo menos 5 caracteres.")
  .max(200, "O campo assunto precisa no máximo dozentos caracteres.")
  .required("O campo assunto não pode ficar vazio."),
  message: yup.string()
  .min(6, "O campo de mensagem precisa ter pelo menos 6 caracteres.")
  .max(104, "O campo de mensagem precisa ter até 104 caracteres.")
  .required("Por favor, escreva uma mensagem."),
  acceptTerms: yup.boolean().equals([true],"O campo termo não pode ficar vazio."),
});



export function Contato() {


  const addToFirebase = (values, {setSubmitting, resetForm})=>{
    const{name, email, subject, message} = values;
    const data = {name, email, subject, message};
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
  
      <div className={styles.formContainer}>


      <Formik
        validationSchema={signUpSchema}
        initialValues={{
          name: "",
          email: "",
          subject: "",
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
              className={` ${styles.formulario}`}
            >

            <h2 className={styles.titulo}>Contato</h2>
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
                  name="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              
              </fieldset>
              <p className={styles.errorFormk}>
                  {touched.email && errors.email}
                </p>
              <fieldset>
                <TextField
                  name="subject"
                  type="text"
                  placeholder="Digite o assunto"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subject}
                />
              
              </fieldset>
              <p className={styles.errorFormk}>
                  {touched.subject && errors.subject}
                </p>

              <fieldset>
                <textarea
                  name="message"
                  id="message"
                  rows="3"
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
                Enviar mensagem
                <GrSend/>
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
