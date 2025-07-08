import { useEffect, useState } from "react";
import estilo from './Lista.module.css'
import Botao from "../Botao";

export default function Lista({ endpoint }) {
    const [dados, setDados] = useState([]);
    const [erro, setErro] = useState(null);



    const listar = async () => {
        try {
            const resposta = await fetch(`http://localhost:8080/${endpoint}`);
            const json = await resposta.json();
            setDados(json);
        } catch (erro) {
            setErro(erro);
            console.error("Erro:", erro);
        }
    }

    const metodoRemocao = (endpoint) => {
        switch (endpoint) {
            case "transacao":
                return "delete"
            default:
                return "put"
        }
    }

    const Remover = async (id) => {
        try {
            const resposta = await fetch(`http://localhost:8080/${endpoint}/remover`, {
                method: metodoRemocao(endpoint)
                , headers: {
                    "Content-Type": "application/json"
                }
                , body: JSON.stringify({ id })
            });

            if (resposta.ok) { listar(); }
        } catch (erro) {
            setErro(erro);
            console.error("Erro:", erro);
        }
    }

    const atualizar = async (id) => {
        
    }

    useEffect(() => {
        listar();
    }, [endpoint]);


    return (
        <section>
            <h2>{endpoint}</h2>
            {erro && <p style={{ color: 'red' }}>{erro.toString()}</p>}
            <ul>
                {dados.map((item) => (
                    <li key={item.id} className={estilo.li}>
                        {Object.entries(item).map(([chave, valor]) => (
                            <p key={chave}>{valor}</p>
                        ))}
                        <Botao texto="Editar" />
                        <Botao texto="Remover" onClick={() => Remover(item.id)} />
                    </li>
                ))}
            </ul>
        </section>
    )
}