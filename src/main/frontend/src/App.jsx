import { BrowserRouter, Route, Routes } from "react-router-dom";

// Páginas públicas
import Cadastro from "./pages/cadastro";
import Login from "./pages/Login";
import LoginCadastro from "./Components/LoginCadastro";
import Unauthorized from "./pages/Unauthorized";

// Páginas privadas (usuário autenticado)
import Contato from "./pages/Contato";
import Doar from "./pages/Doar";
import Home from "./pages/Home";
import Loja from "./pages/Loja";
import Perfil from "./pages/Perfil";
import Sobre from "./pages/Sobre";
import SubmeterComprovante from "./pages/SubmeterComprovante";

// Páginas privadas (admin)
import ListagemProdutos from "./pages/ListagemProdutos";
import ValidarComprovante from "./pages/validarcomprovante";

// Proteções de rota
import PrivateRoute from "./Components/PrivateRoute";
import ProtectedRoute from "./Components/ProtectedRoute";

// Estilos globais
import "./index.css";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas Públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/logincadastro" element={<LoginCadastro />} />

                {/* Rotas Privadas (usuário autenticado) */}
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/contato" element={<PrivateRoute><Contato /></PrivateRoute>} />
                <Route path="/doar" element={<PrivateRoute><Doar /></PrivateRoute>} />
                <Route path="/loja" element={<PrivateRoute><Loja /></PrivateRoute>} />
                <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
                <Route path="/sobre" element={<PrivateRoute><Sobre /></PrivateRoute>} />
                <Route path="/submetercomprovante" element={<PrivateRoute><SubmeterComprovante /></PrivateRoute>} />

                {/* Rotas Privadas (somente ADMIN) */}
                <Route path="/listagemprodutos" element={<ProtectedRoute><ListagemProdutos /></ProtectedRoute>} />
                <Route path="/validarcomprovante" element={<ProtectedRoute><ValidarComprovante /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
