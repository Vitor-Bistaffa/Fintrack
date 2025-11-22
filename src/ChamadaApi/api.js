import verificaAutenticacao from "../Seguranca/verificaAutenticacao";

const API_URL = "http://localhost:8080";

async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("Bearer");
    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 403) {
        verificaAutenticacao();
    }

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Erro na requisição: ${response.status} - ${error}`);
    }

    try {
        return await response.json();

    } catch {
        return response.ok;

    }
}

export const api = {
    listar: (endpoint, id) =>
        id ?
            apiFetch(`/${endpoint}/${id}`)
            :
            apiFetch(`/${endpoint}`)

    ,

    criar: (endpoint, id, dados) =>
        id ?
            apiFetch(`/${endpoint}`, { method: "PUT", body: JSON.stringify(dados) })
            :
            apiFetch(`/${endpoint}`, { method: "POST", body: JSON.stringify(dados) })
    ,

    deletar: (endpoint, id) => {
        const metodo =
            endpoint == "transacao"
                ?
                "DELETE"
                :
                "PUT";

        apiFetch(`/${endpoint}/remover`, {
            method: `${metodo}`, body: JSON.stringify({ id })
        })


    }
    ,

    totaisPorAno: (tipo, ano) =>
        apiFetch(`/transacao/total?tipo=${tipo}&ano=${ano}`)
    ,

    login: (credenciais) =>
        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credenciais),
        }).then((res) => res.json())
    ,
};
