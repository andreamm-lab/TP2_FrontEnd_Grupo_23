import { useState } from 'react'
import styles from './FotoTransformable.module.css'

// Alterna entre la foto base y la transformada ("ki saiyajin").
function FotoTransformable({ foto, nombre, alt, className = '' }) {
  const [transformada, setTransformada] = useState(false)
  const accion = transformada ? 'Volver al estado base' : 'Activar ki saiyajin'

  return (
    <button
      type="button"
      className={`${styles.foto} ${styles[foto.formato] ?? ''} ${transformada ? styles.transformada : ''} ${className}`}
      aria-pressed={transformada}
      aria-label={transformada ? `Volver al estado base de ${nombre}` : `Activar ki saiyajin de ${nombre}`}
      onClick={() => setTransformada((actual) => !actual)}
    >
      <img className={styles.base} src={foto.base} alt={alt} />
      <img className={styles.alternativa} src={foto.transformada} alt="" aria-hidden="true" />
      <span className={styles.pista} aria-hidden="true">{accion}</span>
    </button>
  )
}

export default FotoTransformable
