<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../src/styles/globals.css'
import { HomePage } from './pages/HomePage'
import { CadastroProdutos } from './pages/CadastroProdutos';
import { ListagemProdutos } from './pages/ListagemProdutos';
=======
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/styles/globals.css";
import HomePage from "../src/pages/HomePage";
import SobrePage from "../src/pages/SobrePage";
import ContatoPage from "../src/pages/ContatoPage";
import DoarPage from "../src/pages/DoarPage";
>>>>>>> develop

function App() {
  return (
<<<<<<< HEAD
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/CadastroProdutos' element={<CadastroProdutos />} />
          <Route path='/ListagemProdutos' element={<ListagemProdutos />} />
        </Routes>
      </BrowserRouter>
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} index />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/doar" element={<DoarPage />} />
      </Routes>
    </BrowserRouter>
>>>>>>> develop
  );
}

export default App;