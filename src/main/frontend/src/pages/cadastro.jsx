import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gif from '../Assets/images/gif_doacao.gif';
import '../styles/CadastroUsuarios.css';

export default function Cadastro() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8083/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/');
        } else {
            alert('Erro ao registrar. Verifique os dados.');
        }
    };

    return (
        <div className="containerCadastro">
            <div className='cadastroEsquerda'>
                <img src={gif} alt="" />
            </div>

            <div className='cadastroDireita'>
                <form onSubmit={handleSubmit}>
                    <h1>Bem vindo!</h1>

                    <div className='formulario'>
                        <label htmlFor="">Nome:</label>
                        <br />
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        <br /><br />

                        <label htmlFor="">E-mail:</label>
                        <br />
                        <input type="text" name="email" value={formData.email} onChange={handleChange} />
                        <br /><br />

                        <label htmlFor="">Senha:</label>
                        <br />
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        <br />
                    </div>

                    <div className='botao'>
                        <button type="submit">Cadastrar</button>
                        <p>Já tem conta? <Link to={"/Login"}>Entrar</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
