import React, { useState, useEffect } from "react";
import "../styles/TabelaComprovantes.css";
import ModalComprovante from "./ModalComprovante";

const TabelaComprovantes = () => {
    const [comprovantes, setComprovantes] = useState([]);
    const [comprovanteSelecionado, setComprovanteSelecionado] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const buscarComprovantes = async () => {
            try {
                const response = await fetch("https://vidalink.onrender.com/submissions/pending", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    // Adapta os dados para o formato que a tabela espera
                    const adaptado = data.map((item) => ({
                        id: item.id,
                        userId: item.author.id,
                        userName: item.author.username,
                        submissionDate: item.createdAt,
                        filePath: item.filePath,
                    }));

                    setComprovantes(adaptado);
                } else {
                    console.error("Erro ao buscar comprovantes");
                }
            } catch (err) {
                console.error("Erro:", err);
            }
        };

        buscarComprovantes();
    }, [token]);

    const abrirModal = (comprovante) => {
        setComprovanteSelecionado(comprovante);
    };

    const fecharModal = () => {
        setComprovanteSelecionado(null);
    };

    const formatarData = (dataString) => {
        try {
            const data = new Date(dataString);
            return isNaN(data) ? "Data inválida" : data.toLocaleDateString("pt-BR");
        } catch (err) {
            return "Data inválida";
        }
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
                        <td>{formatarData(c.submissionDate)}</td>
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
