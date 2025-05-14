import React from "react";

import { Link } from "react-router-dom";

import "../Styles/Principal.css"

import Header from "../Components/Header";

import fotoperfil from "../Assets/images/perfildejhon.jpg"

import certificado1 from "../Assets/images/certificado1.png"

import certificado2 from "../Assets/images/certificado2.png"

import certificado3 from "../Assets/images/certificado3.png"


export const Perfil = () => {

    return (
        <div className="PerfilContainer">
            <Header/>

            <main>
                <div className="quadrado">

                
                <div className="perfil">
                    <img src={fotoperfil} alt="Foto de perfil" className="foto-perfil"/>
                    
                    <div className="info-perfil-container">
                    <div className="info-e-botao">
                        <div className="info-perfil">
                        <p className="nome-perfil">José Hernesto da Silva</p>
                        <p className="email-perfil">josehernesto@unifap.edu.br</p>
                        <p className="sangue-perfil">O+</p>
                        </div>
                        <div className="botao-voltar-container">
                        <Link to= {"/Recompensa"}> <button className="botao-voltar"> Editar Perfil</button></Link>
                    
                        </div>
                    </div>
                    </div>
                </div>

                
                <h2 className="titulo-quadrado">HISTÓRICO DE DOAÇÃO</h2>
                <ul>
                    <li><p className="historico-item">10 de janeiro de 2024, doação de sangue no hospital São Lucas</p></li>
                    <li><p className="historico-item">20 de março de 2024, doação de sangue no hospital São José</p></li>
                    <li><p className="historico-item">14 de setembro de 2024, doação de sangue no Hospital Santa Maria</p></li>
                    <li><p className="historico-item">07 de janeiro de 2025, doação de sangue no Hospital Santa Cecília</p></li>
                    <li><p className="historico-item">07 de janeiro de 2025, doação de sangue no Hospital Santa Cecília</p></li>
                    <li><p className="historico-item">07 de janeiro de 2025, doação de sangue no Hospital Santa Cecília</p></li>
                    <li><p className="historico-item">07 de janeiro de 2025, doação de sangue no Hospital Santa Cecília</p></li>
                    </ul>
                

                
                <h2 className="titulo-quadrado">CERTIFICADOS</h2>
                <div className="certificados">
                    <img src={certificado1} alt="Certificado 1" className="certificado-img"/>
                    <img src={certificado2} alt="Certificado 2" className="certificado-img"/>
                    <img src={certificado3} alt="Certificado 3" className="certificado-img"/>
                </div>

                </div>
            </main>
        </div> 
        
    );
}

export default Perfil;