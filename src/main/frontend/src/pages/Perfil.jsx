import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import InfoPerfil from "../Components/InfoPerfil";
import "../styles/Principal.css";

export const Perfil = () => {
    const [recompensas, setRecompensas] = useState([]);

    useEffect(() => {
        const fetchRecompensas = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("http://localhost:8083/rewards/my-rewards", {
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
            <div className="perfilContent">
                <InfoPerfil />
                <h1>Minhas Recompensas</h1>
                <div className="recompensasGrid">
                    {recompensas.length === 0 ? (
                        <p>Você ainda não possui recompensas.</p>
                    ) : (
                        recompensas.map((item) => (
                            <div key={item.id} className="recompensaCard">
                                <img
                                    src={`http://localhost:8083/rewards/${item.id}/image`}
                                    alt={item.name}
                                    className="recompensaImage"
                                    onError={(e) => {
                                        e.target.src = "/placeholder.png"; // imagem de fallback
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
