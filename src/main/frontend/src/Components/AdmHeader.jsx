import React from "react";
import { Link } from "react-router-dom"
import "../Styles/AdmHeader.css"

export const AdmHeader = () => {
    return (
        <header className="admHeaderContent">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Loja</Link></li>
                    <li><Link to="/">Submeter</Link></li>
                    <li><Link to="/sobre">Sobre</Link></li>
                    <li><Link to="/contato">Contato</Link></li>
                </ul>
                
            </nav>
        </header>
    );
};

export default AdmHeader;