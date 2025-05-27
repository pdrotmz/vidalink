import React from 'react';
import { Link } from "react-router-dom";
import gota_sangue from '../Assets/images/gotaSangue.png'
import logo from '../Assets/images/logoVidaLink.png'

import '../styles/Home.css'

const Home = () => {
  return (
    <div className="homepage">
     <div className='nav-section'>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/contato">Contato</Link></li>
        </ul>
      </nav>
      <div className="login-section">
          <Link to="/cadastro"><button type='button' className='login-button'>LOGIN</button></Link>
      </div>
     </div>
      
      <main className='main-content'>
        <div className='main-text'>
          <h1>Doe sangue, <br /> Salve vidas</h1>
         <div className='blood-drop'>
          <img src={gota_sangue} alt="Gota de sangue" />
         </div>
        </div>

        <div className='call-action'>
         <p>Sua doação pode trazer esperança e cura para aqueles que precisam.</p>
          <button className="donate-button">Doar agora</button>
        </div>
        <div className='logo'>
          <img src={logo} alt="Logo da Vidalink" />
        </div>
      </main>


    </div>
  );
};

export default Home;