import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../src/styles/globals.css'
import { HomePage } from './pages/HomePage'
import { CadastroProdutos } from './pages/CadastroProdutos';
import { ListagemProdutos } from './pages/ListagemProdutos';
import { SobrePage } from './pages/SobrePage';
import { DoarPage } from './pages/DoarPage';
import { ContatoPage } from './pages/ContatoPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/CadastroProdutos' element={<CadastroProdutos />} />
          <Route path='/ListagemProdutos' element={<ListagemProdutos />} />
          <Route path='SobrePage' element={<SobrePage />} />
          <Route path='DoarPage' element={<DoarPage />} />
          <Route path='ContatoPage' element={<ContatoPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;