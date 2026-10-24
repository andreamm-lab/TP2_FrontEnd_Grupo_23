import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerIntegrantes, nombreCompleto } from '../../equipo/data/integrantes'
import { obtenerFavoritos } from '../services/favoritos'
import TarjetaPortada from '../components/TarjetaPortada'
import styles from './Favoritos.module.css'

const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export default function Favoritos() {
  const [estado, setEstado] = useState({ datos: null, error: null })
  const [intento, setIntento] = useState(0)
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('todos')
  const [persona, setPersona] = useState('todos')

  useEffect(() => { document.title = 'DragonByte | Favoritos' }, [])
  useEffect(() => {
    const controller = new AbortController()
    Promise.all(obtenerIntegrantes().map(async (integrante) => {
      const datos = await obtenerFavoritos(integrante.id, controller.signal)
      return [
        ...datos.SeriesPeliculas.map((item) => ({ ...item, categoria: 'pantalla', integrante })),
        ...datos.Discos.map((item) => ({ ...item, categoria: 'musica', integrante })),
      ]
    }))
      .then((listas) => {
        if (!controller.signal.aborted) setEstado({ datos: listas.flat(), error: null })
      })
      .catch(() => {
        if (!controller.signal.aborted) setEstado({ datos: null, error: 'No pudimos cargar los favoritos del equipo.' })
      })
    return () => controller.abort()
  }, [intento])

  function limpiar() {
    setBusqueda('')
    setCategoria('todos')
    setPersona('todos')
  }

  const resultados = (estado.datos ?? []).filter((item) => (
    (categoria === 'todos' || item.categoria === categoria)
    && (persona === 'todos' || item.integrante.id === persona)
    && normalizar(item.nombre).includes(normalizar(busqueda))
  ))

  return (
    <section className="pagina-base">
      <p className="etiqueta">LOS GUSTOS DE DRAGONBYTE</p>
      <h1>Favoritos del equipo</h1>
      <p>Las series, películas y la música de nuestros cuatro perfiles, reunidas en un solo lugar. Abrí una portada para ver o escuchar su recomendación en YouTube.</p>
      {estado.error ? (
        <div role="alert">
          <p>{estado.error}</p>
          <button className="enlace-boton" type="button" onClick={() => {
            setEstado({ datos: null, error: null })
            setIntento((actual) => actual + 1)
          }}>Volver a intentar</button>
        </div>
      ) : !estado.datos ? <p role="status">Cargando favoritos…</p> : (
        <>
          <div className={styles.controles}>
            <label>Buscar por título
              <input type="search" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Película, serie, artista o disco…" />
            </label>
            <label>Categoría
              <select aria-label="Categoría" value={categoria} onChange={(event) => setCategoria(event.target.value)}>
                <option value="todos">Todas las categorías</option>
                <option value="pantalla">Series y películas</option>
                <option value="musica">Música</option>
              </select>
            </label>
            <label>Integrante
              <select aria-label="Integrante" value={persona} onChange={(event) => setPersona(event.target.value)}>
                <option value="todos">Todo el equipo</option>
                {obtenerIntegrantes().map((integrante) => <option key={integrante.id} value={integrante.id}>{nombreCompleto(integrante)}</option>)}
              </select>
            </label>
            <button type="button" onClick={limpiar}>Limpiar filtros</button>
          </div>
          <p role="status">{resultados.length} de {estado.datos.length} recomendaciones</p>
          {resultados.length ? (
            <div className={styles.grilla}>
              {resultados.map((item) => (
                <div className={styles.recomendacion} key={`${item.integrante.id}-${item.categoria}-${item.id}`}>
                  <TarjetaPortada {...item} disco={item.categoria === 'musica'} />
                  <p className={styles.autor}>
                    <span>{item.categoria === 'musica' ? 'Música' : 'Series y películas'}</span>
                    Recomienda <Link to={`/equipo/${item.integrante.id}`}>{nombreCompleto(item.integrante)}</Link>
                  </p>
                </div>
              ))}
            </div>
          ) : <p>No hay coincidencias. Probá otra búsqueda o limpiá los filtros para ver todas las recomendaciones.</p>}
        </>
      )}
    </section>
  )
}
