import React from "react";
import "../styles/ModalComprovante.css";
import placeholderImage from "../Assets/images/placeholder.jpeg";


const ModalComprovante = ({ comprovante, onClose, onRemover }) => {
    const { userName, userId, submissionDate, filePath } = comprovante;

    // Montar URL da imagem
    const imageUrl = filePath
        ? `https://vidalink.onrender.com${filePath}`
        : placeholderImage;

    const handleValidar = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(
                `https://vidalink.onrender.com/submissions/${comprovante.id}/validate`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) throw new Error("Erro ao validar comprovante");
            alert("Comprovante validado com sucesso!");
            onRemover(comprovante.id);
            onClose();
        } catch (err) {
            console.error(err);
            alert("Erro ao validar.");
        }
    };

    const handleRejeitar = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(
                `https://vidalink.onrender.com/submissions/${comprovante.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) throw new Error("Erro ao rejeitar comprovante");
            alert("Comprovante rejeitado e deletado.");
            onRemover(comprovante.id);
            onClose();
        } catch (err) {
            console.error(err);
            alert("Erro ao rejeitar.");
        }
    };

    return (
        <div className="modal-comprovante-overlay">
            <div className="modal-comprovante">
                <h3>Detalhes do Comprovante</h3>
                <p><strong>Usuário:</strong> {userName}</p>
                <p><strong>ID:</strong> {userId}</p>
                <p><strong>Data:</strong> {new Date(submissionDate).toLocaleDateString()}</p>
                <img
                    src={imageUrl}
                    alt="Comprovante"
                    className="modal-comprovante-img"
                    onError={(e) => {
                        e.target.src = placeholderImage;
                        e.target.onerror = null;
                    }}
                />
                <div className="botoes-modal">
                    <button className="validar-btn" onClick={handleValidar}>Validar</button>
                    <button className="rejeitar-btn" onClick={handleRejeitar}>Rejeitar</button>
                    <button className="fechar-btn" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalComprovante;
