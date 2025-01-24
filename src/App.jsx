import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./Layout/Layoutfile/Layout";
import { Contato } from "./page/Contato/Contato";
/* import { Sobre } from "./page/Sobre/Sobre"; */
import { HomePage} from './page/Home/HomePage';
import { SigningPage } from "./page/SignIn/SigningPage";
import "./App.css";
import { PerfilPage } from "./page/Perfil/PerfilPage";
import { Editar } from "./page/Editar/Editar";
import { FeedPage } from "./page/Feed/FeedPage";
import { ProjetosPages } from "./page/ProjetosPages";
import { Visualizar } from "./page/visualizar/Visualizar";
import { MeusPosts } from "./page/MeusPosts/MeusPosts";

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/projetos" element={<ProjetosPages />} />
{/*           <Route path="/sobre" element={<Sobre />} /> */}
          <Route path="/contate-me" element={<Contato />} />
          <Route path="/entrar" element={<SigningPage />} />
          <Route path="/perfil" element={<PerfilPage/>}/>
          <Route path="editar/:id" element={<Editar/>}/>
          <Route path="visualizar/:id" element={<Visualizar/>}/>
          <Route path="meu-post/:id" element={<MeusPosts/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
