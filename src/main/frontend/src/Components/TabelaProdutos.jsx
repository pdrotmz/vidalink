import React, { useState } from "react";
import "../styles/TabelaProdutos.css";
import ModalEdicao from "./ModalEdicao";

const TabelaProdutos = ({ recompensas }) => {
    const [recompensaSelecionada, setRecompensaSelecionada] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    const abrirModalEdicao = (recompensa) => {
        setRecompensaSelecionada(recompensa);
        setMostrarModal(true);
    };

    const fecharModal = () => {
        setMostrarModal(false);
        setRecompensaSelecionada(null);
    };

    return (
        <div className="tabela-produtos">
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Pontos Necessários</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {recompensas.map((reward) => (
                    <tr key={reward.id}>
                        <td>{reward.name}</td>
                        <td>{reward.description}</td>
                        <td>{reward.pointsRequired}</td>
                        <td>
                                <span
                                    onClick={() => abrirModalEdicao(reward)}
                                    style={{ cursor: "pointer", marginRight: "1rem" }}
                                >
                                    ✏️
                                </span>
                            <span
                                onClick={async () => {
                                    const confirmacao = window.confirm("Tem certeza que deseja excluir?");
                                    if (confirmacao) {
                                        try {
                                            const token = localStorage.getItem('token');
                                            const response = await fetch(`https://vidalink.onrender.com/rewards/${reward.id}`, {
                                                method: 'DELETE',
                                                headers: {
                                                    'Authorization': `Bearer ${token}`
                                                }
                                            });
                                            if (response.ok) {
                                                alert("Recompensa excluída com sucesso!");
                                                window.location.reload();
                                            } else {
                                                alert("Erro ao excluir recompensa");
                                            }
                                        } catch (error) {
                                            console.error("Erro ao excluir recompensa", error);
                                        }
                                    }
                                }}
                                style={{ cursor: "pointer" }}
                            >
    ❌
</span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {mostrarModal && recompensaSelecionada && (
                <ModalEdicao
                    recompensa={recompensaSelecionada}
                    onClose={fecharModal}
                />
            )}
        </div>
    );
};

export default TabelaProdutos;
