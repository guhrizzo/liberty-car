import React, { useState } from "react";
import axios from "axios";
import './Form.css'
import { useDark } from "./context/DarkModeContext";
import Switch from "./Switch";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "./Loader";
import InputMask from 'react-input-mask-next';

function Form() {
    const [startDate, setStartDate] = useState(null);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [numContrato, setNumContrato] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [valorFibe, setValorFibe] = useState('');
    const [anoVeiculo, setAnoVeiculo] = useState('');
    const [divida, setDivida] = useState('');
    const [ipva, setIpva] = useState('');
    const [licenciamento, setLicenciamento] = useState('');
    const [multas, setMultas] = useState('');
    const [pecasReparo, setPecasReparo] = useState('');
    const [observacao, setObservacao] = useState('');
    const [proposta, setProposta] = useState('');
    const [parcelasTotais, setParcelasTotais] = useState('');
    const [parcelasPagas, setParcelasPagas] = useState('');
    const [parcelasAtrasadas, setParcelasAtrasadas] = useState('');
    const [valorPecasReparadas, setValorPecasReparadas] = useState('');
    const [valorParcela, setValorParcela] = useState('');

    const [loading, setLoading] = useState(false);

    function handleNomeChange(e) {
        let valor = e.target.value;
        valor = valor.replace(/\b\w/g, (l) => l.toUpperCase());
        setNome(valor);
    }

    const handleNumContratoChange = (e) => setNumContrato(e.target.value);
    const handleValorParcelaChange = (e) => setValorParcela(e.target.value);
    const handleMarcaChange = (e) => setMarca(e.target.value);
    const handleModeloChange = (e) => setModelo(e.target.value);
    const handlePlacaChange = (e) => setPlaca(e.target.value);
    const handleValorFibeChange = (e) => setValorFibe(e.target.value);
    const handleAnoVeiculoChange = (e) => setAnoVeiculo(e.target.value);
    const handleDividaChange = (e) => setDivida(e.target.value);
    const handleIpvaChange = (e) => setIpva(e.target.value);
    const handleLicenciamentoChange = (e) => setLicenciamento(e.target.value);
    const handleMultasChange = (e) => setMultas(e.target.value);
    const handlePecasReparoChange = (e) => setPecasReparo(e.target.value);
    const handleObservacaoChange = (e) => setObservacao(e.target.value);
    const handlePropostaChange = (e) => setProposta(e.target.value);
    const handleParcelasTotaisChange = (e) => setParcelasTotais(e.target.value);
    const handleParcelasPagasChange = (e) => setParcelasPagas(e.target.value);
    const handleParcelasAtrasadasChange = (e) => setParcelasAtrasadas(e.target.value);
    const handleValorPecasReparadasChange = (e) => setValorPecasReparadas(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            nome,
            cpf,
            dataContrato: startDate ? startDate.toLocaleDateString('pt-BR') : '',
            numContrato: numContrato,
            marca,
            modelo,
            placa,
            valorFibe: valorFibe,
            anoVeiculo: anoVeiculo,
            divida,
            ipva,
            licenciamento,
            multas,
            pecasReparo: pecasReparo,
            observacao,
            proposta,
            parcelasTotais: parcelasTotais,
            parcelasPagas: parcelasPagas,
            parcelasAtrasadas: parcelasAtrasadas,
            valor_parcela: valorParcela,
            valorPecasReparadas: valorPecasReparadas
        };

        setLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:8080/gerar-pdf", payload, { responseType: "blob" });
            const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Proposta.pdf");
            document.body.appendChild(link);
            link.click();
            console.log(payload);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const { darkMode } = useDark();

    function formatCpf(value) {

        value = value.replace(/\D/g, "");
        value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return value;
    }

    function handleCpfChange(e) {
        const raw = e.target.value;
        const formatted = formatCpf(raw);
        setCpf(formatted);
    }



    return (
        <div className={`container ${darkMode ? 'dark' : ''}`}>
            <div className="input-change-mode">
                <Switch />
            </div>

            <form onSubmit={handleSubmit} className={`form ${darkMode ? 'dark' : ''}`}>
                <h1 className="form-title">Gerar Proposta PDF</h1>
                <div className="personal-info">
                    <div className="input-group">
                        <input name="nome" id="nome" placeholder="Nome" onChange={handleNomeChange}
                            value={nome}
                            autoCapitalize="words"
                            autoComplete="off"
                            className="input" />
                        <label for="nome" className="label">*Obrigatório</label>
                    </div>
                    <div className="input-group">
                        <input name="cpf" id="cpf" placeholder="CPF" autoComplete="off" className="input"
                            value={cpf}
                            onChange={handleCpfChange}
                            maxLength={14}
                        />
                        <label htmlFor="cpf" className="label">*Obrigatório</label>
                    </div>
                    <div className="input-group">
                        <DatePicker
                            className="input"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Data do contrato"
                            popperClassName="datepicker-popper"
                            dateFormat="dd/MM/yyyy"
                            id="data-contrato"
                            onKeyDown={(e) => e.preventDefault()}
                            onChangeRaw={(e) => e.preventDefault()}
                            autoComplete="off"
                        />
                        <i class="bi bi-trash-fill trash-icon" id="reset-form" onClick={() => setStartDate(null)}></i>
                        <label for="data-contrato" className="label">*Obrigatório</label>
                    </div>
                    <div className="input-group">
                        <input name="num_contrato" placeholder="Numero do Contrato" id="num_contrato"
                            onChange={handleNumContratoChange} value={numContrato}
                            autoComplete="off" className="input" />
                        <label for="num-contrato" className="label">*Obrigatório</label>
                    </div>
                </div>
                <div className="car-info">
                    <div className="input-group">
                        <input name="marca" id="marca" placeholder="Marca" onChange={handleMarcaChange} autoComplete="off" className="input" />
                        <label for="marca" className="label">*Obrigatório</label>
                    </div>
                    <div className="input-group">
                        <input name="modelo" id="modelo" placeholder="Modelo" onChange={handleModeloChange} autoComplete="off" className="input" />
                        <label for="modelo" className="label">*Obrigatório</label>
                    </div>
                    <div className="input-group">
                        <input name="placa" id="placa" placeholder="Placa" onChange={handlePlacaChange} autoComplete="off" className="input" />
                        <label for="placa" className="label">*Obrigatório</label>
                    </div>
                    <div className="input-group">
                        <input name="valor-fibe" id="fibe" placeholder="Valor da Fibe" onChange={handleValorFibeChange} autoComplete="off" className="input" />
                        <label for="fibe" className="label">*Obrigatório</label>
                    </div>
                </div>
                <div className="current-info">
                    <div className="input-group">
                        <input name="ano-do-veiculo" placeholder="Ano do Veículo" id="ano-veiculo" type="number" min={1980} max={2025} onChange={handleAnoVeiculoChange} className="input" />
                        <label for="ano-veiculo" className="label">*Obrigatório 1980 - 2025</label>
                    </div>
                    <div className="input-group">
                        <input name="divida" type="number" id="divida" placeholder="Valor estimado da Divida" onChange={handleDividaChange} autoComplete="off" className="input" />
                        <label for="divida" className="label">*Obrigatório</label>
                    </div>
                    <div className="input-group">
                        <input name="ipva" id="ipva" placeholder="Valor do IPVA do Veículo" onChange={handleIpvaChange} autoComplete="off" className="input" />
                        <label for="ipva" className="label">*Opcional</label>
                    </div>
                    <div className="input-group">
                        <input name="licenciamento" id="licenciamento" placeholder="Valor do licenciamento do Veículo" onChange={handleLicenciamentoChange} autoComplete="off" className="input" />
                        <label for="licenciamento" className="label">*Opcional</label>
                    </div>
                </div>
                <div className="current-info2">
                    <div className="input-group">
                        <input name="parc-pago" id="parc-pago" placeholder="Parcelas pagas do Veículo" onChange={handleParcelasPagasChange} autoComplete="off" className="input" />
                        <label for="parc-pago" className="label">*Opcional</label>
                    </div>
                    <div className="input-group">
                        <input name="parc-atrasada" id="parc-atrasada" placeholder="Parcelas do Veículo atrasadas" onChange={handleParcelasAtrasadasChange} autoComplete="off" className="input" />
                        <label for="parc-atrasada" className="label">*Opcional</label>
                    </div>
                    <div className="input-group">
                        <input name="parc-total" id="parc-total" placeholder="Parcelas totais do Veículo" onChange={handleParcelasTotaisChange} autoComplete="off" className="input" />
                        <label for="parc-total" className="label">*Opcional</label>
                    </div>
                    <div className="input-group">
                        <input name="valorParc" type="number" id="valorParc"
                            onChange={handleValorParcelaChange}
                            placeholder="Valor das parcelas do Veículo" autoComplete="off" className="input" />
                        <label for="valorParc" className="label">*Opcional</label>
                    </div>
                </div>
                <div className="addicional-info">
                    <div className="input-group">
                        <input name="multas" type="number" id="multas" placeholder="Valor das multas do Veículo" onChange={handleMultasChange} autoComplete="off" className="input" />
                        <label for="multas" className="label">*Opcional</label>
                    </div>
                    <div className="input-group">
                        <input name="pecas-reparo" type="text" id="pecas-reparo" placeholder="Peças que exigem reparo" onChange={handlePecasReparoChange} autoComplete="off" className="input" />
                        <label for="pecas-reparo" className="label">*Opcional</label>
                    </div>
                    <div className="input-group">
                        <input name="repairPecas" id="repairPecas" placeholder="Valor das peças reparadas" onChange={handleValorPecasReparadasChange} autoComplete="off" className="input" /> <label for="repairPecas" className="label">*Opcional</label>
                    </div>
                    {/*
                    <div className="input-group">
                        <input name="observacao" type="text" id="observacao" placeholder="Serviços Adicionais" onChange={handleObservacaoChange} autoComplete="off" className="input" />
                        <label for="observacao" className="label">*Opcional</label>
                    </div>
                    */}

                    <div className="input-group">
                        <input name="proposta"
                            type="text"
                            placeholder="Valor da Proposta" onChange={handlePropostaChange}
                            id="proposta"
                            className="proposta input" autoComplete="off" />
                        <label for="proposta" className="label">*Obrigatório</label>
                    </div>
                </div>
                {!loading && (
                    <button type="button" onClick={handleSubmit} className="shadow_btn">
                        <span className="button-content">Gerar PDF</span>
                        <i className="bi bi-filetype-pdf"></i>
                    </button>
                )}
                {loading && <Loader />}
            </form>
        </div>
    );
}

export default Form;