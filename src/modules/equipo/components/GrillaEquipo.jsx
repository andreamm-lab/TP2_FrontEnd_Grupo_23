import TarjetaIntegrante from './TarjetaIntegrante'
import styles from './GrillaEquipo.module.css'

function GrillaEquipo({ integrantes }) {
  return (
    <section id="equipo" className={styles.seccion} aria-labelledby="titulo-equipo">
      <div className={styles.encabezado}>
        <p className={styles.eyebrow}>LOS CUATRO NODOS</p>
        <h2 id="titulo-equipo">Seleccioná un perfil</h2>
        <p>Cada integrante aporta una habilidad distinta al sistema DragonByte.</p>
      </div>
      <div className={styles.grilla}>
        {integrantes.map((integrante) => (
          <TarjetaIntegrante key={integrante.id} integrante={integrante} />
        ))}
      </div>
    </section>
  )
}

export default GrillaEquipo
