import { useEffect, useRef, useState, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Footer from './Footer'
import styles from './Layout.module.css'

export default function Layout() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const botonMenu = useRef(null)
  const contenido = useRef(null)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
    contenido.current?.focus({ preventScroll: true })
  }, [pathname, hash])

  const cerrarMenu = useCallback((devolverFoco = false) => {
    setMenuAbierto(false)
    if (devolverFoco) botonMenu.current?.focus()
  }, [])

  return (
    <div className={styles.layout}>
      <a className={styles.saltar} href="#contenido">Saltar al contenido</a>
      <header className={styles.cabeceraMovil}>
        <span>DRAGONBYTE</span>
        <button ref={botonMenu} type="button" aria-expanded={menuAbierto} aria-controls="menu-lateral" onClick={() => setMenuAbierto(!menuAbierto)}>
          {menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        </button>
      </header>
      <Sidebar abierto={menuAbierto} cerrar={cerrarMenu} />
      <div className={styles.cuerpo}>
        <main ref={contenido} id="contenido" tabIndex={-1}><Outlet /></main>
        <Footer />
      </div>
    </div>
  )
}
