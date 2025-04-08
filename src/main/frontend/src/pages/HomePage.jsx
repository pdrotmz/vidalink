import React from 'react';
import { Link } from "react-router-dom";
import '../styles/HomePage.css';

const HomePage = () => {
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
          <button type='button' className='login-button'>LOGIN</button>
      </div>
     </div>
      
      <main className="main-content">
        <div className='main-text'>
          <h1>Doe sangue, <br /> Salve vidas</h1>
        </div>
        <div>
          <p>Sua doação pode trazer esperança e cura para aqueles que precisam.</p>
          <button className="donate-button">Doar agora</button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;