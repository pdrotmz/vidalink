import React from 'react';
import '../styles/Unauthorized.css';

export default function Unauthorized() {
    return (
        <div className="unauthorized-container">
            <div className="unauthorized-icon">🚫</div>
            <h1 className="unauthorized-title">Acesso Negado</h1>
            <p className="unauthorized-message">
                Esta página é restrita apenas para <strong>funcionários</strong> autorizados.
            </p>
            <button
                className="unauthorized-button"
                onClick={() => window.history.back()}
            >
                Voltar
            </button>
        </div>
    );
}