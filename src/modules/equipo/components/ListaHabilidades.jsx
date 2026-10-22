import styles from './ListaHabilidades.module.css'

function ListaHabilidades({ habilidades }) {
  return (
    <section className={styles.bloque} aria-labelledby="titulo-habilidades">
      <h2 id="titulo-habilidades" className={styles.titulo}>Habilidades</h2>
      <ul className={styles.chips}>
        {habilidades.map((habilidad) => (
          <li key={habilidad}>{habilidad}</li>
        ))}
      </ul>
    </section>
  )
}

export default ListaHabilidades
