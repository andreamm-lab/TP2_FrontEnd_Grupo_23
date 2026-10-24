import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './modules/equipo/pages/Inicio'
import Perfil from './modules/equipo/pages/Perfil'
import Favoritos from './modules/favoritos/pages/Favoritos'
import Clima from './modules/clima/pages/Clima'
import Bitacora from './modules/bitacora/pages/Bitacora'
import Arbol from './modules/arbol/pages/Arbol'
import NoEncontrada from './app/pages/NoEncontrada'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="equipo/:slug" element={<Perfil />} />
          <Route path="favoritos" element={<Favoritos />} />
          <Route path="clima" element={<Clima />} />
          <Route path="bitacora" element={<Bitacora />} />
          <Route path="arbol" element={<Arbol />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
