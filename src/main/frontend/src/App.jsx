import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../src/styles/globals.css'
import { HomePage } from './pages/HomePage'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App
