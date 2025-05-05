import React from "react";

/*import "../Styles/Login.css"*/

export const Login = () => {

    return (
        <div className="LoginContent"> 
            {/* Esquerda - Área vermelha */}
            <div className="left-panel">
                <h1>INDENTIFIQUE O SEU CPF</h1>
                <div className="form-container">
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" id="cpf" placeholder="DIGITE SEU CPF" />
                    <button>CONTINUAR</button>
                    <p><a href="#">Fazer Cadastro</a></p>
                </div>
            </div>

            {/* Direita - Área branca com imagem */}
            <div className="right-panel">
                <div className="image-container">
                    <img src="imagens/ChatGPT Image 31 de mar. de 2025, 19_21_19.png" alt="" />
                </div>
                <div className="logo-container">
                    {/* conteúdo da logo, se houver, pode ser inserido aqui */}
                </div>
            </div>
        </div>
        
    );
}

export default Login;








