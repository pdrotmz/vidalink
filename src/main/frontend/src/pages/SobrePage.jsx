import React from "react";
import "../styles/SobrePage.css";
import logo from "../assets/images/logo-vidalink.png";
import { useNavigate } from "react-router-dom";

export function SobrePage() {
  const navigate = useNavigate();

  return (
    <div className="sobre-container">
      <img src={logo} alt="Logo" className="logo-img" />
      <div className="conteudo-central">
        <div className="topo-sobre">
          <button className="voltar-btn" onClick={() => navigate(-1)}>
            voltar
          </button>
          <h1 className="titulo">Sobre</h1>
          <div className="espaco-botao" />{" "}
          {/* Espaço invisível para equilibrar visualmente */}
        </div>
        <div className="sobre-texto">
          <p>
            Somos uma empresa especializada em pontuar nossos usuários por
            fazerem doação de sangue / órgãos.
          </p>
          <p>
            1- Nossa empresa possui parcerias com hospitais particulares, onde
            na doação em qualquer um dos locais parceiros, você, usuário,
            ganhará pontos.
          </p>
          <p>
            2- Os pontos são acumulativos, usados para descontos em exames ou
            procedimentos cirúrgicos no hospital parceiro.
          </p>
          <p>
            3- A comprovação de doação será feito através do comprovante que os
            próprios bancos de coleta emitem.
          </p>
          <p>
            4- O usuário fará um upload do comprovante dentro do site, aonde
            terá um prazo até a validação.
          </p>
        </div>
      </div>
    </div>
  );
}
