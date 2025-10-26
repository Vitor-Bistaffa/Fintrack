export default function Botao({ texto, onClick }) {
    
    // Retorna um botão com texto e ação recebidos por props
    return (
        <button onClick={onClick}>
            {texto}
        </button>
    )
}
