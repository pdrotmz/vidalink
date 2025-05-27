import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Login.css';
import gif from '../Assets/images/gif_doacao.gif'


function Login() {
    return (
        <div className="containerLogin">
            <div className='loginEsquerda'>
                <form action="">
                    <h1>Bem vindo!</h1>

                    <div className='formulario'>
                        <label htmlFor="">E-mail:</label>
                        <br />
                        <input type="text" />
                        <br /><br />

                        <label htmlFor="">Senha:</label>
                        <br />
                        <input type="text" />
                        <br />
                    </div>

                    <div className='botao'>
                        <button>Entrar</button>

                        <p>Não tem conta? <Link to={"/Cadastro"}>cadastre-se</Link></p>
                    </div>
                    
                </form>
                

            </div>

            <div className='loginDireita'>
                <img src={gif} alt="" />

            </div>
            
        </div>
    );
}

export default Login;



