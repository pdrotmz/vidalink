import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "./pages/Home";
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


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/CadastroProdutos' element={<CadastroProdutos />} />
          <Route path='/Contato' element={<Contato />} />
          <Route path='/Doar' element={<Doar />} />
          <Route path='/ListagemProdutos' element={<ListagemProdutos />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Loja' element={<Loja />} />
          <Route path='/Perfil' element={<Perfil />} />
          <Route path='/Sobre' element={<Sobre />} />
          <Route path='/EditarPerfil' element={<EditarPerfil/>} />
          <Route path='/SubmeterComprovante' element={<SubmeterComprovante/>} />

          <Route path='/ValidarComprovante' element={<ValidarComprovante />} />

          <Route path='/Cadastro' element={<Cadastro />} />

          <Route path="/Recompensa/:id" element={<DetalhesRecompensa/>} />

          <Route path='/LoginCadastro' element={<LoginCadastro />} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;