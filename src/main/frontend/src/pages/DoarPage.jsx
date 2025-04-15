import React from "react";
import "../styles/DoarPage.css";
import logo from "../assets/images/logo-vidalink.png";
import { useNavigate } from "react-router-dom";

const ContatoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="doar-container">
      <img src={logo} alt="Logo VidaLink" className="logo-img" />
      <div className="conteudo-central">
        <div className="topo-doar">
          <button className="voltar-btn" onClick={() => navigate(-1)}>
            voltar
          </button>
          <h1 className="titulo">Doar 1ª vez</h1>
          <div className="espaco-botao" />
        </div>

        <div className="doar-texto">
          <p>
            Veja aqui alguns motivos que podem impedir temporariamente sua doação
          </p>
          <ul>
            <li>
                1. Principais gripes, viroses e sintomas das vias aéreas
            </li>
            <li>
                2. Qualquer procedimento endoscópico (endoscopia digestiva alta, colonoscopia, etc);
            </li>
            <li>
                3. Realização de tatuagem / maquiagem definitiva / micropigmentação;
            </li>
            <li>
                4. Piercing em região de mucosas (nasal, oral e em genitália);
            </li>
            <li>
                5. Botox, preenchimentos, intradermoterapia (aplicação de enzimas);
            </li>
            <li>
                6. Acupuntura;
            </li>
            <li>
                    7.Bebidas alcóolicas;
            </li>
            <li>
                8.Extração dentária;
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContatoPage;
