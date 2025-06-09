import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import RecompensaPerfil from "../Components/RecompensaPerfil";
import InfoPerfil from "../Components/InfoPerfil";
import "../styles/Principal.css";

export const Perfil = () => {
    const [recompensas, setRecompensas] = useState([]);

    useEffect(() => {
        const fetchRecompensas = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch("http://localhost:8083/rewards/my-rewards", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
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
                <h1>Recompensas:</h1>
                <ul>
                    {recompensas.map((item) => (
                        <RecompensaPerfil
                            key={item.id}
                            imagem={`http://localhost:8083/rewards/${item.id}/image`} // endpoint p/ imagem
                            nome={item.name}
                            recompensaId={item.id}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Perfil;
