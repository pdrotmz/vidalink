import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import "../styles/Loja.css";
import placeholderImage from "../Assets/images/placeholder.jpeg";

export const Loja = () => {
    const [recompensas, setRecompensas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("https://vidalink.onrender.com/rewards/available", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro na requisição");
                return response.json();
            })
            .then(data => {
                console.log("Dados recebidos:", data); // Para debug
                // Verificar se cada item tem imageUrl
                data.forEach(item => {
                    console.log(`Item ${item.name}: imageUrl = ${item.imageUrl}`);
                });
                setRecompensas(data);
            })
            .catch(error => {
                console.error("Erro ao carregar recompensas:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Função para construir a URL da imagem
    const getImageUrl = (item) => {
        if (item.imageUrl && item.imageUrl.trim() !== '') {
            return `https://vidalink.onrender.com${item.imageUrl}`;
        }
        return placeholderImage;
    };

    // Função para tratar erro de imagem
    const handleImageError = (e, item) => {
        console.log(`Erro ao carregar imagem para ${item.name} (ID: ${item.id})`);
        console.log(`ImageUrl: ${item.imageUrl}`);
        console.log(`URL tentada: ${e.target.src}`);
        e.target.src = placeholderImage;
        e.target.onerror = null; // Prevenir loop infinito
    };

    if (loading) {
        return (
            <div className="lojaContainer">
                <Header />
                <div className="lojaContent">
                    <h1>Top Medalhas</h1>
                    <p>Carregando recompensas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="lojaContainer">
            <Header />
            <div className="lojaContent">
                <h1>Top Medalhas</h1>
                <div className="lojaGrid">
                    {recompensas.length > 0 ? (
                        recompensas.map((item) => (
                            <div key={item.id} className="lojaCard">
                                <img
                                    src={getImageUrl(item)}
                                    alt={item.name || 'Recompensa'}
                                    className="lojaImage"
                                    onError={(e) => handleImageError(e, item)}
                                />
                                <p className="lojaNome">{item.name}</p>
                                <p className="lojaPontos">
                                    {item.pointsRequired || 0} pts
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>Nenhuma recompensa disponível no momento.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Loja;