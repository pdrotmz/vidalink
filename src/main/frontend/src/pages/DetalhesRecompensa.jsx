import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


import { Header } from "../Components/Header";


import { recompensas } from "../Data/ListaRecompensas";

import "../Styles/DetalhesRecompensa.css"


function DetalhesRecompensa() {
    const { id } = useParams();
    const recompensa = recompensas.find((rec) => rec.id === parseInt(id));

    if (!recompensa) {
        return <h2>Recompensa não encontrado!</h2>;
    }

    return (
        <div className="container-DetalhesRecompensas">
            <Header />

            <div className="detalhesRecompensasContent">

                <div className="Imagem">
                    <img src={recompensa.imagem} alt={recompensa.nome} />
                    <br />
                    <h1>Pontos atuais: </h1>
                </div>

                <div className="detalhes">
                    <h1>{recompensa.nome}</h1>
                    <p><strong>Preço: </strong>{recompensa.preco} pts</p>
                    <br />
                    <p>{recompensa.descricao}</p>
                    <br />

                    <div className="botoes">
                        <button>Comprar</button>
                    </div>
                </div>
            </div>    
        
        </div>
    );
}

export default DetalhesRecompensa;