import React from "react";
import { Link } from "react-router-dom";
import AdmHeader from "../Components/AdmHeader";
import TabelaProdutos from "../Components/TabelaProdutos";

import "../Styles/ListagemProdutos.css"

export const ListagemProdutos = () => {

    return (
        
        <div className="listagemProdutosContent">
            <AdmHeader />

            <div className="containerListagemProdutos">
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

export default ListagemProdutos;