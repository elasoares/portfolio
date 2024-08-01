import { Formik } from "formik";
import * as yup from "yup";
import { Card } from "../../components/Card/Card";
import { TextField } from "../../components/TextField/TextField";
import styles from './SigningPage.module.css'
import { Button } from "../../components/Button/Button";
import { auth } from "../../firebaseConfig";
import {  signInWithEmailAndPassword  } from "firebase/auth";
import {  useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";



const schema = yup.object({
  email: yup.string().email('O e-mail digitado está inválido.')
  .required('O campo e-mail não pode ficar vazio.'),
  password: yup
  .string()
  .min(6,'A senha tem que ter pelo menos 6 caracteres.')
  .max(10,'A senha tem que ter no máximo 10 caracteres.')
  .required('O campo de senha não pode ficar vazio.'),
})

export function SigningPage() {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        toast("Você está logado!", data);
        navigate("/perfil");
      })
      .catch((error) => {
        console.error('Erro ao logar:', error);
        alert("Erro ao logar. Verifique seu acesso!");
      });
  };





  return (
    <div>
      <Formik 
      validationSchema={schema}
      initialValues={{email:"", password:""}}
      onSubmit={handleLogin}
      >
{({handleBlur, handleChange, handleSubmit, touched, errors, values, isValid})=>(
  <Card className={styles.container}>
<form onSubmit={handleSubmit} noValidate  className={styles.formulario}>
<h2 className={styles.titulo}>Logar</h2>
<fieldset>
<TextField
 type='email'
 placeholder="Digite seu e-mail" 
name='email' 
value={values.email}
  onChange={handleChange}
  onBlur={handleBlur}
/>

</fieldset>
<p className={styles.errorFormk}>{touched.email && errors.email}</p>
<fieldset>
<TextField
 type='password'
 placeholder="Digite sua senha" 
name='password' 
value={values.password}
  onChange={handleChange}
  onBlur={handleBlur}
/>

</fieldset>
<p className={styles.errorFormk}>{touched.password && errors.password}</p>

<Button  className={`${styles.botao}`} type="submit" disabled={!isValid}>Entrar</Button>


</form>
</Card>
)}

      </Formik>
      
    </div>
  );
}
