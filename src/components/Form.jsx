import { useEffect, useState } from 'react';
import './App.css'
function Form() {
    const [envio, setEnvio] = useState(false)
    const [cep, setCep] = useState('')
    const [rua, setRua] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')

    useEffect(() => {
        async function fetchAddress() {
            if (cep.length === 8) {
                console.log("aqui")
                const url = `https://viacep.com.br/ws/${cep}/json/`;

                try {
                    const url = `https://viacep.com.br/ws/${cep}/json/`;
                    fetch(url)
                        .then(response => {
                            response.json().then(data => {
                                setRua(data.logradouro);
                                setBairro(data.bairro);
                                setCidade(data.localidade);
                            });
                        });
                } catch (error) {
                    console.error('Erro ao buscar endereço:', error);
                }
            }
        }

        fetchAddress();
    }, [cep]);

    const sendForm = (event) => {
        event.preventDefault();

        if (cep?.length <= 0) {
            alert('Preencha o campo CEP');
        } else if (cep?.length > 0 && cep?.length < 8) {
            alert('Preencha o campo CEP corretamente');
        }
    }

    return (
        <>
            <div className="main">
                <h1>Integração com API</h1>
                <form className="form" onSubmit={sendForm}>
                    <label>CEP</label>
                    <input type="number" id="cep" onChange={(e) => setCep(e.target.value)} value={cep}></input>
                    <label>Logradouro</label>
                    <input type="text" id="rua" value={rua} disabled></input>
                    <label>Numero</label>
                    <input type="number"></input>
                    <label>Bairro</label>
                    <input type="text" id="bairro" value={bairro} disabled></input>
                    <label>Cidade</label>
                    <input type="text" id="cidade" value={cidade} disabled></input>
                </form>
            </div>
        </>
    );
}

export default Form;