import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/styles/globals.css";
import HomePage from "../src/pages/HomePage";
import SobrePage from "../src/pages/SobrePage";
import ContatoPage from "../src/pages/ContatoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} index />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/contato" element={<ContatoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;