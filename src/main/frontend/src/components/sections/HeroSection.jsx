import React from "react";
import bloodDrop from "../../assets/images/blood-drop.png"
import { Button } from "../ui/Button";

export const HeroSection = () => {
    return (
        <section className="hero">
            <img src="{bloodDrop}" alt="Icone de gota de sangue" />
            <h1>Doe sangue, Salve vidas</h1>
            <p>Sua doação pode trazer esperança e cura para aqueles que precisam.</p>
            <Button>Doar agora</Button>
        </section>
    );
};
