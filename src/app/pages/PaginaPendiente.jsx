import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function PaginaPendiente({ titulo, descripcion }) {
  useEffect(() => { document.title = `DragonByte | ${titulo}` }, [titulo])
  return (
    <section className="pagina-base">
      <p className="etiqueta">DRAGONBYTE / EN CONSTRUCCIÓN</p>
      <h1>{titulo}</h1>
      <p>{descripcion}</p>
      <p>Estamos preparando esta sección del proyecto.</p>
      <Link className="enlace-boton" to="/">Volver al inicio</Link>
    </section>
  )
}
