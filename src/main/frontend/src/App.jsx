import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "./pages/Home.jsx";
import CadastroProdutos from "./pages/CadastroProdutos";
import Contato from "./pages/Contato";
import Doar from "./pages/Doar";
import ListagemProdutos from "./pages/ListagemProdutos";
import Login from './pages/Login';
import Loja from "./pages/Loja";
import Perfil from "./pages/Perfil";
import Sobre from "./pages/Sobre";
import DetalhesRecompensa from './pages/DetalhesRecompensa';
import Cadastro from './pages/cadastro';
import ValidarComprovante from './pages/validarcomprovante';
import EditarPerfil from './pages/EditarPerfil';
import SubmeterComprovante from './pages/SubmeterComprovante';

import LoginCadastro from './Components/LoginCadastro';

import "../src/index.css";
import "../src/App.css"
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Contato" element={<Contato />} />
          <Route path="/Doar" element={<Doar />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Loja" element={<Loja />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/EditarPerfil" element={<EditarPerfil />} />
          <Route path="/SubmeterComprovante" element={<SubmeterComprovante />} />
          <Route path="/Recompensa/:id" element={<DetalhesRecompensa />} />
          <Route path="/LoginCadastro" element={<LoginCadastro />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* 🔐 ROTAS PROTEGIDAS */}
          <Route
              path="/CadastroProdutos"
              element={
                <ProtectedRoute>
                  <CadastroProdutos />
                </ProtectedRoute>
              }
          />
          <Route
              path="/ListagemProdutos"
              element={
                <ProtectedRoute>
                  <ListagemProdutos />
                </ProtectedRoute>
              }
          />
          <Route
              path="/ValidarComprovante"
              element={
                <ProtectedRoute>
                  <ValidarComprovante />
                </ProtectedRoute>
              }
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;