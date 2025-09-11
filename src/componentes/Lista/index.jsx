import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Lista({ endpoint, colapsavel = false }) {
    const [dados, setDados] = useState([]);
    const [totais, setTotais] = useState({ receita: 0, despesa: 0 });
    const [erro, setErro] = useState(null);
    const [abertos, setAbertos] = useState({});

    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = String(hoje.getMonth() + 1).padStart(2, "0");

    const dadosMes = dados.filter((item) => {
        if (!item.data) return false;
        const [ano, mes] = item.data.split("-");
        return ano === anoAtual.toString() && mes === mesAtual;
    });

    // Buscar dados da API
    const listar = async () => {
        try {
            const resposta = await fetch(`http://localhost:8080/${endpoint}`);
            const json = await resposta.json();
            setDados(json);
        } catch (erro) {
            setErro(erro);
            console.error("Erro:", erro);
        }
    };

    // Busca totais da transações
    const listaTotais = async () => {
        try {
            const resReceita = await fetch(
                `http://localhost:8080/transacao/total?tipo=Receita&ano=${anoAtual}`
            );
            const resDespesa = await fetch(
                `http://localhost:8080/transacao/total?tipo=Despesa&ano=${anoAtual}`
            );

            const jsonReceita = await resReceita.json();
            const jsonDespesa = await resDespesa.json();

            const receitaMes = jsonReceita.find((r) => r.mes === parseInt(mesAtual));
            const despesaMes = jsonDespesa.find((d) => d.mes === parseInt(mesAtual));

            setTotais({
                receita: receitaMes ? receitaMes.total : 0,
                despesa: despesaMes ? despesaMes.total : 0,
            });

            // console.log(despesaMes)
        } catch (erro) {
            setErro(erro);
            console.error("Erro:", erro);
        }
    };

    // Define método de remoção
    const metodoRemocao = (endpoint) => {
        switch (endpoint) {
            case "transacao":
                return "DELETE";
            default:
                return "PUT";
        }
    };

    // Remove item
    const remover = async (id) => {
        try {
            const resposta = await fetch(
                `http://localhost:8080/${endpoint}/remover`,
                {
                    method: metodoRemocao(endpoint),
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id }),
                }
            );
            if (resposta.ok) listar();
        } catch (erro) {
            setErro(erro);
            console.error("Erro:", erro);
        }
    };

    // Alterna categorias (apenas se colapsavel = true)
    const toggleCategoria = (categoria) => {
        setAbertos((prev) => ({
            ...prev,
            [categoria]: !prev[categoria],
        }));
    };

    useEffect(() => {
        listaTotais();
        listar();
    }, [endpoint]);

    // Agrupar por categoria
    const dadosAgrupados = dadosMes.reduce((acc, item) => {
        const categoria = item.categoria;
        if (!acc[categoria]) acc[categoria] = [];
        acc[categoria].push(item);
        return acc;
    }, {});

    // Cabeçalhos da tabela dinamicamente
    const colunas = dados.length > 0 ? Object.keys(dados[0]) : [];

    // Função para formatar campos
    const formatarCampo = (coluna, valor) => {
        if (coluna === "valor" && typeof valor === "number") {
            return (
                <span>

                    {valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </span>
            );
        }

        if (coluna === "data" && typeof valor === "string") {
            const data = new Date(valor);
            return data.toLocaleDateString("pt-BR");
        }

        if (typeof valor === "object" && valor !== null) {
            return JSON.stringify(valor);
        }

        return valor;
    };

    // Renderiza uma tabela de itens
    const renderTabela = (itens) => (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300 border border-gray-600 rounded-lg">
                <thead className="bg-gray-700 text-gray-100">
                    <tr>
                        {colunas.map((coluna) => (
                            <th key={coluna} className="px-4 py-2 capitalize">
                                {coluna}
                            </th>
                        ))}
                        <th className="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {itens.map((item) => (
                        <tr
                            key={item.id}
                            className="border-t border-gray-600 hover:bg-gray-800"
                        >
                            {colunas.map((coluna) => (
                                <td key={coluna} className="px-4 py-2">
                                    {formatarCampo(coluna, item[coluna])}
                                </td>
                            ))}
                            <td className="px-4 py-2 flex gap-2">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded"
                                    onClick={() =>
                                        alert("Função editar em construção")
                                    }
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
                                    onClick={() => remover(item.id)}
                                >
                                    Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-6xl bg-gray-800 p-8 rounded-2xl shadow-xl">
                <Link
                    to={`/${endpoint}/cadastro`}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition-colors"
                >
                    Cadastro
                </Link>

                <h2 className="text-2xl font-bold text-center text-gray-100 mb-6 capitalize">
                    Lista de {endpoint}
                </h2>

                {colapsavel ? (
                    <h3 className="text-center text-lg mb-4 text-gray-200">
                        Receita:{" "}
                        <span className="text-green-400 font-semibold">
                            R$ {totais.receita}
                        </span>{" "}
                        | Despesa:{" "}
                        <span className="text-red-400 font-semibold">
                            R$ {totais.despesa}
                        </span>{" "}
                        | Total:{" "}
                        <span className="font-semibold">
                            R$ {totais.receita - totais.despesa}
                        </span>
                    </h3>
                ) : null}

                {erro && (
                    <p className="text-red-400 text-center font-medium mb-4">
                        {erro.toString()}
                    </p>
                )}

                <div className="space-y-6">
                    {colapsavel
                        ? Object.entries(dadosAgrupados).map(
                            ([categoria, itens]) => (
                                <div
                                    key={categoria}
                                    className="bg-gray-700 rounded-lg shadow"
                                >
                                    <button
                                        onClick={() =>
                                            toggleCategoria(categoria)
                                        }
                                        className="w-full text-left px-4 py-3 font-semibold text-gray-100 bg-gray-600 hover:bg-gray-500 rounded-t-lg"
                                    >
                                        {categoria} ({itens.length})
                                    </button>

                                    {abertos[categoria] && (
                                        <div className="p-4">
                                            {renderTabela(itens)}
                                        </div>
                                    )}
                                </div>
                            )
                        )
                        : renderTabela(dados)}
                </div>
            </div>
        </section>
    );
}
