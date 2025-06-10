import React, { useEffect, useState } from "react";
import AdmHeader from "../Components/AdmHeader";
import TabelaProdutos from "../Components/TabelaProdutos";
import FormCadastroRecompensa from "../Components/FormCadastroRecompensa"; // novo

import "../styles/ListagemProdutos.css";

export const ListagemProdutos = () => {
    const [recompensas, setRecompensas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [termoBusca, setTermoBusca] = useState(""); // <- novo

    const fetchRecompensas = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("https://vidalink.onrender.com/rewards/available", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setRecompensas(data);
            } else {
                console.error("Erro ao buscar recompensas", response.status);
            }
        } catch (error) {
            console.error("Erro na requisição", error);
        }
    };

    const buscarRecompensasPorNome = async () => {
        if (!termoBusca.trim()) {
            // se vazio, busca tudo de novo
            return fetchRecompensas();
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`https://vidalink.onrender.com/rewards/search/${termoBusca}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setRecompensas(data);
            } else {
                console.error("Erro ao buscar recompensa por nome", response.status);
                alert("Nenhuma recompensa encontrada.");
            }
        } catch (error) {
            console.error("Erro na busca:", error);
        }
    };

    useEffect(() => {
        fetchRecompensas();
    }, []);

    return (
        <div className="listagemProdutosContent">
            <AdmHeader />
            <div className="containerListagemProdutos">
                <h1>Listagem de Recompensas</h1>
                <br />

                <div className="botoes">
                    <div className="buscador">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && buscarRecompensasPorNome()}
                        />
                        <button onClick={buscarRecompensasPorNome}>Buscar</button>
                    </div>
                    <button onClick={() => setMostrarModal(true)}>Nova Recompensa</button>
                </div>

                <br /><br />

                <TabelaProdutos
                    recompensas={recompensas}
                    // ... onEdit e onDelete mantêm os mesmos
                />
            </div>

            {mostrarModal && (
                <FormCadastroRecompensa
                    onClose={() => setMostrarModal(false)}
                    onSuccess={fetchRecompensas}
                />
            )}
        </div>
    );
};


export default ListagemProdutos;
