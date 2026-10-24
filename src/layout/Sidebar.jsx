import { useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { obtenerIntegrantes, nombreCompleto } from '../modules/equipo/data/integrantes'
import styles from './Layout.module.css'

const enlaces = [
  ['/', 'Inicio', '01'],
  ['/favoritos', 'Favoritos', '02'],
  ['/clima', 'Clima', '03'],
  ['/bitacora', 'Bitácora', '04'],
]

export default function Sidebar({ abierto, cerrar }) {
  const panel = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (!abierto) return
    const media = window.matchMedia('(max-width: 800px)')
    if (!media.matches) return
    panel.current?.querySelector('a')?.focus()
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function teclado(event) {
      if (event.key === 'Escape') cerrar(true)
      if (event.key !== 'Tab') return
      const elementos = [...panel.current.querySelectorAll('a, button, summary')].filter((item) => item.getClientRects().length)
      const primero = elementos[0]
      const ultimo = elementos.at(-1)
      if (event.shiftKey && document.activeElement === primero) { event.preventDefault(); ultimo.focus() }
      if (!event.shiftKey && document.activeElement === ultimo) { event.preventDefault(); primero.focus() }
    }
    function cambiarTamano() { if (!media.matches) cerrar() }
    document.addEventListener('keydown', teclado)
    media.addEventListener('change', cambiarTamano)
    return () => {
      document.body.style.overflow = anterior
      document.removeEventListener('keydown', teclado)
      media.removeEventListener('change', cambiarTamano)
    }
  }, [abierto, cerrar])

  return (
    <>
      {abierto && <button className={styles.fondo} type="button" tabIndex={-1} aria-label="Cerrar menú" onClick={() => cerrar(true)} />}
      <aside ref={panel} id="menu-lateral" className={`${styles.sidebar} ${abierto ? styles.abierta : ''}`}>
        <Link className={styles.marca} to="/" onClick={() => cerrar()}>
          <img src="/imagenes/iconos/dragonbyte.svg" alt="" width="48" height="48" />
          <span>DRAGONBYTE<small>GRUPO 23 / FRONT END</small></span>
        </Link>
        <button className={styles.cerrar} type="button" onClick={() => cerrar(true)}>Cerrar menú ×</button>
        <p className={styles.rotulo}>EXPLORAR EL SISTEMA</p>
        <nav aria-label="Navegación principal">
          {enlaces.map(([ruta, nombre, numero]) => (
            <NavLink key={ruta} to={ruta} end={ruta === '/'} onClick={() => cerrar()} className={({ isActive }) => `${styles.enlace} ${isActive ? styles.activo : ''}`}>
              <span aria-hidden="true">{numero}</span>{nombre}
            </NavLink>
          ))}
          <details key={pathname} className={styles.equipo} open={pathname.startsWith('/equipo/')}>
            <summary className={`${styles.enlace} ${pathname.startsWith('/equipo/') ? styles.activo : ''}`}>
              <span aria-hidden="true">05</span>Equipo
              <span className={styles.flecha} aria-hidden="true">⌄</span>
            </summary>
            <ul className={styles.submenu}>
              <li>
                <Link to="/#equipo" onClick={() => cerrar()} className={styles.enlace}>Ver todo el equipo</Link>
              </li>
              {obtenerIntegrantes().map((integrante) => (
                <li key={integrante.id}>
                  <NavLink to={`/equipo/${integrante.id}`} onClick={() => cerrar()} className={({ isActive }) => `${styles.enlace} ${isActive ? styles.activo : ''}`}>
                    {nombreCompleto(integrante)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </details>
          <NavLink to="/arbol" onClick={() => cerrar()} className={({ isActive }) => `${styles.enlace} ${isActive ? styles.activo : ''}`}>
            <span aria-hidden="true">06</span>Árbol de componentes
          </NavLink>
        </nav>
        <p className={styles.nota}>Cuatro nodos.<br />Una misma energía.<small>TP2 · React + Vite</small></p>
      </aside>
    </>
  )
}
