import React from "react";
import "../styles/ModalComprovante.css";

const ModalComprovante = ({ comprovante, onClose }) => {
    const token = localStorage.getItem("token");

    const aprovarComprovante = async () => {
        try {
            const response = await fetch(`http://localhost:8083/submissions/${comprovante.id}/validate`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                alert("Comprovante aprovado com sucesso!");
                onClose();
                window.location.reload();
            } else {
                alert("Erro ao aprovar comprovante");
            }
        } catch (error) {
            console.error("Erro ao aprovar comprovante:", error);
        }
    };

    const reprovarComprovante = async () => {
        const confirmacao = window.confirm("Tem certeza que deseja reprovar e excluir este comprovante?");
        if (!confirmacao) return;

        try {
            const response = await fetch(`http://localhost:8083/submissions/${comprovante.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert("Comprovante reprovado e removido!");
                onClose();
                window.location.reload();
            } else {
                alert("Erro ao reprovar comprovante");
            }
        } catch (error) {
            console.error("Erro ao reprovar comprovante:", error);
        }
    };

    return (
        <div className="modal-comprovante-backdrop" onClick={onClose}>
            <div className="modal-comprovante" onClick={(e) => e.stopPropagation()}>
                <h2>{comprovante.userName}</h2>

                {comprovante.filePath ? (
                    <img
                        src={`http://localhost:8083/${comprovante.filePath}`}
                        alt="Comprovante"
                        style={{ maxWidth: "100%", maxHeight: "400px" }}
                    />
                ) : (
                    <p>Imagem do comprovante não disponível.</p>
                )}

                <div className="buttons">
                    <button className="reprovar" onClick={reprovarComprovante}>Reprovar</button>
                    <button className="aprovar" onClick={aprovarComprovante}>Aprovar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalComprovante;
