import { Link } from 'react-router-dom'
import styles from './Layout.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>DragonByte · Grupo 23<br /><small>Desarrollo de Sistemas Web · IFTS N.º 29 · 2026</small></p>
      <Link to="/arbol">Árbol de componentes</Link>
      <Link to="/favoritos">Favoritos del equipo</Link>
      <a href="https://github.com/andreamm-lab/TP2_FrontEnd_Grupo_23" target="_blank" rel="noopener noreferrer">Repositorio GitHub ↗</a>
    </footer>
  )
}
