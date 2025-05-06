import React from "react";
import { useNavigate } from "react-router-dom";

import "../Styles/Sobre.css";

const Sobre = () => {
  const navigate = useNavigate();

  return (
    <div className="sobre-wrapper">
      <div className="sobre-card">
        <button className="voltar-btn" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <h1 className="titulo">Sobre o VidaLink</h1>

        <div className="sobre-texto">
          <p>
            Somos uma empresa especializada em pontuar nossos usuários por fazerem doação de sangue ou órgãos.
          </p>
          <ul>
            <li>
              Temos parcerias com hospitais particulares. Ao doar em qualquer parceiro, você ganha pontos.
            </li>
            <li>
              Pontos acumulativos podem ser trocados por descontos em exames e procedimentos.
            </li>
            <li>
              A comprovação da doação é feita por meio de comprovantes emitidos pelos bancos de coleta.
            </li>
            <li>
              O usuário faz upload do comprovante e aguarda a validação dentro do sistema.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
