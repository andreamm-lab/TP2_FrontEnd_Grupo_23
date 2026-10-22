import { Link } from 'react-router-dom'
import styles from './IntegranteNoEncontrado.module.css'

function IntegranteNoEncontrado({ slug }) {
  return (
    <section className={styles.aviso} aria-labelledby="titulo-no-encontrado">
      <p className={styles.eyebrow}>PERFIL NO ENCONTRADO</p>
      <h1 id="titulo-no-encontrado">Ese integrante no está en DragonByte</h1>
      <p>No encontramos a «{slug}» en el equipo. Revisá la dirección o elegí un perfil desde el inicio.</p>
      <Link className={styles.boton} to="/">Volver al inicio</Link>
    </section>
  )
}

export default IntegranteNoEncontrado
