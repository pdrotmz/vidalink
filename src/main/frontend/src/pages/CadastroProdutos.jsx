import React from "react";
import Header from "../Components/Header";
import "../Styles/CadastroProdutos.css"

export const CadastroProdutos = () => {

    return (
        
        <div className="content">
            <Header />
            <div className="CadastroProdutosContent">
                <h1>Cadastro de produtos</h1>

                <form action="cadastro.java" autoComplete="off">
                    <div className="esquerda">

                        <label htmlFor="inome">Nome do produto</label>
                        <br />
                        <input type="text" placeholder="Nome do produto..." name="nome" id="inome"/>
                        <br /><br />

                        <label htmlFor="ipreco">Preço</label>
                        <br />
                        <input type="text" placeholder="Preço..." name="preco" id="ipreco"/>
                        <br /><br />

                        <label htmlFor="icategoria">Categoria</label>
                        <br />
                        <input type="text" placeholder="Categoria..." name="categoria" id="icategoria"/>
                        <br /><br />

                        <label htmlFor="iestoque">Estoque</label>
                        <br />
                        <input type="text" placeholder="Estoque..." name="estoque" id="iestoque"/>
                        <br /><br />

                        <div className="comprovante">
                            <label className="custom-button" htmlFor="iimagem">Submeter comprovante</label>
                            <input type="file" id="iimagem" name="imagem" accept="image/*" />
                        </div>
                    </div>

                    <div className="direita">
                        <label htmlFor="idescricao">Descrição</label>
                        <br />
                        <textarea name="descricao" id="idescricao" placeholder="Descrição..."></textarea>
                    </div>
                </form>  
                <br />

                <div className="botoes">
                    <button className="cancelar">Cancelar</button>
                    <button className="salvar">Salvar</button>
                </div>

                
            </div>
        </div>
    );
}

export default CadastroProdutos;