import { Link } from "react-router";
import { useState } from "react";

export default function Menu() {
    const [open, setOpen] = useState(false);

    const nome = localStorage.getItem("User") || "Usuário";

    function sair() {
        localStorage.removeItem("Bearer");
        localStorage.removeItem("User");
        window.location.href = "/";
    }

    return (
        <header className="bg-gray-800 text-white shadow-md">
            <nav className="relative flex items-center p-4">

                <div className="w-32"></div>

                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8 text-lg font-semibold">
                    <Link to="/geral" className="hover:text-purple-400 transition-colors">Início</Link>
                    <Link to="/transacao" className="hover:text-purple-400 transition-colors">Transações</Link>
                    <Link to="/categoria" className="hover:text-purple-400 transition-colors">Categorias</Link>
                    <Link to="/conta" className="hover:text-purple-400 transition-colors">Contas</Link>
                </div>

                <div className="ml-auto relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        Configurações
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40">
                            <button
                                onClick={sair}
                                className="w-full text-left px-4 py-2 hover:bg-gray-200"
                            >
                                Sair
                            </button>
                        </div>
                    )}
                </div>

            </nav>
        </header>
    );
}
