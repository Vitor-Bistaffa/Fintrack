import { useState } from "react";

export default function Formulario({ endpoint }) {

    const [nome, setNome] = useState('');
    const [mensagem, setMensagem] = useState('');


    const aoEnviar = async (evento) => {
        evento.preventDefault();
        try {
            const resposta = await fetch(`http://localhostl:8080/${endpoint}`
                , {
                    method: 'post'
                    , headers: {
                        'Content-Type': 'application/json'
                    }
                    , body: JSON.stringify({ nome })
                }
            )
        } catch (erro) {
            console.error("Erro:", erro);
            setMensagem("Erro:", erro);
        }


    }

    return (
        <form onSubmit={aoEnviar}>
            <label>Nome:</label>
            <input
                type='text'
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                required
            />

            <button type="submit"> Enviar</button>

            {mensagem && <p>{mensagem}</p>}
        </form>
    )
}