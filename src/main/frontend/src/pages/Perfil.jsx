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
        <div className="perfilContainer">
            <Header/>

            <div className="perfilContent">
                <div className="perfil"></div>
            </div>
        </div> 
        
    );
}

export default Perfil;