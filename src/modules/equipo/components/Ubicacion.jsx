import styles from './Ubicacion.module.css'

function Ubicacion({ ciudad, className = '' }) {
  return (
    <p className={`${styles.ubicacion} ${className}`}>
      <img src="/imagenes/iconos/ubicacion.webp" alt="" width="18" height="18" />
      {ciudad}
    </p>
  )
}

export default Ubicacion
