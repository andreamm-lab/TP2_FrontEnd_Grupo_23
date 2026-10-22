import { Link } from 'react-router-dom'
import styles from './Mision.module.css'

function Mision() {
  return (
    <section className={styles.seccion} aria-labelledby="titulo-mision">
      <div className={styles.encabezado}>
        <p className={styles.eyebrow}>NUESTRO PROPÓSITO</p>
        <h2 id="titulo-mision">Una misión compartida</h2>
      </div>
      <article className={styles.mision}>
        <p className={styles.eyebrow}>MISIÓN 02</p>
        <h3>Aprender, construir y evolucionar en equipo.</h3>
        <p>
          En el TP1 construimos la estructura del sitio con HTML, CSS y JavaScript. Ahora lo llevamos
          a React: cada sección es un componente, los perfiles se completan con datos propios y
          sumamos favoritos, clima y el registro del proceso.
        </p>
        <Link className={styles.enlace} to="/bitacora">Seguir el proceso en la bitácora →</Link>
      </article>
    </section>
  )
}

export default Mision
