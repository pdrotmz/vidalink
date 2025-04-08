import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../src/styles/globals.css'
import { HomePage } from './pages/HomePage'
import { CadastroProdutos } from './pages/CadastroProdutos';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/CadastroProdutos' element={<CadastroProdutos />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App
