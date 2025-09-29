import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Grafico({ receitas, despesas }) {
    const meses = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];

    const dados = meses.map((nome, i) => {
        const mesNum = i + 1;
        return {
            mes: nome,
            receita: receitas.find(r => r.mes === mesNum)?.total || 0,
            despesa: despesas.find(d => d.mes === mesNum)?.total || 0,
        };
    });

    return (
        <div className="p-6 flex justify-center">
            <ResponsiveContainer width="50%" height={400}>
                <LineChart data={dados}>
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="receita" stroke="#22c55e" />
                    <Line type="monotone" dataKey="despesa" stroke="#ef4444" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
