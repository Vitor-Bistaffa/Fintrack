import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Formulario from './componentes/Formulario'
import Menu from './componentes/Menu';
import Lista from './componentes/Lista';

function App() {
  const transacao = [
    { nome: "nome", label: "Nome", tipo: "text" },
    { nome: "descricao", label: "Descrição", tipo: "text" },
    { nome: "valor", label: "Valor", tipo: "number" },
    { nome: "conta", label: "Conta", tipo: "select", lista: "contas" },
    { nome: "categoria", label: "Categoria", tipo: "select", lista: "categorias" },
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
        <Menu />
        <Routes>
          <Route path='/transacao' element={<Lista endpoint="transacao" colapsavel={true} />} />
          <Route path='/transacao/cadastro' element={<Formulario endpoint="transacao" campos={transacao} />} />

          <Route path='/categoria' element={<Lista endpoint="categoria" />} />
          <Route path='categoria/cadastro' element={<Formulario endpoint="categoria" campos={categoria} />} />

          <Route path='/conta' element={<Lista endpoint="conta" />} />
          <Route path='/conta/cadastro' element={<Formulario endpoint="conta" campos={conta} />} />

        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App