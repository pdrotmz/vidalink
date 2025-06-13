import React, { useState, useEffect } from "react";
import ModalEdicaoPerfil from "../Components/ModalEdicaoPerfil";
import "../styles/InfoPerfil.css";
import defaultProfilePic from "../Assets/images/fotoperfil.jpg";
import { Link } from "react-router-dom";

const InfoPerfil = () => {
    const [user, setUser] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("https://vidalink.onrender.com/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error(`Erro ${response.status}`);

                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    throw new Error("Resposta inválida do servidor");
                }
            } catch (err) {
                setError("Não foi possível carregar os dados do usuário.");
                console.error("Erro ao buscar usuário:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

    const handleSave = (updatedUser) => {
        setUser(updatedUser);
        setModalAberto(false);
    };

    // Função para construir URL da imagem corretamente
    const getProfileImageUrl = () => {
        if (user?.profileImage) {
            // Se profileImage já é uma URL completa
            if (user.profileImage.startsWith('http')) {
                return `${user.profileImage}?t=${Date.now()}`;
            }
            // Se é um caminho relativo, construir URL completa
            return `https://vidalink.onrender.com${user.profileImage}?t=${Date.now()}`;
        }
        return defaultProfilePic;
    };

    if (loading) return <div className="loading-spinner">Carregando...</div>;

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button onClick={() => window.location.reload()}>Tentar novamente</button>
                <Link to="/login" className="login-link">Fazer login novamente</Link>
            </div>
        );
    }

    return (
        <div className="infoPerfilContainer">
            <div className="infoPerfilContent">
                <div className="perfil">
                    <img
                        src={getProfileImageUrl()}
                        alt="Perfil"
                        className="profile-image"
                        onError={(e) => {
                            e.target.src = defaultProfilePic;
                        }}
                    />
                    <div className="textos">
                        <h2 className="username">{user?.username}</h2>
                        <p className="email">{user?.email}</p>
                    </div>
                </div>
                <button onClick={() => setModalAberto(true)} className="edit-button">
                    Editar Perfil
                </button>
            </div>

            {modalAberto && (
                <ModalEdicaoPerfil
                    user={user}
                    onClose={() => setModalAberto(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default InfoPerfil;