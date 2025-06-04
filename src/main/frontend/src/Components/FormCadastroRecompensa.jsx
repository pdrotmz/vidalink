import React, { useState } from "react";
import "../styles/Modal.css";

const FormCadastroRecompensa = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        pointsRequired: 0,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8083/rewards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    pointsRequired: parseInt(formData.pointsRequired),
                }),
            });

            if (response.ok) {
                alert("Recompensa cadastrada com sucesso!");
                setFormData({ name: "", description: "", pointsRequired: 0 });
                onSuccess(); // Atualiza a lista
                onClose();   // Fecha o modal
            } else {
                alert("Erro ao cadastrar recompensa");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao cadastrar recompensa");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Cadastrar Recompensa</h2>
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

export default FormCadastroRecompensa;
