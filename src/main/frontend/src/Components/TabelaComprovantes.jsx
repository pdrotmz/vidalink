import React, { useState } from "react";
import "../styles/TabelaComprovantes.css";
import ModalComprovante from "./ModalComprovante";

const TabelaComprovantes = ({ comprovantes }) => {
    const [comprovanteSelecionado, setComprovanteSelecionado] = useState(null);

    const abrirModal = (comprovante) => {
        setComprovanteSelecionado(comprovante);
    };

    const fecharModal = () => {
        setComprovanteSelecionado(null);
    };

    return (
        <div className="tabela-comprovantes">
            <table>
                <thead>
                <tr>
                    <th>Nome do Usuário</th>
                    <th>ID</th>
                    <th>Data de Envio</th>
                </tr>
                </thead>
                <tbody>
                {comprovantes.map((c) => (
                    <tr key={c.id}>
                        <td
                            onClick={() => abrirModal(c)}
                            style={{ cursor: "pointer", color: "#ff4a4a", fontWeight: "bold" }}
                        >
                            {c.userName}
                        </td>
                        <td>{c.userId}</td>
                        <td>{c.submissionDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {comprovanteSelecionado && (
                <ModalComprovante comprovante={comprovanteSelecionado} onClose={fecharModal} />
            )}
        </div>
    );
};

export default TabelaComprovantes;
