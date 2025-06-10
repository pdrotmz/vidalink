import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import "../styles/Loja.css";

export const Loja = () => {
    const [recompensas, setRecompensas] = useState([]);

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
            .then(data => setRecompensas(data))
            .catch(error => console.error("Erro:", error));
    }, []);

    return (
        <div className="lojaContainer">
            <Header />
            <div className="lojaContent">
                <h1>Top Medalhas</h1>
                <div className="lojaGrid">
                    {recompensas.map((item) => (
                        <div key={item.id} className="lojaCard">
                            <img
                                src={`https://vidalink.onrender.com/rewards/${item.id}/image`}
                                alt={item.name}
                                className="lojaImage"
                                onError={(e) => {
                                    e.target.src = "/placeholder.png"; // fallback
                                }}
                            />
                            <p className="lojaNome">{item.name}</p>
                            <p className="lojaPontos">{item.requiredPoints} pts</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Loja;
