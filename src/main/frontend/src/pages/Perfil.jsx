import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import InfoPerfil from "../Components/InfoPerfil";
import "../styles/Perfil.css";
import placeholderImage from "../Assets/images/placeholder.jpeg";

export const Perfil = () => {
    const [recompensas, setRecompensas] = useState([]);

    useEffect(() => {
        const fetchRecompensas = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("https://vidalink.onrender.com/rewards/my-rewards", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setRecompensas(data);
                } else {
                    console.error("Erro ao buscar recompensas:", response.status);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            }
        };

        fetchRecompensas();
    }, []);

    return (
        <div className="perfilContainer">
            <Header />
            <InfoPerfil />
            <div className="perfilContent">
                <h1>Minhas Recompensas</h1>
                <div className="recompensasGrid">
                    {recompensas.length === 0 ? (
                        <p>Você ainda não possui recompensas.</p>
                    ) : (
                        recompensas.map((item) => (
                            <div key={item.id} className="recompensaCard">
                                <img
                                    src={`https://vidalink.onrender.com${item.imageUrl}?t=${Date.now()}`}
                                    alt={item.name}
                                    className="recompensaImage"
                                    onError={(e) => {
                                        e.target.src = placeholderImage;
                                        e.target.onerror = null;
                                    }}
                                />
                                <p className="recompensaNome">{item.name}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Perfil;