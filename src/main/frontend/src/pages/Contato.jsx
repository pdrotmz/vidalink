import React from "react";
import { useNavigate } from "react-router-dom";

import "../Styles/Contato.css";

const Contato = () => {
  const navigate = useNavigate();

  return (
    <div className="contato-wrapper">
      <div className="contato-card">
        <button className="voltar-btn" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <h1 className="titulo">Contatos</h1>

        <div className="contato-texto">
          <p>Para entrar em contato com um dos hospitais, utilize os contatos diretos:</p>
          <ul>
            <li>Hospital São Lucas – <a href="tel:+558835111020">(88) 3511-1020</a></li>
            <li>Hospital Geral do Cariri – <a href="tel:+558835112055">(88) 3511-2055</a></li>
            <li>Hospital Nossa Senhora da Saúde – <a href="tel:+558835113088">(88) 3511-3088</a></li>
            <li>Hospital Santa Rita – <a href="tel:+558835114011">(88) 3511-4011</a></li>
            <li>Hospital Vida e Esperança – <a href="tel:+558835115099">(88) 3511-5099</a></li>
          </ul>

          <div className="contato-final">
            <p>Para entrar em contato conosco:</p>
            <a href="mailto:vidalink@suporte.com.br">vidalink@suporte.com.br</a>
            <span>(88) 3571-4052</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;
