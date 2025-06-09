import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home.jsx";
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
import PrivateRoute from "./Components/PrivateRoute.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Públicas */}
                <Route path="/Login" element={<Login />} />
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/LoginCadastro" element={<LoginCadastro />} />

                {/* Privadas (qualquer usuário logado) */}
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/Contato" element={<PrivateRoute><Contato /></PrivateRoute>} />
                <Route path="/Doar" element={<PrivateRoute><Doar /></PrivateRoute>} />
                <Route path="/Loja" element={<PrivateRoute><Loja /></PrivateRoute>} />
                <Route path="/Perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
                <Route path="/Sobre" element={<PrivateRoute><Sobre /></PrivateRoute>} />
                <Route path="/EditarPerfil" element={<PrivateRoute><EditarPerfil /></PrivateRoute>} />
                <Route path="/SubmeterComprovante" element={<PrivateRoute><SubmeterComprovante /></PrivateRoute>} />
                <Route path="/Recompensa/:id" element={<PrivateRoute><DetalhesRecompensa /></PrivateRoute>} />

                {/* Privadas (apenas ADMIN) */}
                <Route path="/ListagemProdutos" element={<ProtectedRoute><ListagemProdutos /></ProtectedRoute>} />
                <Route path="/ValidarComprovante" element={<ProtectedRoute><ValidarComprovante /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
