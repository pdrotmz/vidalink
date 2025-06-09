import React, { useState } from 'react';
import '../styles/validarcomprovante.css';
import ModalComprovante from "../Components/ModalComprovante";
import AdmHeader from "../Components/AdmHeader.jsx";

const ValidarComprovante = ({ comprovantes }) => {
  const [comprovanteSelecionado, setComprovanteSelecionado] = useState(null);

  const abrirModal = (comprovante) => {
    setComprovanteSelecionado(comprovante);
  };

  const fecharModal = () => {
    setComprovanteSelecionado(null);
  };

  return (
      <div className="admin-container">
        <AdmHeader />

        <div className="comprovantes-content">
          <div className="tabela-comprovantes-container">
            <h2>Comprovantes Submetidos</h2>
            <div className="tabela-wrapper">
              <table className="tabela-comprovantes">
                <thead>
                <tr>
                  <th>Nome do Usuário</th>
                  <th>ID</th>
                  <th>Data de Envio</th>
                  <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {(comprovantes || []).map((c) => (
                    <tr key={c.id}>
                      <td
                          onClick={() => abrirModal(c)}
                          className="user-name-cell"
                      >
                        {c.userName}
                      </td>
                      <td>{c.userId}</td>
                      <td>{new Date(c.submissionDate).toLocaleDateString()}</td>
                      <td>
                        <button
                            onClick={() => abrirModal(c)}
                            className="ver-detalhes-btn"
                        >
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>

          {comprovanteSelecionado && (
              <ModalComprovante
                  comprovante={comprovanteSelecionado}
                  onClose={fecharModal}
              />
          )}
        </div>
      </div>
  );
};

export default ValidarComprovante;
