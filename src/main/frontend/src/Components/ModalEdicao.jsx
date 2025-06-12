import React, { useState } from "react";
import "../styles/Modal.css";

const ModalEdicao = ({ recompensa, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: recompensa.name,
        description: recompensa.description,
        pointsRequired: recompensa.pointsRequired,
        file: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();

            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('pointsRequired', formData.pointsRequired);
            if (formData.file) {
                formDataToSend.append('file', formData.file);
            }

            const response = await fetch(`https://vidalink.onrender.com/rewards/${recompensa.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Erro desconhecido");
            }

            const contentType = response.headers.get("content-type");
            let data = null;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            }

            alert("Recompensa atualizada com sucesso!");
            if (data) onSuccess(data);
            onClose();
        } catch (err) {
            console.error("Erro ao editar recompensa", err);
            alert("Erro ao editar recompensa");
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
                    <div className="file-upload-container">
                        <label className={`file-upload-label ${formData.file ? 'has-file' : ''}`}>
                            {formData.file ? formData.file.name : "Alterar Imagem"}
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="file-upload-input"
                                accept="image/*"
                            />
                        </label>
                        {!formData.file && recompensa.imageUrl && (
                            <div className="current-image-info">
                                <span>Imagem atual mantida</span>
                            </div>
                        )}
                    </div>
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