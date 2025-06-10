import React, { useState } from "react";
import "../styles/Modal.css";

const FormCadastroRecompensa = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        pointsRequired: "",
        file: null
    });

    const [validation, setValidation] = useState({
        pointsValid: false,
        pointsTouched: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validação especial para pontos
        if (name === 'pointsRequired') {
            const pointsValue = parseInt(value) || 0;
            const isValid = pointsValue > 0;
            setValidation(prev => ({
                ...prev,
                pointsValid: isValid,
                pointsTouched: true
            }));
        }
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    };

    const isFormValid = () => {
        const pointsValue = parseInt(formData.pointsRequired) || 0;
        return pointsValue > 0 &&
            formData.name.trim() &&
            formData.description.trim();
    };

    const getInputClass = () => {
        if (!validation.pointsTouched) return '';
        return validation.pointsValid ? 'input-valid' : 'input-error';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

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

            if (!response.ok) {
                throw new Error("Erro ao cadastrar recompensa");
            }

            alert("Recompensa cadastrada com sucesso!");
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Erro:", error);
            alert(error.message || "Erro ao cadastrar recompensa");
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

                    <div className="input-container">
                        <input
                            type="number"
                            name="pointsRequired"
                            value={formData.pointsRequired}
                            onChange={handleChange}
                            placeholder="Pontos Necessários"
                            className={getInputClass()}
                            required
                            min="1"
                        />
                        {validation.pointsTouched && !validation.pointsValid && (
                            <span className="error-message">
                                Os pontos devem ser maiores que zero
                            </span>
                        )}
                    </div>

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
                        <button
                            type="submit"
                            disabled={!isFormValid()}
                            className={!isFormValid() ? 'button-disabled' : ''}
                        >
                            Salvar
                        </button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormCadastroRecompensa;