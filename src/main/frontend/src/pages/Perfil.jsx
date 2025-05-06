import React from "react";

import "../Styles/Principal.css"

export const Perfil = () => {

    return (
        <div className="PrincipalContent">
            <header>
                <a href="#" className="voltar"></a>
                <img src="sua-imagem.png" alt="Imagem" className="imagem-cabecalho" />
            </header>

            <main>
                <div className="quadrado">

                    {/* Área de Perfil */}
                    <div className="perfil">
                        <img src="foto-perfil.png" alt="Foto de perfil" className="foto-perfil" />
                        
                        <div className="info-perfil-container">
                            <div className="info-e-botao">
                                <div className="info-perfil">
                                    <p className="nome-perfil">José Hernesto da Silva</p>
                                    <p className="email-perfil">josehernesto@unifap.edu.br</p>
                                    <p className="sangue-perfil">O+</p>
                                </div>
                                <div className="botao-voltar-container">
                                    <button className="botao-voltar">Voltar ao Perfil</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Histórico de Doação */}
                    <h2 className="titulo-quadrado">HISTÓRICO DE DOAÇÃO</h2>
                    <p className="historico-item">10 de janeiro de 2024, doação de sangue no hospital São Lucas</p>
                    <p className="historico-item">20 de março de 2024, doação de sangue no hospital São José</p>
                    <p className="historico-item">14 de setembro de 2024, doação de sangue no Hospital Santa Maria</p>
                    <p className="historico-item">07 de janeiro de 2025, doação de sangue no Hospital Santa Cecília</p>

                    {/* Certificados */}
                    <h2 className="titulo-quadrado">CERTIFICADOS</h2>
                    <div className="certificados">
                        <img src="certificado1.png" alt="Certificado 1" className="certificado-img" />
                        <img src="certificado2.png" alt="Certificado 2" className="certificado-img" />
                        <img src="certificado3.png" alt="Certificado 3" className="certificado-img" />
                    </div>

                </div>
            </main>

        </div> 
        
    );
}

export default Perfil;