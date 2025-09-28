import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Formulario from './componentes/Formulario'
import Menu from './componentes/Menu';
import Lista from './componentes/Lista';
import { transacao, conta, categoria } from './configCampos'

function App() {

  return (
    <section>

      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path='/transacao' element={<Lista endpoint="transacao" colapsavel={true} />} />
          <Route path='/transacao/cadastro' element={<Formulario endpoint="transacao" campos={transacao} />} />
          <Route path='/transacao/editar/:id' element={<Formulario endpoint="transacao" campos={transacao} />} />

          <Route path='/categoria' element={<Lista endpoint="categoria" />} />
          <Route path='categoria/cadastro' element={<Formulario endpoint="categoria" campos={categoria} />} />
          <Route path='categoria/editar/:id' element={<Formulario endpoint="categoria" campos={categoria} />} />

          <Route path='/conta' element={<Lista endpoint="conta" />} />
          <Route path='/conta/cadastro' element={<Formulario endpoint="conta" campos={conta} />} />
          <Route path='/conta/editar/:id' element={<Formulario endpoint="conta" campos={conta} />} />

        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App