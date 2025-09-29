import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { useEffect, useState } from 'react'; // <-- IMPORTANTE
import Formulario from './componentes/Formulario'
import Menu from './componentes/Menu';
import Lista from './componentes/Lista';
import { transacao, conta, categoria } from './configCampos'
import Grafico from './componentes/Grafico';

function App() {

  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [erro, setErro] = useState(null);


  const [anoSelecionado] = useState(2025);

  useEffect(() => {
    const listaTotais = async () => {
      try {
        const resReceita = await fetch(
          `http://localhost:8080/transacao/total?tipo=Receita&ano=${anoSelecionado}`
        );
        const resDespesa = await fetch(
          `http://localhost:8080/transacao/total?tipo=Despesa&ano=${anoSelecionado}`
        );

        const jsonReceita = await resReceita.json();
        const jsonDespesa = await resDespesa.json();

        setReceitas(jsonReceita);
        setDespesas(jsonDespesa);
      } catch (erro) {
        setErro(erro);
        console.error("Erro:", erro);
      }
    };

    listaTotais();
  }, [anoSelecionado]);

  return (
    <section>


      <BrowserRouter>
        <Menu />

        <Routes>
          <Route path='/' element={<Grafico receitas={receitas} despesas={despesas} />} />

          <Route path='/transacao' element={<Lista endpoint="transacao" colapsavel={true} />} />
          <Route path='/transacao/cadastro' element={<Formulario endpoint="transacao" campos={transacao} />} />
          <Route path='/transacao/editar/:id' element={<Formulario endpoint="transacao" campos={transacao} />} />

          <Route path='/categoria' element={<Lista endpoint="categoria" />} />
          <Route path='/categoria/cadastro' element={<Formulario endpoint="categoria" campos={categoria} />} />
          <Route path='/categoria/editar/:id' element={<Formulario endpoint="categoria" campos={categoria} />} />

          <Route path='/conta' element={<Lista endpoint="conta" />} />
          <Route path='/conta/cadastro' element={<Formulario endpoint="conta" campos={conta} />} />
          <Route path='/conta/editar/:id' element={<Formulario endpoint="conta" campos={conta} />} />
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App;
