import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { TabelaProdutos } from "../components/sections/TabelaProdutos";
import "../styles/ListagemProdutos.css"

export const ListagemProdutos = () => {

    return (
        
        <div className="content">
            <Header />
            <div className="listagemProdutosContent">
                <h1>Listagem de produtos</h1>
                <br />

                <div className="botoes">
                    <div className="buscador">
                        <input type="text" placeholder="Buscar..."/>
                        <button>Buscar</button>
                    </div>
                    <Link to="/CadastroProdutos">
                        <button>Novo Produto</button>
                    </Link>
                </div>

                <br /><br />


                <TabelaProdutos></TabelaProdutos>

            </div>
        </div>
    );
}