import React, { useEffect, useState } from "react";
import AdmHeader from "../Components/AdmHeader";
import TabelaComprovantes from "../Components/TabelaComprovantes";
import "../styles/ListagemProdutos.css";

const ListagemComprovantes = () => {
    const [comprovantes, setComprovantes] = useState([]);

    const fetchComprovantes = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("https://vidalink.onrender.com/submissions/pending", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setComprovantes(data);
            } else {
                console.error("Erro ao buscar comprovantes:", response.status);
            }
        } catch (error) {
            console.error("Erro ao buscar comprovantes:", error);
        }
    };

    useEffect(() => {
        fetchComprovantes();
    }, []);

    return (
        <div className="listagemProdutosContent">
            <AdmHeader />
            <div className="containerListagemProdutos">
                <h1>Validação de Comprovantes</h1>
                <TabelaComprovantes comprovantes={comprovantes} />
            </div>
        </div>
    );
};

export default ListagemComprovantes;
