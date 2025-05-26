import React from 'react';
import '../Styles/submeterComprovante.css';
import Header from "../Components/Header";
import gif from "../Assets/images/gif_doacao.gif";

import teste from "../Assets/images/logoVidaLink.png"

const SubmeterComprovante = () => {
  return (
    <div>
        <Header />

        <div className="submeterContent">  
            <img src={teste} alt="" />
            <h1>opa</h1>
            <p>faça upload blá blá blá</p>

            <form action="">
                <label htmlFor="">id</label>
                <input type="text" />

                <label htmlFor="">documento</label>

                <button></button>
            </form>
        </div>
            
    </div>
  );
};

export default SubmeterComprovante;
