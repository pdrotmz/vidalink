import React, { useState, useEffect } from 'react';
import '../styles/validarcomprovante.css';
import ModalComprovante from "../Components/ModalComprovante";
import AdmHeader from "../Components/AdmHeader.jsx";

const ValidarComprovante = () => {
  const [comprovantes, setComprovantes] = useState([]);
  const [comprovanteSelecionado, setComprovanteSelecionado] = useState(null);

  const abrirModal = (comprovante) => {
    setComprovanteSelecionado(comprovante);
  };

  const fecharModal = () => {
    setComprovanteSelecionado(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8083/submissions/pending", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
        .then(res => res.json())
        .then(data => {
          const adaptado = data.map((item) => ({
            id: item.id,
            userId: item.author?.id,
            userName: item.author?.username,
            submissionDate: item.createdAt,
            filePath: item.filePath,
          }));

          setComprovantes(adaptado);
        })

        .catch(err => console.error("Erro ao buscar comprovantes pendentes", err));
  }, []);

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
                {comprovantes.map((c) => (
                    <tr key={c.id}>
                      <td onClick={() => abrirModal(c)} className="user-name-cell">
                        {c.userName}
                      </td>
                      <td>{c.userId}</td>
                      <td>{new Date(c.submissionDate).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => abrirModal(c)} className="ver-detalhes-btn">
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
              <ModalComprovante comprovante={comprovanteSelecionado} onClose={fecharModal} />
          )}
        </div>
      </div>
  );
};

export default ValidarComprovante;
