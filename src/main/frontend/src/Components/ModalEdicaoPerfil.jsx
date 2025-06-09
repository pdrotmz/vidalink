import React, { useState, useEffect } from "react";
import "../styles/ModalEdicaoPerfil.css";

const ModalEdicaoPerfil = ({ user, onClose, onSave }) => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        profileImage: null,
    });
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (user) {
            setForm({
                username: user.username || "",
                email: user.email || "",
                profileImage: null,
            });
            setPreviewImage(user.profileImage || "");
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setForm((prev) => ({ ...prev, profileImage: file }));
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = new FormData();

        const userData = {
            username: form.username,
            email: form.email,
        };

        formData.append("user", new Blob([JSON.stringify(userData)], {
            type: "application/json",
        }));

        if (form.profileImage instanceof File) {
            formData.append("profileImage", form.profileImage);
        }

        try {
            const response = await fetch(`http://localhost:8083/api/users/${user.id}/edit-profile`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Erro ao atualizar perfil");
            }

            const updatedUser = await response.json();
            onSave(updatedUser);
        } catch (err) {
            console.error("Erro ao atualizar perfil:", err);
            alert("Erro ao atualizar perfil. Verifique os dados.");
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2 className="modal-title">Editar Perfil</h2>

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label htmlFor="username">Nome:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profileImage">Foto de Perfil:</label>
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleFotoChange}
                            className="file-input"
                        />
                    </div>

                    {previewImage && (
                        <div className="image-preview">
                            <img src={previewImage} alt="Prévia da imagem de perfil" />
                        </div>
                    )}

                    <div className="modal-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="save-button">
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEdicaoPerfil;
