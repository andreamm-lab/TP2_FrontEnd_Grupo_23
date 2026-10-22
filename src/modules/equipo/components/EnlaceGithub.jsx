import styles from './EnlaceGithub.module.css'

function EnlaceGithub({ usuario, nombre, className = '' }) {
  return (
    <a
      className={`${styles.enlace} ${className}`}
      href={`https://github.com/${usuario}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`GitHub de ${nombre} (abre en otra pestaña)`}
    >
      <img src="/imagenes/iconos/github.webp" alt="" width="20" height="20" />
      <span>@{usuario}</span>
    </a>
  )
}

export default EnlaceGithub
