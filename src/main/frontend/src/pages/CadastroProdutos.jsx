import React, {useState} from "react";
import AdmHeader from "../Components/AdmHeader";
import "../styles/CadastroProdutos.css"


export default function CadastroProdutos() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        pointsRequired: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8083/rewards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    pointsRequired: parseInt(formData.pointsRequired),
                })
            });

            if (response.ok) {
                const data = await response.json();
                alert('Recompensa cadastrada com sucesso!');
                console.log(data);
            } else {
                alert('Erro ao cadastrar recompensa');
                console.error(`Status: ${response.status}`);
            }
        } catch (error) {
            alert('Erro ao cadastrar recompensa');
            console.error(error);
        }
    };

    return (
        <div className="containerCadastroProdutos">
            <AdmHeader />
            <div className="CadastroProdutosContent">
                <h1>Cadastro de Recompensas</h1>

                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="esquerda">

                        <label htmlFor="inome">Nome da recompensa</label>
                        <br />
                        <input
                            type="text"
                            placeholder="Nome..."
                            name="name"
                            id="inome"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <br /><br />

                        <label htmlFor="ipreco">Pontos necessários</label>
                        <br />
                        <input
                            type="number"
                            placeholder="Ex: 10"
                            name="pointsRequired"
                            id="ipreco"
                            value={formData.pointsRequired}
                            onChange={handleChange}
                        />
                        <br /><br />

                        <label htmlFor="idescricao">Descrição</label>
                        <br />
                        <textarea
                            placeholder="Descrição da recompensa..."
                            name="description"
                            id="idescricao"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <br /><br />

                    </div>
                    <div className="botoes">
                        <button type="button" className="cancelar" onClick={() => setFormData({ name: '', description: '', pointsRequired: '' })}>Cancelar</button>
                        <button type="submit" className="salvar">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}