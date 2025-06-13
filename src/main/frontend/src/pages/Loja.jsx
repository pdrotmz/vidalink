import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import "../styles/Loja.css";
import placeholderImage from "../Assets/images/placeholder.jpeg";

export const Loja = () => {
    const [recompensas, setRecompensas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userPoints, setUserPoints] = useState(null); // null = ainda carregando

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
                console.log("Dados recebidos:", data);
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

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("https://vidalink.onrender.com/api/users/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao buscar usuário");
                return response.json();
            })
            .then(data => {
                setUserPoints(data.points); // não força 0
            })
            .catch(error => {
                console.error("Erro ao carregar pontos do usuário:", error);
            });
    }, []);

    const getImageUrl = (item) => {
        if (item.imageUrl && item.imageUrl.trim() !== '') {
            return `https://vidalink.onrender.com${item.imageUrl}`;
        }
        return placeholderImage;
    };

    const handleImageError = (e, item) => {
        console.log(`Erro ao carregar imagem para ${item.name} (ID: ${item.id})`);
        console.log(`ImageUrl: ${item.imageUrl}`);
        console.log(`URL tentada: ${e.target.src}`);
        e.target.src = placeholderImage;
        e.target.onerror = null;
    };

    const handleResgatar = (rewardId) => {
        const token = localStorage.getItem("token");

        fetch(`https://vidalink.onrender.com/rewards/redeem/${rewardId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao resgatar recompensa");
                return response.json();
            })
            .then(data => {
                alert(data.message || "Recompensa resgatada com sucesso!");
                setUserPoints(data.updatedPoints);
            })
            .catch(error => {
                alert("Erro ao resgatar recompensa.");
                console.error(error);
            });
    };

    return (
        <div className="lojaContainer">
            <Header />
            <div className="lojaContent">
                <h1>Top Medalhas</h1>

                {userPoints === null || loading ? (
                    <p>Carregando recompensas...</p>
                ) : (
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
                                    <p className="lojaPontos">{item.pointsRequired} pts</p>

                                    {userPoints >= item.pointsRequired ? (
                                        <button
                                            className="resgatarButton"
                                            onClick={() => handleResgatar(item.id)}
                                        >
                                            Resgatar
                                        </button>
                                    ) : (
                                        <button className="resgatarButton" disabled>
                                            Pontos insuficientes
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>Nenhuma recompensa disponível no momento.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Loja;
