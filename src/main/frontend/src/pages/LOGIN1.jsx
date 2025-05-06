import React from 'react';
import './login1.css';
import imagemPainel from './imagens/ChatGPT Image 31 de mar. de 2025, 19_21_19.png';
import logoVidaLink from './imagens/VidaLink (1) (1).png';

function Login() {
    return (
        <div className="container">
            <div className="left-panel">
                <h1>IDENTIFIQUE O SEU EMAIL</h1>
                <div className="form-container">
                    <label htmlFor="cpf">EMAIL</label>
                    <input type="text" id="cpf" placeholder="DIGITE SEU EMAIL" />
                    <button>CONTINUAR</button>
                    <p><a href="#">Fazer Cadastro</a></p>
                </div>
            </div>
            <div className="right-panel">
                <div className="image-container">
                    <img src={imagemPainel} alt="Imagem do painel" />
                </div>
                <div className="logo-container">
                    <img src={logoVidaLink} alt="Logo VidaLink" className="main-image" />
                </div>
            </div>
        </div>
    );
}

export default Login;
