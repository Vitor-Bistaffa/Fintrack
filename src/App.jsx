import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Formulario from './componentes/Formulario';
import Menu from './componentes/Menu';
import Lista from './componentes/Lista';
import { transacao, conta, categoria } from './configCampos';
import Grafico from './componentes/Grafico';
import Login from './componentes/Formulario Login';
import RotaPrivada from './Seguranca/rotaPrivada';
// Componente principal da aplicação
function App() {

  // Render principal com rotas do sistema
  return (
    <section>
      <BrowserRouter>

        <Routes>
          {/*Login*/}
          <Route path='/login' element={<Login />} />


          <Route element={<RotaPrivada />}>
            {/* Página inicial com gráfico */}
            <Route path='/geral' element={<Grafico />} />

            {/* Transações */}
            <Route path='/transacao' element={<Lista endpoint="transacao" colapsavel={true} />} />
            <Route path='/transacao/cadastro' element={<Formulario endpoint="transacao" campos={transacao} />} />
            <Route path='/transacao/editar/:id' element={<Formulario endpoint="transacao" campos={transacao} />} />

            {/* Categorias */}
            <Route path='/categoria' element={<Lista endpoint="categoria" />} />
            <Route path='/categoria/cadastro' element={<Formulario endpoint="categoria" campos={categoria} />} />
            <Route path='/categoria/editar/:id' element={<Formulario endpoint="categoria" campos={categoria} />} />

            {/* Contas */}
            <Route path='/conta' element={<Lista endpoint="conta" />} />
            <Route path='/conta/cadastro' element={<Formulario endpoint="conta" campos={conta} />} />
            <Route path='/conta/editar/:id' element={<Formulario endpoint="conta" campos={conta} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
