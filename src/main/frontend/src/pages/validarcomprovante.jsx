import React from 'react';
import '../styles/validarcomprovante.css';
import AdmHeader from "../Components/AdmHeader";


import teste from "../Assets/images/logoVidaLink.png"

const ValidarComprovante = () => {
  return (
    <div>
      <AdmHeader />

      <div className="validacaoContent">
        
        <div className="left-box">
          <h1>Validação de Comprovante</h1>
          <figure>
            <img src={teste} alt="" />
          </figure>
        </div>

        <div className="right-box">
          <div className="info">
            <p>
              <b>Nome do usuário:</b> Artur Braga
            </p>
            <p>
              <b>ID do usuário:</b> 235284920
            </p>
            <p>
              <b>Data de envio:</b> 01.01.2025
            </p>
          </div>

          <div className="buttons">
            <button className="reprovar">Reprovar</button>
            <button className="aprovar">Aprovar</button>
            <button className='anterior'>&lt;</button>
            <button className='proximo'>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidarComprovante;
