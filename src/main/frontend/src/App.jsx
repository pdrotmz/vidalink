import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../src/styles/globals.css'
import { HomePage } from './pages/HomePage'
import { CadastroProdutos } from './pages/CadastroProdutos';
import { ListagemProdutos } from './pages/ListagemProdutos';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/CadastroProdutos' element={<CadastroProdutos />} />
          <Route path='/ListagemProdutos' element={<ListagemProdutos />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App
