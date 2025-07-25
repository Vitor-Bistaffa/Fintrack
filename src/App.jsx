import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Formulario from './componentes/Formulario'

function App() {
  const transacao = [
    { nome: "nome", label: "Nome", tipo: "text" },
    { nome: "descricao", label: "Descrição", tipo: "text" },
    { nome: "valor", label: "Valor", tipo: "number" },
    { nome: "fk_id_conta", label: "Conta", tipo: "select", lista: "contas" },
    { nome: "fk_id_categoria", label: "Categoria", tipo: "select", lista: "categorias" },
    { nome: "tipo", label: "Tipo", tipo: "select", lista: "tipos" },
    { nome: "data", label: "Data", tipo: "date" },
    { nome: "parcela", label: "Parcela", tipo: "number" }
  ];

  const conta = [
    { nome: "nome", label: "Nome", tipo: "text" },
  ]

  const categoria = [
    { nome: "nome", label: "Nome", tipo: "text" },
  ]

  return (
    <section>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Formulario endpoint="transacao" campos={transacao} />} />
          <Route path='*' element={<Formulario endpoint="conta" campos={conta} />} />
          <Route path='*' element={<Formulario endpoint="categoria" campos={categoria} />} />
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App