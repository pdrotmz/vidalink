import React from "react";
import Header from "../Components/Header"
import RecompensaLoja from "../Components/RecompensaLoja";

import Certificado1 from "../Assets/images/certificado1.png"
import Certificado2 from "../Assets/images/certificado2.png"
import Certificado3 from "../Assets/images/certificado3.png"

import Categoria1 from "../Assets/images/categoria1.png"



import "../Styles/Loja.css";

const Loja = () => {
  return (
    <div className="containerLoja">
      <Header></Header>
      <div className="lojaContent">

        <div className="categorias">
          <h1>Categorias</h1>
          <div className="line">
            <div className="redline" />
            <div className="blackline"/>
          </div>

          <ul>
            <li>
              <img src={Categoria1} alt="" />
              <p>Nome</p>
            </li>
            <li>
              <img src={Categoria1} alt="" />
              <p>Nome</p>
            </li>
            <li>
              <img src={Categoria1} alt="" />
              <p>Nome</p>
            </li>
          </ul>
        </div>

        <div className="vitrine">
          <h1>Top Medalhas</h1>
          <div className="line">
            <div className="redline" />
            <div className="blackline"/>
          </div>
          

          <ul>
            <RecompensaLoja imagem={Certificado1} nome={'Primeira doação'} preco={'1'} recompensaId={1}/>
          
            <RecompensaLoja imagem={Certificado2} nome={'Primeira recomendação'} preco={'50'} recompensaId={1}/>

            <RecompensaLoja imagem={Certificado3} nome={'Primeira doação'} preco={'50'} recompensaId={1}/>

            <RecompensaLoja imagem={Certificado1} nome={'Primeira doação'} preco={'50'} recompensaId={1}/>

            <RecompensaLoja imagem={Certificado2} nome={'Primeira doação'} preco={'50'} recompensaId={1}/>

            <RecompensaLoja imagem={Certificado3} nome={'Primeira doação'} preco={'50'} recompensaId={1}/>

            <RecompensaLoja imagem={Certificado1} nome={'Primeira doação'} preco={'50'} recompensaId={1}/>

            <RecompensaLoja imagem={Certificado2} nome={'Primeira doação'} preco={'50'} recompensaId={1}/>

          </ul>
        </div>
      </div>
      
      
    </div>
  );
};

export default Loja;

