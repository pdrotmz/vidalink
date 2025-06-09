import React, { useState } from "react";
import "../styles/Modal.css";

const FormCadastroRecompensa = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        pointsRequired: 0,
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
            const token = localStorage.getItem("token");
            const formDataToSend = new FormData();

            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('pointsRequired', formData.pointsRequired);
            if (formData.file) {
                formDataToSend.append('file', formData.file);
            }

            const response = await fetch("http://localhost:8083/rewards", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formDataToSend
            });

            if (response.ok) {
                alert("Recompensa cadastrada com sucesso!");
                setFormData({ name: "", description: "", pointsRequired: 0, file: null });
                onSuccess();
                onClose();
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

                    <div className="file-upload-container">
                        <label className={`file-upload-label ${formData.file ? 'has-file' : ''}`}>
                            {formData.file ? formData.file.name : "Selecionar Imagem"}
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="file-upload-input"
                                accept="image/*"
                            />
                        </label>
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

export default FormCadastroRecompensa;