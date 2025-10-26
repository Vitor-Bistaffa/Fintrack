import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Grafico({ receitas = [], despesas = [] }) {

    // Array com nomes dos meses (usado no eixo X)
    const meses = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];

    // Monta os dados do gráfico com base nas receitas e despesas recebidas
    const dados = meses.map((nome, i) => {
        const mesNum = i + 1;
        return {
            mes: nome,
            receita: receitas.find(r => r.mes === mesNum)?.total || 0,
            despesa: despesas.find(d => d.mes === mesNum)?.total || 0,
        };
    });

    // Renderização do gráfico
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
            <div className="w-full max-w-5xl bg-gray-800 p-8 rounded-2xl shadow-xl">
                
                {/* Título do gráfico */}
                <h2 className="text-2xl font-bold text-gray-100 text-center mb-8">
                    Evolução Mensal
                </h2>

                {/* Container responsivo do gráfico */}
                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dados}>
                            {/* Eixo X com os meses */}
                            <XAxis dataKey="mes" stroke="#9CA3AF" />

                            {/* Eixo Y com valores numéricos */}
                            <YAxis stroke="#9CA3AF" />

                            {/* Tooltip personalizado */}
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1F2937",
                                    border: "1px solid #374151",
                                    borderRadius: "8px",
                                    color: "#E5E7EB",
                                }}
                            />

                            {/* Legenda das linhas */}
                            <Legend />

                            {/* Linha verde → receitas */}
                            <Line
                                type="monotone"
                                dataKey="receita"
                                stroke="#22c55e"
                                strokeWidth={3}
                                dot={{ r: 5 }}
                                name="Receita"
                            />

                            {/* Linha vermelha → despesas */}
                            <Line
                                type="monotone"
                                dataKey="despesa"
                                stroke="#ef4444"
                                strokeWidth={3}
                                dot={{ r: 5 }}
                                name="Despesa"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}
