import { useEffect, useId, useRef, useState } from 'react'
import desafios from './data/desafios.json'
import styles from './Desafios.module.css'

export default function Desafios() {
  const [indice, setIndice] = useState(-1)
  const [ronda, setRonda] = useState(0)
  const dialogo = useRef(null)
  const boton = useRef(null)
  const anterior = useRef(-1)
  const scrollAnterior = useRef(null)
  const id = useId()

  function restaurarScroll() {
    if (scrollAnterior.current !== null) {
      document.body.style.overflow = scrollAnterior.current
      scrollAnterior.current = null
    }
  }

  useEffect(() => () => restaurarScroll(), [])

  function generar() {
    const disponibles = desafios.map((_, i) => i).filter((i) => i !== anterior.current)
    const siguiente = disponibles[Math.floor(Math.random() * disponibles.length)]
    anterior.current = siguiente
    setIndice(siguiente)
    setRonda((actual) => actual + 1)
  }

  function abrir() {
    generar()
    dialogo.current.showModal()
    scrollAnterior.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }

  function cerrar() {
    dialogo.current.close()
  }

  return (
    <section className={styles.bloque} aria-label="Desafíos">
      <button ref={boton} type="button" className={styles.generar} onClick={abrir}
        aria-haspopup="dialog" aria-controls={`${id}-dialogo`}>Generar desafío</button>
      <p className={styles.challenge} aria-live="polite">
        {indice < 0 ? 'Tu próximo desafío aparecerá acá.' : desafios[indice]}
      </p>
      <dialog ref={dialogo} id={`${id}-dialogo`} className={styles['challenge-dialog']}
        aria-labelledby={`${id}-titulo`} aria-describedby={`${id}-mensaje`}
        onClick={(event) => { if (event.target === event.currentTarget) cerrar() }}
        onClose={() => { restaurarScroll(); boton.current?.focus({ preventScroll: true }) }}>
        <div className={styles['challenge-celebration']}>
          <button type="button" className={styles['challenge-close']} onClick={cerrar} aria-label="Cerrar desafío">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
          <div key={ronda} className={styles['challenge-orbs']} aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className={`${styles['challenge-orb']} ${styles[`challenge-orb-${i + 1}`]}`} style={{ '--orb-order': i }}>
                <div className={styles['challenge-ball']}>
                  <span className={`${styles['challenge-stars']} ${styles[`challenge-stars-${i + 1}`]}`}>
                    {Array.from({ length: i + 1 }, (_, estrella) => <i key={estrella} className={styles['challenge-star']} />)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles['challenge-banner']}>
            <p className={styles['challenge-eyebrow']}>Las 7 esferas se reunieron</p>
            <h2 id={`${id}-titulo`}>¡Desafío invocado!</h2>
            <p id={`${id}-mensaje`} className={styles['challenge-message']} aria-live="polite" aria-atomic="true">{desafios[indice]}</p>
            <div className={styles['challenge-actions']}>
              <button type="button" className={styles['challenge-accept']} onClick={cerrar}>¡Acepto el desafío!</button>
              <button type="button" className={styles['challenge-reroll']} onClick={generar}>Generar otro</button>
            </div>
          </div>
          <p className={styles['challenge-hint']}>Tu próxima aventura empieza ahora.</p>
        </div>
      </dialog>
    </section>
  )
}
