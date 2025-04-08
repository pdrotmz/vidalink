import React from "react";
import { Header } from "../components/ui/Header";
import "../styles/CadastroProdutos.css"

export const CadastroProdutos = () => {

    return (
        
        <div className="content">
            <Header />
            <div className="CadastroProdutosContent">
                <h1>Cadastro de produtos</h1>

                <form action="">
                    <div className="esquerda">
                        <label htmlFor="">Nome do produto</label>
                        <br />
                        <input type="text" placeholder="Nome do produto..."/>
                        <br /><br />

                        <label htmlFor="">Preço</label>
                        <br />
                        <input type="text" placeholder="Preço..."/>
                        <br /><br />

                        <label htmlFor="">Categoria</label>
                        <br />
                        <input type="text" placeholder="Categoria..."/>
                        <br /><br />

                        <label htmlFor="">Estoque</label>
                        <br />
                        <input type="text" placeholder="Estoque..."/>
                        <br /><br />

                        <div className="comprovante">
                            <label className="custom-button" htmlFor="imagem">Submeter comprovante</label>
                            <input type="file" id="imagem" name="imagem" accept="image/*" />
                        </div>
                    </div>

                    <div className="direita">
                        <label htmlFor="">Descrição</label>
                        <br />
                        <textarea name="" id="" placeholder="Descrição..."></textarea>
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