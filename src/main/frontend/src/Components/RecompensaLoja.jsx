import React from "react";
import { Link } from "react-router-dom"
import "../Styles/RecompensaLoja.css"

import Certificado1 from "../Assets/images/certificado1.png"
import Certificado2 from "../Assets/images/certificado2.png"
import Certificado3 from "../Assets/images/certificado3.png"

export const recompensas = [
    { id: 1, 
    imagem: Certificado1,
    nome: "Primeira doação", 
    preco: "1", 
    },

    { id: 2, 
    imagem: Certificado2,
    nome: "Segunda doação", 
    preco: "10", 
    },

    { id: 3, 
    imagem: Certificado3,
    nome: "Terceira doação", 
    preco: "50", 
    },
]

export const RecompensaLoja = ({imagem, nome, preco, recompensaId}) => {

    const recompensa = recompensas.find((rec) => rec.id === recompensaId);

    if (!recompensa) {
        return <p>Recompensa não encontrada.</p>;
    }

    return (
        <li className="recompensaContent">
            <Link to={`/Recompensa/${recompensa.id}`}>
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