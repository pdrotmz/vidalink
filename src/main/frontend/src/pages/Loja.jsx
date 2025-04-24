import React from "react";
import "../Styles/Loja.css";

const Loja = () => {
  return (
    <div className="container-principal">
      <header className="topo">
        <span className="voltar">←</span>
      </header>

      <section className="perfil">
        <h1>Olá, Artur Braga 👋</h1>
        <p className="level">Level 7 💪</p>
        <p className="pontos">
          Pontos disponíveis <strong>67</strong>
          <span className="gota">🩸</span>
        </p>
      </section>

      <section className="itens">
        <h2>🎁 Itens Diários Para Comprar com Pontos</h2>
        <div className="grid-itens">
          <div className="item">
            <img src="Trofeu.png" alt="Troféu Super Doador" />
            <p>
              🏆 Troféu Super Doador
              <br />
              8500 Pontos
            </p>
          </div>
          <div className="item">
            <img
              src="https://images.vexels.com/media/users/3/127644/isolated/preview/586432b0ddcece9d215598a81cf32ccd-medalha-de-ouro-do-primeiro-lugar.png"
              alt="Medalha Doador Nº1"
            />
            <p>
              🥇 Medalha Doador Nº1
              <br />
              10.000 Pontos
            </p>
          </div>
          <div className="item">
            <img src="estrela.png" alt="Medalha Doador Estrela" />
            <p>
              🌟 Medalha Doador Estrela
              <br />
              8.000 Pontos
            </p>
          </div>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1319/1319306.png"
              alt="Medalha Doador Nebula"
            />
            <p>
              ✨ Medalha Doador Nebula
              <br />
              9.500 Pontos
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loja;

