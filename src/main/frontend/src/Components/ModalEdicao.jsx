import React, { useState } from "react";
import "../styles/Modal.css"; // Aponta pro CSS acima

const ModalEdicao = ({ recompensa, onClose }) => {
    const [formData, setFormData] = useState({
        name: recompensa.name,
        description: recompensa.description,
        pointsRequired: recompensa.pointsRequired,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8083/rewards/${recompensa.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Recompensa atualizada com sucesso!");
                onClose();
                window.location.reload();
            } else {
                alert("Erro ao atualizar recompensa");
            }
        } catch (err) {
            console.error("Erro ao editar recompensa", err);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Editar Recompensa</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nome"
                        required
                    />
                    <input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descrição"
                        required
                    />
                    <input
                        type="number"
                        name="pointsRequired"
                        value={formData.pointsRequired}
                        onChange={handleChange}
                        placeholder="Pontos Necessários"
                        required
                    />
                    <div className="botoes-modal">
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEdicao;
