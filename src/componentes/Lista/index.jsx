import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Lista({ endpoint, colapsavel = false }) {
    // Estados principais
    const [dados, setDados] = useState([]);
    const [totais, setTotais] = useState({ receita: 0, despesa: 0 });
    const [erro, setErro] = useState(null);
    const [abertos, setAbertos] = useState({});


    // Data atual
    const hoje = new Date();
    const [mesSelecionado, setMesSelecionado] = useState(String(hoje.getMonth() + 1).padStart(2, "0"));
    const [anoSelecionado, setAnoSelecionado] = useState(String(hoje.getFullYear()));


    // =========================
    // Função para buscar dados da API
    // =========================
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



    // =========================
    // Função para buscar totais de receitas e despesas do mês
    // =========================
    const listaTotais = async () => {
        try {
            const resReceita = await fetch(
                `http://localhost:8080/transacao/total?tipo=Receita&ano=${anoSelecionado}`
            );
            const resDespesa = await fetch(
                `http://localhost:8080/transacao/total?tipo=Despesa&ano=${anoSelecionado}`
            );

            const jsonReceita = await resReceita.json();
            const jsonDespesa = await resDespesa.json();

            const receitaMes = jsonReceita.find((r) => r.mes === parseInt(mesSelecionado));
            const despesaMes = jsonDespesa.find((d) => d.mes === parseInt(mesSelecionado));

            setTotais({
                receita: receitaMes ? receitaMes.total : 0,
                despesa: despesaMes ? despesaMes.total : 0,
            });
        } catch (erro) {
            setErro(erro);
            console.error("Erro:", erro);
        }
    };

    // =========================
    // Define método de remoção
    // =========================
    const metodoRemocao = (endpoint) => {
        switch (endpoint) {
            case "transacao":
                return "DELETE";
            default:
                return "PUT";
        }
    };

    // =========================
    // Remove item
    // =========================
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

    // =========================
    // Alterna categorias (apenas se colapsavel = true)
    // =========================
    const toggleCategoria = (categoria) => {
        setAbertos((prev) => ({
            ...prev,
            [categoria]: !prev[categoria],
        }));
    };

    // =========================
    // useEffect para carregar dados ao montar o componente
    // =========================
    useEffect(() => {
        setDados([]);
        listaTotais();
        listar();
    }, [endpoint, mesSelecionado, anoSelecionado]);

    // Filtrar dados apenas do mês atual
    const dadosMes = dados.filter((item) => {
        if (!item.data) return false;
        const [ano, mes] = item.data.split("-");
        return ano === anoSelecionado && mes === mesSelecionado;
    });

    // =========================
    // Agrupar dados por categoria
    // =========================
    const dadosAgrupados = dadosMes.reduce((acc, item) => {
        const categoria = item.categoria;
        if (!acc[categoria]) acc[categoria] = [];
        acc[categoria].push(item);
        return acc;
    }, {});



    // =========================
    // Colunas da tabela dinamicamente
    // =========================
    const colunas = dados.length > 0 ? Object.keys(dados[0]) : [];



    // =========================
    // Formata os campos da tabela
    // =========================
    const formatarCampo = (coluna, valor, tipo) => {
        // Valor com máscara de moeda
        if (coluna === "valor" && typeof valor === "number") {
            const cor = tipo === "Receita" ? "text-green-400" : tipo === "Despesa" ? "text-red-400" : "";
            return (
                <span className={`font-semibold ${cor}`}>
                    {valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </span>
            );
        }

        // Data formatada sem ajuste de fuso horário
        if (coluna === "data" && typeof valor === "string") {
            const [ano, mes, dia] = valor.split("-");
            return `${dia}/${mes}/${ano}`;
        }

        // Objetos convertidos em JSON
        if (typeof valor === "object" && valor !== null) {
            return JSON.stringify(valor);
        }

        return valor;
    };



    // Renderiza a tabela
    const renderTabela = (itens) => (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-200 border border-gray-700 rounded-lg shadow-md">
                <thead className="bg-gray-700 text-gray-100">
                    <tr>
                        {colunas.map((coluna) => (
                            <th key={coluna} className="px-4 py-3 capitalize">
                                {coluna}
                            </th>
                        ))}
                        <th className="px-4 py-3">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {itens.map((item) => (
                        <tr
                            key={item.id}
                            className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                        >
                            {colunas.map((coluna) => (
                                <td key={coluna} className="px-4 py-2">
                                    {formatarCampo(coluna, item[coluna], item.tipo)}
                                </td>
                            ))}
                            <td className="px-4 py-2 flex gap-2">

                                <Link
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-lg shadow"
                                    to={`/${endpoint}/editar/${item.id}`}
                                >
                                    Editar
                                </Link>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-lg shadow"
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




    // Render principal do componente
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
            <div className="w-full max-w-6xl bg-gray-800 p-8 rounded-2xl shadow-xl">
                {/* Cabeçalho */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-100 capitalize">
                        Lista de {endpoint}
                    </h2>
                    <Link
                        to={`/${endpoint}/cadastro`}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg shadow transition-colors"
                    >
                        + Cadastro
                    </Link>
                </div>
                {colapsavel && (
                    <div className="mb-4">
                        <label className="text-gray-200 font-medium mr-2">Filtrar por mês/ano:</label>
                        <input
                            type="month"
                            value={`${anoSelecionado}-${mesSelecionado}`}
                            onChange={(e) => {
                                const [ano, mes] = e.target.value.split("-");
                                setAnoSelecionado(ano);
                                setMesSelecionado(mes);
                            }}
                            className="px-3 py-2 rounded-lg bg-gray-700 text-gray-100"
                        />
                    </div>
                )}


                {/* Totais */}
                {colapsavel && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-green-700/30 p-4 rounded-lg text-center shadow">
                            <p className="text-sm text-gray-300">Receita</p>
                            <p className="text-2xl font-bold text-green-400">
                                R$ {totais.receita}
                            </p>
                        </div>
                        <div className="bg-red-700/30 p-4 rounded-lg text-center shadow">
                            <p className="text-sm text-gray-300">Despesa</p>
                            <p className="text-2xl font-bold text-red-400">
                                R$ {totais.despesa}
                            </p>
                        </div>
                        <div className="bg-blue-700/30 p-4 rounded-lg text-center shadow">
                            <p className="text-sm text-gray-300">Total</p>
                            <p className="text-2xl font-bold text-blue-400">
                                R$ {totais.receita - totais.despesa}
                            </p>
                        </div>
                    </div>
                )}

                {/* Mensagem de erro */}
                {erro && (
                    <p className="text-red-400 text-center font-medium mb-4">
                        {erro.toString()}
                    </p>
                )}

                {/* Tabelas */}
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
                                        className="w-full text-left px-4 py-3 font-semibold text-gray-100 bg-gray-600 hover:bg-gray-500 rounded-t-lg transition-colors"
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
