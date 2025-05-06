import React from "react";
import { Link } from "react-router-dom"
import "../Styles/AdmHeader.css"

export const AdmHeader = () => {
    return (
        <header className="admHeaderContent">
            <nav>
                <ul>
                    <li><Link to="/">Validação</Link></li>
                    <li><Link to="/ListagemProdutos">Listagem</Link></li>
                    <li><Link to="/CadastroProdutos">Cadastro</Link></li>
                </ul>
                
            </nav>
        </header>
    );
};

export default AdmHeader;