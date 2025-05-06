import React from 'react';
import '../Styles/validarcomprovante.css';
import AdmHeader from "../Components/AdmHeader";

const ValidarComprovante = () => {
  return (
    <div>
      <AdmHeader />

      <div className="container">
        <h1>Validação de Comprovante</h1>

        <div className="content">
          <div className="left-box">
            <img
              src="https://via.placeholder.com/800x1000?text=Comprovante"
              alt="Comprovante"
            />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidarComprovante;
