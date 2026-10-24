import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { obtenerIntegrantes } from '../data/integrantes'
import Hero from '../components/Hero'
import GrillaEquipo from '../components/GrillaEquipo'
import Mision from '../components/Mision'

function Inicio() {
  const { hash } = useLocation()

  useEffect(() => {
    document.title = 'DragonByte | Inicio'
  }, [])

  // React Router no baja solo hasta un ancla como "/#equipo" al llegar desde otra ruta.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  return (
    <>
      <Hero />
      <GrillaEquipo integrantes={obtenerIntegrantes()} />
      <Mision />
    </>
  )
}

export default Inicio
