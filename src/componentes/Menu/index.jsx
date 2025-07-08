import { Link } from "react-router";

export default function Menu() {
    return (
        <header>
            <nav>
                <Link to="/"> Início</Link>
                <Link to="/transacao"> Transações</Link>
                <Link to="/categoria"> Categorias</Link>
                <Link to="/conta "> Contas</Link>
            </nav>
        </header>
    )
}