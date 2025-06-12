import React, { useState, useEffect } from 'react';
import '../styles/validarcomprovante.css';
import ModalComprovante from "../Components/ModalComprovante";
import AdmHeader from "../Components/AdmHeader.jsx";

const ValidarComprovante = () => {
  const [comprovantes, setComprovantes] = useState([]);
  const [comprovanteSelecionado, setComprovanteSelecionado] = useState(null);
  const token = localStorage.getItem("token");

  const carregarComprovantes = async () => {
    try {
      const res = await fetch("https://vidalink.onrender.com/submissions/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Erro ao buscar comprovantes");

      const data = await res.json();
      const adaptado = data.map((item) => ({
        id: item.id,
        userId: item.author?.id,
        userName: item.author?.username,
        submissionDate: item.createdAt,
        filePath: item.filePath,
      }));
      setComprovantes(adaptado);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    carregarComprovantes();
  }, []);

  const removerComprovante = (id) => {
    setComprovantes((prev) => prev.filter((c) => c.id !== id));
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
                {comprovantes.map((c) => (
                    <tr key={c.id}>
                      <td onClick={() => setComprovanteSelecionado(c)} className="user-name-cell">
                        {c.userName}
                      </td>
                      <td>{c.userId}</td>
                      <td>{new Date(c.submissionDate).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => setComprovanteSelecionado(c)} className="ver-detalhes-btn">
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
                  onClose={() => setComprovanteSelecionado(null)}
                  onRemover={removerComprovante}
              />
          )}
        </div>
      </div>
  );
};

export default ValidarComprovante;
