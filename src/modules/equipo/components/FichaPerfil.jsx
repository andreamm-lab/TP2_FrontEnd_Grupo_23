import { nombreCompleto } from '../data/integrantes'
import FotoTransformable from './FotoTransformable'
import EnlaceGithub from './EnlaceGithub'
import Ubicacion from './Ubicacion'
import styles from './FichaPerfil.module.css'

function FichaPerfil({ integrante, numero }) {
  const nombre = nombreCompleto(integrante)

  return (
    <section className={styles.ficha} aria-labelledby="nombre-perfil">
      <FotoTransformable
        className={styles.foto}
        foto={integrante.foto}
        nombre={integrante.nombre}
        alt={`${nombre} en estado base`}
      />
      <p className={styles.eyebrow}>PERFIL {String(numero).padStart(2, '0')}</p>
      <h2 className={styles.nombre}>{integrante.nombre}</h2>
      <p className={styles.edad}>{integrante.edad} años</p>
      <Ubicacion className={styles.ubicacion} ciudad={integrante.ciudad} />
      {integrante.descripcion.map((parrafo) => (
        <p key={parrafo} className={styles.parrafo}>{parrafo}</p>
      ))}
      <EnlaceGithub usuario={integrante.github} nombre={nombre} />
    </section>
  )
}

export default FichaPerfil
