import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';
import Formulario from './componentes/Formulario';
import Menu from './componentes/Menu';
import Lista from './componentes/Lista';
import { transacao, conta, categoria } from './configCampos';
import Grafico from './componentes/Grafico';

// Componente principal da aplicação
function App() {

  // Estados principais
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [erro, setErro] = useState(null);

  // Ano fixo para o carregamento dos dados do gráfico
  const [anoSelecionado] = useState(2025);

  // Busca os totais anuais de receitas e despesas
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

  // Render principal com rotas do sistema
  return (
    <section>
      <BrowserRouter>
        <Menu />

        <Routes>
          {/* Página inicial com gráfico */}
          <Route path='/' element={<Grafico receitas={receitas} despesas={despesas} />} />

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
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
