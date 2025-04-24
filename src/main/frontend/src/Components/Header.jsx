import React from "react";
import { Link } from "react-router-dom"
import "../Styles/Header.css"

export const Header = () => {
    return (
        <header className="headerContent">
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/sobre">Sobre</Link></li>
                    <li><Link to="/contato">Contato</Link></li>
                </ul>
                
            </nav>
        </header>
    );
};

export default Header;