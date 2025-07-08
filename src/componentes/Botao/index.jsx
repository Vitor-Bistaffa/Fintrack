export default function Botao({texto, onClick}) {
    return (
        <button onClick={onClick}>
            {texto}
        </button>
    )
}