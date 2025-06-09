import React, { useState } from 'react';
import '../styles/submeterComprovante.css';
import Header from "../Components/Header";
import uploadIcon from "../Assets/images/uploadIcon.png";
import logo from "../Assets/images/logoVidaLink.png";

const SubmeterComprovante = () => {
    const [emailAuthor, setEmailAuthor] = useState("");
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log("Arquivo selecionado:", selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !emailAuthor) {
            alert("Preencha todos os campos");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("emailAuthor", emailAuthor);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:8083/submissions", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                // NÃO usar credentials: "include" se JWT tá em header, não cookie
            });

            const text = await response.text(); // Para log completo

            console.log("Status:", response.status);
            console.log("Resposta:", text);

            if (!response.ok) {
                alert("Erro ao enviar comprovante.");
                return;
            }

            alert("Comprovante enviado com sucesso!");
        } catch (error) {
            console.error("Erro de rede:", error);
            alert("Erro ao enviar comprovante.");
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
                        <label htmlFor="emailAuthor">Email do Autor:</label>
                        <input
                            type="email"
                            id="emailAuthor"
                            value={emailAuthor}
                            onChange={(e) => setEmailAuthor(e.target.value)}
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