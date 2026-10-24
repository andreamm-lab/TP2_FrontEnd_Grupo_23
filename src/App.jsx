import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Inicio, Perfil } from './modules/equipo'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/equipo/:slug" element={<Perfil />} />
          <Route path="*" element={(
            <section>
              <h1>Página no encontrada</h1>
              <Link to="/">Volver al inicio</Link>
            </section>
          )} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
