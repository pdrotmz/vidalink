import React, { useState } from 'react';
import '../styles/submeterComprovante.css';
import Header from "../Components/Header";
import uploadIcon from "../Assets/images/uploadIcon.png";
import logo from "../Assets/images/logoVidaLink.png";

const SubmeterComprovante = () => {
    const [donorId, setDonorId] = useState("");
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log("Arquivo selecionado:", selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !donorId) {
            alert("Preencha todos os campos");
            return;
        }

        const formData = new FormData();
        formData.append("donorId", donorId);
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:8083/submissions", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Erro no envio");
            }

            const data = await response.json();
            alert("Comprovante enviado com sucesso!");
            console.log(data);
        } catch (error) {
            alert("Erro ao enviar comprovante.");
            console.error(error);
        }
    };

    return (
        <div>
            <Header />
            <div className="submeterContent">
                <img src={logo} alt="Logo VidaLink" className="logoImage" />
                <h2>Submeter Comprovante</h2>

                <form onSubmit={handleSubmit} className="uploadForm">
                    <div className="uploadBox">
                        <label htmlFor="file-upload" className="uploadLabel">
                            <img src={uploadIcon} alt="Upload" />
                            <span>Arraste ou clique para fazer upload do arquivo.</span>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </div>

                    {file && (
                        <p className="arquivoSelecionado">
                            Arquivo selecionado: <strong>{file.name}</strong>
                        </p>
                    )}

                    <div className="inputGroup">
                        <label htmlFor="donorId">ID do Usuário:</label>
                        <input
                            type="text"
                            id="donorId"
                            value={donorId}
                            onChange={(e) => setDonorId(e.target.value)}
                        />
                    </div>

                    <div className="btnGroup">
                        <button type="submit" className="btnSubmit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmeterComprovante;
