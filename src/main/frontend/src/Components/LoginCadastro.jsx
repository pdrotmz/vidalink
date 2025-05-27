import React, { useState } from 'react';
import '../styles/LoginCadastro.css';
import gif from '../Assets/images/gif_doacao.gif';

function LoginCadastro() {
    const [isCadastroAtivo, setIsCadastroAtivo] = useState(false);

    const toggleOverlay = () => {
        setIsCadastroAtivo(prev => !prev);
    };

    return (
        <div className="containerLoginCadastro">
            <div className={`formContainer ${isCadastroAtivo ? 'mover' : ''}`} id="formContainer">
                <form action="" className='form-login'>
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
                        <button type="button">Entrar</button>

                        <p>Não tem conta? 
                            <span 
                                onClick={toggleOverlay} 
                                id="abrirCadastro" 
                                style={{ color: '#ef2558', cursor: 'pointer', marginLeft: '5px' }}
                            >
                                Cadastre-se
                            </span>
                        </p>
                    </div>
                </form>

                <form action="" className='form-cadastro'>
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
                        <br /><br />
                    </div>

                    <div className='botao'>
                        <button type="button">Cadastrar</button>

                        <p>Já tem conta? 
                            <span 
                                onClick={toggleOverlay} 
                                id="abrirLogin" 
                                style={{ color: '#ef2558', cursor: 'pointer', marginLeft: '5px' }}
                            >
                                Entrar
                            </span>
                        </p>
                    </div>
                </form>

                <div className='overlayContainer'>
                    <div className='overlay'>
                        <img src={gif} alt=""/>
                    </div>
                    
                    <div className='overlay'>
                        <img src={gif} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginCadastro;