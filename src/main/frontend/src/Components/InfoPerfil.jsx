import React from "react";

import { Link } from "react-router-dom";

import "../styles/InfoPerfil.css"
import fotoperfil from "../Assets/images/perfildejhon.jpg"




export const InfoPerfil = () => {

    return (
        <div className="infoPerfilContainer">
            <div className="infoPerfilContent">
                <div className="perfil">
                    <img src={fotoperfil} alt="" />

                    <div className="textos">
                        <h2>Ian Caleb</h2>
                        <p>iancaleb@gmail.com</p>
                    </div>
                    
                </div>

                <button>Editar Perfil</button>
            </div>
        </div> 
        
    );
}

export default InfoPerfil;