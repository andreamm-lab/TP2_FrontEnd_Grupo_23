import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NoEncontrada() {
  useEffect(() => { document.title = 'DragonByte | Página no encontrada' }, [])
  return (
    <section className="pagina-base">
      <p className="etiqueta">ERROR 404</p>
      <h1>Página no encontrada</h1>
      <p>Esta dirección no existe. Podés seguir explorando desde el menú o regresar a la portada.</p>
      <Link className="enlace-boton" to="/">Volver al inicio</Link>
    </section>
  )
}
