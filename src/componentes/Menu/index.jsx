import { Link } from "react-router";

// Componente de menu principal do sistema
export default function Menu() {
    // Renderiza o cabeçalho com os links de navegação
    return (
        <header className="bg-gray-800 text-white shadow-md">
            <nav className="flex items-center justify-center gap-8 p-4 text-lg font-semibold">
                <Link
                    to="/"
                    className="hover:text-purple-400 transition-colors"
                >
                    Início
                </Link>
                <Link
                    to="/transacao"
                    className="hover:text-purple-400 transition-colors"
                >
                    Transações
                </Link>
                <Link
                    to="/categoria"
                    className="hover:text-purple-400 transition-colors"
                >
                    Categorias
                </Link>
                <Link
                    to="/conta"
                    className="hover:text-purple-400 transition-colors"
                >
                    Contas
                </Link>
            </nav>
        </header>
    );
}
