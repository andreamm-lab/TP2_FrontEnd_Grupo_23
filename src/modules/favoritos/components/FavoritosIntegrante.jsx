import { useEffect, useId, useState } from 'react'
import { obtenerFavoritos } from '../services/favoritos'
import SeriePelicula from './SeriePelicula'
import Disco from './Disco'
import styles from './Favoritos.module.css'

export default function FavoritosIntegrante({ slug }) {
  const [estado, setEstado] = useState({ datos: null, error: null })
  const [intento, setIntento] = useState(0)
  const id = useId()

  useEffect(() => {
    const controller = new AbortController()
    obtenerFavoritos(slug, controller.signal)
      .then((datos) => {
        if (!controller.signal.aborted) setEstado({ datos, error: null, slug })
      })
      .catch((error) => {
        if (!controller.signal.aborted) setEstado({ datos: null, error: error.message })
      })
    return () => controller.abort()
  }, [slug, intento])

  if (estado.error) {
    return (
      <div className={styles.bloque}>
        <p role="alert">{estado.error}</p>
        <button type="button" onClick={() => {
          setEstado({ datos: null, error: null })
          setIntento((actual) => actual + 1)
        }}>Volver a intentar</button>
      </div>
    )
  }

  if (!estado.datos || estado.slug !== slug) {
    return <p className={styles.bloque} role="status">Cargando favoritos…</p>
  }

  return (
    <div className={styles.grupos}>
      <section className={styles.bloque} aria-labelledby={`${id}-series`}>
        <h2 className={styles.titulo} id={`${id}-series`}>Series y películas</h2>
        {estado.datos.SeriesPeliculas.length ? (
          <div className={styles.grilla}>
            {estado.datos.SeriesPeliculas.map((item) => <SeriePelicula key={item.id} {...item} />)}
          </div>
        ) : <p>Todavía no hay series o películas cargadas.</p>}
      </section>
      <section className={styles.bloque} aria-labelledby={`${id}-discos`}>
        <h2 className={styles.titulo} id={`${id}-discos`}>Discos de música</h2>
        {estado.datos.Discos.length ? (
          <div className={styles.grilla}>
            {estado.datos.Discos.map((item) => <Disco key={item.id} {...item} />)}
          </div>
        ) : <p>Todavía no hay discos cargados.</p>}
      </section>
    </div>
  )
}
