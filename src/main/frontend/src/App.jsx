import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/styles/globals.css";
import { HomePage } from "./pages/HomePage";
import { SobrePage } from "./pages/SobrePage";
import ContatoPage from "./pages/ContatoPage";


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/contato" element={<ContatoPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
