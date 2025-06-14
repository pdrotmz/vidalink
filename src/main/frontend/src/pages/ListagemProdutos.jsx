import React, { useEffect, useState } from "react";
import AdmHeader from "../Components/AdmHeader";
import TabelaProdutos from "../Components/TabelaProdutos";
import FormCadastroRecompensa from "../Components/FormCadastroRecompensa";

import "../styles/ListagemProdutos.css";

export const ListagemProdutos = () => {
    const [recompensas, setRecompensas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [termoBusca, setTermoBusca] = useState("");

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

    // Função para atualizar uma recompensa específica na lista
    const handleRecompensaAtualizada = (recompensaAtualizada) => {
        setRecompensas(prevRecompensas =>
            prevRecompensas.map(recompensa =>
                recompensa.id === recompensaAtualizada.id
                    ? recompensaAtualizada
                    : recompensa
            )
        );
    };

    // Função para remover uma recompensa da lista
    const handleRecompensaExcluida = (recompensaId) => {
        setRecompensas(prevRecompensas =>
            prevRecompensas.filter(recompensa => recompensa.id !== recompensaId)
        );
    };

    // Função para adicionar nova recompensa à lista
    const handleNovaRecompensa = (novaRecompensa) => {
        setRecompensas(prevRecompensas => [...prevRecompensas, novaRecompensa]);
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
                    onRecompensaUpdate={handleRecompensaAtualizada}
                    onRecompensaDelete={handleRecompensaExcluida}
                />
            </div>

            {mostrarModal && (
                <FormCadastroRecompensa
                    onClose={() => setMostrarModal(false)}
                    onSuccess={(novaRecompensa) => {
                        // Se o FormCadastroRecompensa retornar a nova recompensa criada,
                        // adiciona à lista. Senão, faz o fetch completo como fallback
                        if (novaRecompensa) {
                            handleNovaRecompensa(novaRecompensa);
                        } else {
                            fetchRecompensas();
                        }
                        setMostrarModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default ListagemProdutos;