import { HashRouter , Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./Layout/Layoutfile/Layout";
import { Contato } from "./page/Contato/Contato";
import { Certificado } from "./page/Certificado/Certificado";
import { HomePage} from './page/Home/HomePage';
import { SigningPage } from "./page/SignIn/SigningPage";
import "./App.css";
import { PerfilPage } from "./page/Perfil/PerfilPage";
import { Editar } from "./page/Editar/Editar";
import { Visualizar } from "./page/visualizar/Visualizar";
import { MeusPosts } from "./page/MeusPosts/MeusPosts";
import { ProjetoPage } from "./page/ProjetoPage/ProjetoPage";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
        <Route path="/" element={<HomePage />}  />
          <Route path="/home" element={<HomePage />} />
          <Route path="/projetos" element={<ProjetoPage />} />
          <Route path="/certificado" element={<Certificado />} />
          <Route path="/contate-me" element={<Contato />} />
          <Route path="/entrar" element={<SigningPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="/visualizar/:id" element={<Visualizar />} />
          <Route path="/meu-post/:id" element={<MeusPosts />} />
        </Routes>
      </Layout>
    </HashRouter>

  );
}

export default App;
