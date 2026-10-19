import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="app">
      <p className="project-name">TP2 Front-End · Grupo 23</p>
      <h1>React + Vite</h1>
      <p>Base inicial del proyecto.</p>
      <div className="card">
        <button type="button" onClick={() => setCount((current) => current + 1)}>
          Contador: {count}
        </button>
        <p>Editá <code>src/App.jsx</code> para comenzar.</p>
      </div>
      <nav className="docs" aria-label="Documentación">
        <a href="https://react.dev/">React</a>
        <a href="https://vite.dev/">Vite</a>
      </nav>
    </main>
  )
}

export default App
