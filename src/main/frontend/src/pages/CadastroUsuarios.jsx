import React from "react";

import "../Styles/CadastroUsuarios.css"

export const CadastroUsuarios = () => {

    return (
        <div className="content">
            <h2 className="titulo">
                Salve vidas com um simples gesto! Cadastre-se<br />e faça a diferença na vida de quem precisa.
            </h2>
            <div className="container">
                <form>
                    <div className="form-group">
                        <input type="text" placeholder="Nome Completo" required />
                    </div>
                    <div className="form-group row">
                        <input type="text" placeholder="CPF" required />
                        <input type="text" placeholder="RG" required />
                    </div>
                    <div className="form-group">
                        <select required>
                            <option value="">Tipo Sanguíneo</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="form-group genero-data">
                        <label className="genero-label">Qual seu gênero?</label>
                        <div className="row">
                            <label>
                                <input type="radio" name="gender" value="Masculino" /> Masculino
                            </label>
                            <label>
                                <input type="radio" name="gender" value="Feminino" /> Feminino
                            </label>
                            <input type="date" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <input type="email" placeholder="Email" required />
                        <input type="text" placeholder="Telefone" required />
                    </div>
                    <div className="form-group row">
                        <input type="text" placeholder="Cidade" required />
                        <select required>
                            <option value="">Selecione o Estado</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                    <div className="form-group row">
                        <input type="text" placeholder="Endereço" required />
                        <input type="text" placeholder="Número" required />
                    </div>
                    <p className="terms">
                        <img src="imagens/question.png" alt="" className="terms-icone" />
                        Ao clicar no botão cadastre-se você aceita os <strong>Termos de Uso e Privacidade</strong>
                    </p>
                    <button className="button" type="submit">CADASTRAR</button>
                </form>
            </div>
        </div>
    );
}

export default CadastroUsuarios;