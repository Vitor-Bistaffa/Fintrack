import { useState, useEffect } from "react";

export default function Formulario({ endpoint, campos }) {

    const [dados, setDados] = useState({});
    const [lista, setLista] = useState({
        contas: [],
        categorias: [],
        tipos: ["Receita", "Despesa"]
    });
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        buscaListas();
    }, []);

    const aoEnviar = async (evento) => {
        evento.preventDefault();

        try {
            console.log(JSON.stringify(dados))
            const resposta = await fetch(`http://localhost:8080/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                setMensagem("✅ Dados enviados com sucesso!");
                setDados({});
            } else {
                setMensagem("❌ Erro ao enviar os dados.");
            }
        } catch (erro) {
            console.error("Erro:", erro);
            setMensagem("❌ Erro ao enviar.");
        }
    };

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

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <form
                onSubmit={aoEnviar}
                className="flex flex-col gap-6 w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl"
            >
                <h2 className="text-2xl font-bold text-center text-gray-100 mb-2">
                    Formulário de {endpoint}
                </h2>

                {campos.map((campo) => (
                    <div key={campo.nome} className="flex flex-col">
                        <label className="mb-1 text-sm font-semibold text-gray-200">{campo.label}</label>
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
                        ) : (
                            <input
                                className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                type={campo.tipo}
                                value={dados[campo.nome] || ""}
                                onChange={(evento) =>
                                    setDados({ ...dados, [campo.nome]: evento.target.value })
                                }
                                required
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors font-semibold"
                >
                    Enviar
                </button>

                {mensagem && (
                    <p className={`text-center text-sm font-medium ${mensagem.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
                        {mensagem}
                    </p>
                )}
            </form>
        </section>
    );
}
