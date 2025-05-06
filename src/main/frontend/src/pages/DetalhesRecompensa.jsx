import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


import { Header } from "../Components/Header";


import { recompensas } from "../Data/ListaRecompensas";

import "../Styles/DetalhesRecompensa.css"


function DetalhesRecompensa() {
    const { id } = useParams();
    const recompensa = recompensas.find((rec) => rec.id === parseInt(id));

    if (!recompensa) {
        return <h2>Livro não encontrado!</h2>;
    }

    return (
        <div className="container-DetalhesLivro">
            <Header />

            <div className=""></div>
            <img src={recompensa.imagem} alt="" />

            <p>{recompensa.nome}</p>
            

            
        
        </div>
    );
}

export default DetalhesRecompensa;