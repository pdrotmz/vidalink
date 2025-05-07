import React from "react";

import { Link } from "react-router-dom";

import "../Styles/EditarPerfil.css"

import Header from "../Components/Header";

import fotoperfil from "../Assets/images/perfildejhon.jpg"




export const EditarPerfil = () => {

    return (
        <div className="EditarPerfilContainer">
            <Header/>
            <main>
                <div className="quadrado">

                <div className="perfil">
                    <img src= {fotoperfil} alt="Foto de perfil" className="foto-perfil"/>
                    
                    <div className="info-perfil-container">
                    <div className="info-e-botao">
                        <div className="info-perfil">
                        <p className="nome-perfil">José Hernesto da Silva</p>
                        <p className="email-perfil">josehernesto@unifap.edu.br</p>
                        <p className="sangue-perfil">O+</p>
                        </div>
                        <div className="botao-voltar-container">
                        <button className="botao-voltar">Editar Perfil</button>
                        </div>
                    </div>
                    </div>
                </div>

                
                <div className="caixa-edicao">
                    <div className="form-edicao">
                    <div className="campos-edicao">
                        <label>Nome:</label>
                        <input type="text" placeholder="Digite seu nome"/>

                        <label>Telefone:</label>
                        <input type="text" placeholder="Digite seu telefone"/>

                        <label>Email:</label>
                        <input type="email" placeholder="Digite seu email"/>
                    </div>

                    <div className="foto-edicao">
                        <div className="foto-preview"></div>
                        <button className="botao-adicionar-foto">Adicionar Foto</button>
                    </div>
                    </div>
                </div>

                </div>
            </main>
        </div> 
        
    );
}

export default EditarPerfil;