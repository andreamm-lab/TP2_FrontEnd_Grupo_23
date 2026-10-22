import { Link } from 'react-router-dom'
import { nombreCompleto, obtenerPosicion } from '../data/integrantes'
import styles from './CarruselPerfiles.module.css'

function Flecha({ trazo }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={trazo} />
    </svg>
  )
}

function CarruselPerfiles({ anterior, actual, siguiente }) {
  return (
    <nav className={styles.carrusel} aria-label="Recorrer perfiles del equipo">
      <Link
        className={`${styles.flecha} ${styles.anterior}`}
        to={`/equipo/${anterior.id}`}
        aria-label={`Perfil ${obtenerPosicion(anterior.id)}: ${nombreCompleto(anterior)} (anterior)`}
      >
        <Flecha trazo="m14 6-6 6 6 6" />
      </Link>
      <div className={styles.identidad}>
        <h1 id="nombre-perfil" className={styles.actual}>{nombreCompleto(actual)}</h1>
        <span className={styles.rol}>{actual.rol}</span>
      </div>
      <Link
        className={`${styles.flecha} ${styles.siguiente}`}
        to={`/equipo/${siguiente.id}`}
        aria-label={`Perfil ${obtenerPosicion(siguiente.id)}: ${nombreCompleto(siguiente)} (siguiente)`}
      >
        <Flecha trazo="m10 6 6 6-6 6" />
      </Link>
    </nav>
  )
}

export default CarruselPerfiles
