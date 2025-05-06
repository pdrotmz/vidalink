import React from 'react';
import '../assets/cadastro.css'; 

export default function Cadastro() {
    return (
        <div className="page">
            <h2 className="titulo">
                Salve vidas com um simples gesto! Cadastre-se<br />
                e faça a diferença na vida de quem precisa.
            </h2>

            <div className="container">
                <form>
                    <div className="form-group">
                        <input type="text" placeholder="Nome Completo" required />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Senha" required />
                    </div>
                    <p className="terms">
                        <img src="imagens/question.png" alt="" className="terms-icone" />
                        Ao clicar no botão cadastre-se você aceita os <strong>Termos de Uso e Privacidade</strong>
                    </p>
                    <button className="button" type="submit">CADASTRAR</button>
                </form>
            </div>
        </div>
    );
}
