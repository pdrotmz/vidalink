import React from "react";
import { Link } from "react-router-dom"
import "../styles/AdmHeader.css"

export const AdmHeader = () => {
    return (
        <header className="admHeaderContent">
            <nav>
                <ul>
                    <li><Link to="/ValidarComprovante">Validação</Link></li>
                    <li><Link to="/ListagemProdutos">Listagem</Link></li>
                </ul>
                
            </nav>
        </header>
    );
};

export default AdmHeader;