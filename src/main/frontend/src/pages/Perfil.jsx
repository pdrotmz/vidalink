import React from "react";

import { Link } from "react-router-dom";

// import "../Styles/Principal.css"

import Header from "../Components/Header";
import RecompensaPerfil from "../Components/RecompensaPerfil";

import InfoPerfil from "../Components/InfoPerfil";
import fotoperfil from "../Assets/images/perfildejhon.jpg"

import Certificado1 from "../Assets/images/certificado1.png"
import Certificado2 from "../Assets/images/certificado2.png"
import Certificado3 from "../Assets/images/certificado3.png"


export const Perfil = () => {

    return (
        <div className="perfilContainer">
            <Header/>

            <div className="perfilContent">
                <InfoPerfil/>

                <h1>Certificados:</h1>

                <ul>
                    <RecompensaPerfil imagem={Certificado1} nome={'Certificado1'} recompensaId={1}/>
                    <RecompensaPerfil imagem={Certificado2} nome={'Certificado1'} recompensaId={2}/>
                    <RecompensaPerfil imagem={Certificado3} nome={'Certificado1'} recompensaId={3}/>
                    <RecompensaPerfil imagem={Certificado1} nome={'Certificado1'} recompensaId={1}/>
                    <RecompensaPerfil imagem={Certificado1} nome={'Certificado1'} recompensaId={1}/>
                    <RecompensaPerfil imagem={Certificado1} nome={'Certificado1'} recompensaId={1}/>
                    
                    
                </ul>
            </div>
        </div> 
        
    );
}

export default Perfil;