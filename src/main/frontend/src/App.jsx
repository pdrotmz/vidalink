import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "./Pages/Home";
import CadastroProdutos from "./Pages/CadastroProdutos";
import CadastroUsuarios from "./Pages/CadastroUsuarios";
import Contato from "./Pages/Contato";
import Doar from "./Pages/Doar";
import ListagemProdutos from "./Pages/ListagemProdutos";
import Login from './pages/Login';
import Loja from "./Pages/Loja";
import Principal from "./Pages/Principal";
import Sobre from "./Pages/Sobre";
import DetalhesRecompensa from './Pages/DetalhesRecompensa';
import Cadastro from './Pages/cadastro';
import ValidarComprovante from './Pages/validarcomprovante';

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
          <Route path='/Principal' element={<Principal />} />
          <Route path='/Sobre' element={<Sobre />} />

          <Route path='/ValidarComprovante' element={<ValidarComprovante />} />

          <Route path='/Cadastro' element={<Cadastro />} />
          <Route path='/CadastroUsuarios' element={<CadastroUsuarios />} />

          <Route path="/Recompensa/:id" element={<DetalhesRecompensa/>} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;