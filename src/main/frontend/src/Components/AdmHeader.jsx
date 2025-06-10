import React from "react";
import { Link } from "react-router-dom"
import "../styles/AdmHeader.css"

export const AdmHeader = () => {
    return (
        <header className="adm-header">
            <nav>
                <ul className="adm-header__nav-list">
                    <li className="adm-header__nav-item">
                        <Link to="/ValidarComprovante" className="adm-header__nav-link">Validação</Link>
                    </li>
                    <li className="adm-header__nav-item">
                        <Link to="/ListagemProdutos" className="adm-header__nav-link">Listagem</Link>
                    </li>
                </ul>
                
            </nav>
        </header>
    );
};

export default AdmHeader;