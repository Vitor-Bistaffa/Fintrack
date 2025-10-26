import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Formulario({ endpoint, campos, itens }) {
    // Hook de navegação e parâmetro da URL
    const navigate = useNavigate();
    const { id } = useParams();

    // Estados principais do formulário
    const [dados, setDados] = useState({});
    const [lista, setLista] = useState({
        contas: [],
        categorias: [],
        tipos: ["Receita", "Despesa"]
    });
    const [mensagem, setMensagem] = useState('');

    // useEffect inicial → busca listas e carrega item caso exista ID
    useEffect(() => {
        buscaListas();
        if (id) {
            fetch(`http://localhost:8080/${endpoint}?id=${id}`)
                .then((res) => res.json())
                .then((json) => setDados(json[0]))
                .catch((erro) => console.error("Erro ao carregar os itens", erro));
        }
    }, []);

    // Função chamada ao enviar o formulário
    const aoEnviar = async (evento) => {
        evento.preventDefault();

        // Caso esteja editando (ID presente)
        if (id) {
            try {
                const resposta = await fetch(`http://localhost:8080/${endpoint}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });

                if (resposta.ok) {
                    setMensagem("✅ Dados enviados com sucesso!");
                    navigate(`/${endpoint}`); // Redireciona após editar
                } else {
                    setMensagem("❌ Erro ao enviar os dados.");
                }
            } catch (erro) {
                console.error("Erro:", erro);
                setMensagem("❌ Erro ao enviar.");
            }

        // Caso seja um novo cadastro
        } else {
            try {
                console.log(JSON.stringify(dados));
                const resposta = await fetch(`http://localhost:8080/${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });

                if (resposta.ok) {
                    setMensagem("✅ Dados enviados com sucesso!");
                    setDados({}); // Limpa os campos após envio
                } else {
                    setMensagem("❌ Erro ao enviar os dados.");
                }
            } catch (erro) {
                console.error("Erro:", erro);
                setMensagem("❌ Erro ao enviar.");
            }
        }
    };

    // Busca listas de contas e categorias
    const buscaListas = async () => {
        try {
            const resContas = await fetch("http://localhost:8080/conta");
            const contasJson = await resContas.json();

            const resCategorias = await fetch("http://localhost:8080/categoria");
            const categoriasJson = await resCategorias.json();

            setLista((listaAtual) => ({
                ...listaAtual,
                contas: contasJson,
                categorias: categoriasJson
            }));
        } catch (erro) {
            console.error("Erro ao buscar listas:", erro);
            setMensagem("❌ Erro ao buscar dados.");
        }
    };

    // Formata o valor do campo 'valor' para moeda BRL
    const formatarMoeda = (valor) => {
        if (!valor) return "";
        const numero = Number(valor.replace(/\D/g, "")) / 100;
        return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    };

    // Estrutura do formulário
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <form
                onSubmit={aoEnviar}
                className="flex flex-col gap-6 w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl"
            >
                {/* Título */}
                <h2 className="text-2xl font-bold text-center text-gray-100 mb-2">
                    Formulário de {endpoint}
                </h2>
    
                {/* Renderiza os campos dinamicamente */}
                {campos.map((campo) => (
                    <div key={campo.nome} className="flex flex-col">
                        <label className="mb-1 text-sm font-semibold text-gray-200">{campo.label}</label>

                        {/* Campo do tipo select */}
                        {campo.tipo === "select" ? (
                            <select
                                className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={dados[campo.nome] || ""}
                                onChange={(evento) =>
                                    setDados({ ...dados, [campo.nome]: evento.target.value })
                                }
                                required
                            >
                                <option value="">Selecione...</option>
                                {lista[campo.lista]?.map((item, index) => (
                                    <option key={index} value={item.id || item}>
                                        {item.nome || item}
                                    </option>
                                ))}
                            </select>

                        // Campo do tipo input
                        ) : (
                            <input
                                className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                type={campo.nome === "valor" ? "text" : campo.tipo}
                                value={
                                    campo.nome === "valor"
                                        ? formatarMoeda(dados[campo.nome]?.toString() || "")
                                        : dados[campo.nome] || ""
                                }
                                onChange={(evento) => {
                                    let valor = evento.target.value;

                                    // Tratamento especial para o campo de valor
                                    if (campo.nome === "valor") {
                                        const numero = valor.replace(/\D/g, "");
                                        const decimal = (Number(numero) / 100).toFixed(2);
                                        setDados({ ...dados, [campo.nome]: decimal });
                                    } else {
                                        setDados({ ...dados, [campo.nome]: valor });
                                    }
                                }}
                                required={campo.nome !== "descricao"}
                            />
                        )}
                    </div>
                ))}

                {/* Botão de envio */}
                <button
                    type="submit"
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors font-semibold"
                >
                    Enviar
                </button>

                {/* Exibição da mensagem de status */}
                {mensagem && (
                    <p className={`text-center text-sm font-medium ${mensagem.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
                        {mensagem}
                    </p>
                )}
            </form>
        </section>
    );
}
