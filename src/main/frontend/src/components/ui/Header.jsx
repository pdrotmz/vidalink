import React from "react";
import { Link } from "react-router-dom"
import { Button } from "./Button"

export const Header = () => {
    return (
        <header className="header">
            <nav>
                <Link to="/">Inicio</Link>
                <Link to="/sobre">Sobre</Link>
                <Link to="/contato">Contato</Link>
                <Button variant="outline">Doar agora</Button>
            </nav>
        </header>
    );
};