import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../ChamadaApi/api";

export default function Login() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({ login: "", senha: "" });
  const [mensagem, setMensagem] = useState("");

  const aoEnviar = async (evento) => {
    evento.preventDefault();

    try {
      const json = await api.login(dados);
      localStorage.setItem("Bearer", json.token);
      localStorage.setItem("User",dados.login)
      setMensagem("✅ Login realizado com sucesso!");
      navigate("/geral");
    } catch (erro) {
      console.error("Erro:", erro);
      setMensagem("❌ Usuário ou senha inválidos.");
    }

  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={aoEnviar}
        className="flex flex-col gap-6 w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-2">
          Login
        </h2>

        {/* Login */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-200">Usuário</label>
          <input
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="text"
            value={dados.login}
            onChange={(e) => setDados({ ...dados, login: e.target.value })}
            required
          />
        </div>

        {/* Senha */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-200">Senha</label>
          <input
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="password"
            value={dados.senha}
            onChange={(e) => setDados({ ...dados, senha: e.target.value })}
            required
          />
        </div>

        {/* Botão de envio */}
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors font-semibold"
        >
          Entrar
        </button>

        {/* Mensagem */}
        {mensagem && (
          <p className={`text-center text-sm font-medium ${mensagem.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
            {mensagem}
          </p>
        )}
      </form>
    </section>
  );
}
