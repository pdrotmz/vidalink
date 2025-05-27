import React from "react";
import { Link } from "react-router-dom"
import "../styles/Header.css"

export const Header = () => {
    return (
        <header className="headerContent">
            <nav>
                <ul>
                    <li><Link to="/Perfil">Perfil</Link></li>
                    <li><Link to="/Loja">Loja</Link></li>
                    <li><Link to="/SubmeterComprovante">Submeter</Link></li>
                    <li><Link to="/Sobre">Sobre</Link></li>
                    <li><Link to="/Contato">Contato</Link></li>
                </ul>
                
            </nav>
        </header>
    );
};

export default Header;