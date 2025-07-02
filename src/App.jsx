import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'

function App() {
  return (
    <section>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<h1>Não encontrado</h1>} />
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App
