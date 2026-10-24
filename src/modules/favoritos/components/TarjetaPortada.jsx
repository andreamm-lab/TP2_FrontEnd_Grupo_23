import { useState } from 'react'
import styles from './Favoritos.module.css'

export default function TarjetaPortada({ nombre, imagen, url, etiquetaEnlace, disco = false }) {
  const [imagenFallida, setImagenFallida] = useState(null)
  const imagenUrl = imagen.startsWith('/') ? `${import.meta.env.BASE_URL}${imagen.slice(1)}` : imagen

  return (
    <article className={styles.tarjeta}>
      <a className={`${styles.portada} ${disco ? styles.disco : ''}`}
        href={url} target="_blank" rel="noopener noreferrer"
        aria-label={etiquetaEnlace || `${disco ? 'Escuchar' : 'Ver tráiler de'} ${nombre} en YouTube (se abre en una pestaña nueva)`}>
        {imagen && imagenFallida !== imagen ? (
          <img src={imagenUrl} alt={`Portada de ${nombre}`} loading="lazy"
            onError={() => setImagenFallida(imagen)} />
        ) : <span className={styles.sinPortada}>Portada no disponible</span>}
        <span className={styles.accion} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" focusable="false">
            {disco ? <path d="m9 5 11 7-11 7Z" fill="currentColor" /> : (
              <>
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" fill="none" strokeWidth="2" />
                <path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4" stroke="currentColor" fill="none" strokeWidth="2" />
              </>
            )}
          </svg>
        </span>
      </a>
      <h3 className={styles.nombre}>{nombre}</h3>
    </article>
  )
}
