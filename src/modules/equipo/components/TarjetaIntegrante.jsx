import { Link } from 'react-router-dom'
import { nombreCompleto } from '../data/integrantes'
import FotoTransformable from './FotoTransformable'
import EnlaceGithub from './EnlaceGithub'
import Ubicacion from './Ubicacion'
import styles from './TarjetaIntegrante.module.css'

function TarjetaIntegrante({ integrante }) {
  const nombre = nombreCompleto(integrante)

  return (
    <article className={styles.tarjeta}>
      <FotoTransformable
        className={styles.sobreEnlace}
        foto={integrante.foto}
        nombre={integrante.nombre}
        alt={`${nombre} en estado base`}
      />
      <p className={styles.rol}>{integrante.rol}</p>
      <h3>{nombre}</h3>
      <Ubicacion ciudad={integrante.ciudad} />
      <EnlaceGithub className={styles.sobreEnlace} usuario={integrante.github} nombre={nombre} />
      <Link className={styles.verPerfil} to={`/equipo/${integrante.id}`} aria-label={`Ver perfil de ${nombre}`}>
        Ver perfil <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}

export default TarjetaIntegrante
