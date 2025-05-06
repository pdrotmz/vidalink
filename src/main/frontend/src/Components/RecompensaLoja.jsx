import React from "react";
import { Link } from "react-router-dom"
import "../Styles/RecompensaLoja.css"

import Certificado1 from "../Assets/images/certificado1.png"

export const recompensas = [
    { id: 1, 
    imagem: Certificado1,
    nome: "Primeira doação", 
    preco: "50", 
    },
]

export const RecompensaLoja = ({imagem, nome, preco, recompensaId}) => {

    const recompensa = recompensas.find((rep) => rep.id === recompensaId);

    if (!recompensa) {
        return <p>Recompensa não encontrada.</p>;
    }

    return (
        <li>
            <Link to={`/recompensa/${recompensa.id}`}>
                <img src={imagem} alt="" />
                <p className="nome">{nome}</p>
                <hr />
                <p className="preco">{preco} pts</p>
            </Link>
        </li>
    );
};

export default RecompensaLoja



/*

*/