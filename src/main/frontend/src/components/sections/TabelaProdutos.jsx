import React, { useEffect, useState } from "react";
import "../ComponentsCss/TabelaProdutos.css";

export const TabelaProdutos = () => {
  const [produtos, setProdutos] = useState([]);

  // Simulação de chamada ao backend
  useEffect(() => {
    const dadosDoBackend = [
      {
        nome: "Avatar Personalizado",
        categoria: "Personalização",
        preco: 500,
        estoque: 20,
      },
      {
        nome: "Medalhas",
        categoria: "Conquista",
        preco: 300,
        estoque: 50,
      },
      {
        nome: "Título",
        categoria: "Conquista",
        preco: 400,
        estoque: 30,
      },
      {
        nome: "Nome no Mural de Doadores",
        categoria: "Experiência Exclusiva",
        preco: 1500,
        estoque: 10,
      },
    ];

    setProdutos(dadosDoBackend);
  }, []);

  return (
    <div className="tabela-container">
      <table className="tabela-produtos">
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => (
            <tr key={index}>
              <td>{produto.nome}</td>
              <td>{produto.categoria}</td>
              <td>{produto.preco} pts</td>
              <td>{produto.estoque}</td>
              <td className="acoes">
                🖉 <span className="deletar">Editar</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};