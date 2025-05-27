import React from 'react';
import { Link } from 'react-router-dom';

import gif from '../Assets/images/gif_doacao.gif'
import '../styles/CadastroUsuarios.css'; 

export default function Cadastro() {
    return (
        <div className="containerCadastro">

            <div className='cadastroEsquerda'>
                <img src={gif} alt="" />

            </div>

            <div className='cadastroDireita'>
                <form action="">
                    <h1>Bem vindo!</h1>

                    <div className='formulario'>
                        <label htmlFor="">Nome:</label>
                        <br />
                        <input type="text" />
                        <br /><br />

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
                        <button>Cadastrar</button>

                        <p>Já tem conta? <Link to={"/Login"}>Entrar</Link></p>
                    </div>
                    
                </form>
                

            </div>
            
        </div>
    );
}
