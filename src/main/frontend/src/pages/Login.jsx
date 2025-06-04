import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import gif from '../Assets/images/gif_doacao.gif';

function Login() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8083/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail', credentials.email);

            // Redirecionamento baseado no domínio do e-mail
            if (credentials.email.endsWith('@vidalink.com.br')) {
                navigate('/ListagemProdutos');
            } else {
                navigate('/Perfil');
            }
        } else {
            alert('Credenciais inválidas');
        }
    };

    return (
        <div className="containerLogin">
            <div className='loginEsquerda'>
                <form onSubmit={handleSubmit}>
                    <h1>Bem vindo!</h1>

                    <div className='formulario'>
                        <label htmlFor="">E-mail:</label>
                        <br />
                        <input type="text" name="email" value={credentials.email} onChange={handleChange} />
                        <br /><br />

                        <label htmlFor="">Senha:</label>
                        <br />
                        <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                        <br />
                    </div>

                    <div className='botao'>
                        <button type="submit">Entrar</button>
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
