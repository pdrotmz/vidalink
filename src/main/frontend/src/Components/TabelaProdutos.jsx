import React, { useEffect, useState } from "react";
import "../Styles/TabelaProdutos.css";

export const TabelaProdutos = () => {

  return (
      <div style={{ padding: '20px' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <thead>
          <tr style={{ background: '#d9d9d9' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Nome do Produto</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Categoria</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Preço</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Estoque</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>Avatar Personalizado</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>Personalização</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>500 pts</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>20</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>
              <a href="#" style={{ color: 'red', textDecoration: 'none' }}>✏️ Editar</a>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>Medalhas</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>Conquista</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>300 pts</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>50</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>
              <a href="#" style={{ color: 'red', textDecoration: 'none' }}>✏️ Editar</a>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>Título</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>Conquista</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>400 pts</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>30</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>
              <a href="#" style={{ color: 'red', textDecoration: 'none' }}>✏️ Editar</a>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>Nome no Mural de Doadores</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>Experiência Exclusiva</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>1500 pts</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>10</td>
            <td style={{ padding: '12px', borderTop: '1px solid #eee' }}>
              <a href="#" style={{ color: 'red', textDecoration: 'none' }}>✏️ Editar</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TabelaProdutos;