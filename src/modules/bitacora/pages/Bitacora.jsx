import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import originales from '../data/entradas.json'
import { PUBLICATION_KEY } from '../data/acceso'
import styles from './Bitacora.module.css'

const cx = (...names) => names.map((name) => styles[name]).join(' ')
const STORAGE_KEY = 'dragonbyte-tp2-logbook-v1'
const VIEW_KEY = 'dragonbyte-tp2-logbook-view'
const tipos = ['Inicio', 'Revisión', 'Diseño', 'Integración', 'Desarrollo']
const limites = { title: 120, description: 3000, decisions: 2000, challenges: 2000, solutions: 2000, nextStep: 2000 }
const numero = (value) => String(value).padStart(2, '0')
const fechaVisible = (date) => date.split('-').reverse().join('/')

function entradaValida(entry) {
  if (!entry || !Number.isSafeInteger(entry.number) || entry.number <= 0 || !tipos.includes(entry.type)) return false
  if (typeof entry.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) return false
  const date = new Date(entry.date + 'T12:00:00Z')
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== entry.date) return false
  return Object.entries(limites).every(([field, limit]) => {
    // Las entradas guardadas antes de agregar estos campos siguen siendo válidas.
    if ((field === 'challenges' || field === 'solutions') && entry[field] === undefined) return true
    return typeof entry[field] === 'string' && entry[field].trim().length > 0 && entry[field].length <= limit
  })
}

function leerEntradas() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(stored)) return { entradas: [], error: 'No se pudieron recuperar las entradas guardadas.' }
    const usados = new Set(originales.map((entry) => entry.number))
    const entradas = stored.filter((entry) => {
      if (!entradaValida(entry) || usados.has(entry.number)) return false
      usados.add(entry.number)
      return true
    })
    return { entradas, error: '' }
  } catch {
    return { entradas: [], error: 'No se pudieron recuperar las entradas guardadas en este navegador.' }
  }
}

function IconoVista({ tarjetas }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {tarjetas ? <><rect x="3" y="3" width="7" height="18" rx="1.5" /><rect x="14" y="3" width="7" height="18" rx="1.5" /><path d="M3 9h7M14 9h7" /></> : <><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M8 4v6M8 14v6" /></>}
  </svg>
}

export default function Bitacora() {
  const [guardado, setGuardado] = useState(leerEntradas)
  const [fecha, setFecha] = useState('')
  const [orden, setOrden] = useState('asc')
  const [vista, setVista] = useState(() => {
    try { return localStorage.getItem(VIEW_KEY) === 'cards' ? 'cards' : 'list' } catch { return 'list' }
  })
  const [estado, setEstado] = useState('')
  const [abierto, setAbierto] = useState(false)
  const [verificado, setVerificado] = useState(false)
  const [errorClave, setErrorClave] = useState('')
  const dialog = useRef(null)
  const clave = useRef(null)
  const tipo = useRef(null)
  const botonOrigen = useRef(null)
  const todas = [...originales, ...guardado.entradas]
  const visibles = todas.filter((entry) => !fecha || entry.date === fecha).sort((a, b) => (a.number - b.number) * (orden === 'desc' ? -1 : 1))
  const fechas = [...new Set(todas.map((entry) => entry.date))].sort().reverse()
  const siguiente = Math.max(...todas.map((entry) => entry.number)) + 1
  const hoy = new Date()
  const fechaHoy = hoy.getFullYear() + '-' + numero(hoy.getMonth() + 1) + '-' + numero(hoy.getDate())

  useEffect(() => {
    const anterior = document.title
    document.title = 'DragonByte | Bitácora'
    return () => { document.title = anterior }
  }, [])

  useEffect(() => {
    if (!abierto) return
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = anterior }
  }, [abierto])

  useEffect(() => {
    if (verificado) tipo.current?.focus()
  }, [verificado])

  function abrir(event) {
    botonOrigen.current = event.currentTarget
    setVerificado(false)
    setErrorClave('')
    setEstado('')
    dialog.current.querySelectorAll('form').forEach((form) => form.reset())
    dialog.current.showModal()
    setAbierto(true)
    clave.current.focus()
  }

  function cerrar() {
    dialog.current.close()
  }

  function verificar(event) {
    event.preventDefault()
    if (clave.current.value.trim() !== PUBLICATION_KEY) {
      setErrorClave('La clave no es correcta. Revisala e intentá nuevamente.')
      clave.current.focus()
      return
    }
    setErrorClave('')
    setVerificado(true)
  }

  function publicar(event) {
    event.preventDefault()
    if (!verificado) return
    const form = event.currentTarget
    const data = new FormData(form)
    const entrada = { number: siguiente, type: data.get('type'), date: data.get('date') }
    for (const field of Object.keys(limites)) {
      entrada[field] = data.get(field).trim()
      form.elements.namedItem(field).setCustomValidity(entrada[field] ? '' : 'Completá este campo con texto.')
    }
    if (!form.reportValidity() || !entradaValida(entrada)) return
    const nuevas = [...guardado.entradas, entrada]
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevas))
    } catch {
      setEstado('No se pudo guardar la entrada. Revisá el almacenamiento del navegador e intentá nuevamente.')
      return
    }
    setGuardado({ entradas: nuevas, error: '' })
    setFecha('')
    setEstado('Evento ' + numero(siguiente) + ' publicado y guardado en este navegador.')
    cerrar()
  }

  function cambiarVista(value) {
    setVista(value)
    try { localStorage.setItem(VIEW_KEY, value) } catch { /* La vista sigue funcionando sin almacenamiento. */ }
  }

  return (
    <div className={cx('inner-main')}>
      <header id="inicio-bitacora" className={cx('page-intro', 'bitacora-intro')} tabIndex={-1}>
        <p className={cx('eyebrow')}>REGISTRO DE MISIÓN</p>
        <h1>Bitácora del proyecto</h1>
        <p>Decisiones, avances, dificultades y aprendizajes del equipo. Se completa una entrada en cada jornada de trabajo.</p>
      </header>

      <nav className={cx('route-links')} aria-label="Explorar el proyecto">
        <Link to="/">Inicio</Link><Link to="/#equipo">Equipo</Link><Link to="/favoritos">Favoritos</Link><Link to="/clima">Clima</Link><Link to="/arbol">Árbol de componentes</Link>
      </nav>

      <nav className={cx('log-timeline')} aria-label="Línea temporal de la bitácora">
        <div className={cx('log-timeline-scroll')}>
          <ol className={cx('log-timeline-events')}>
            {visibles.map((entry) => <li key={entry.number}>
              <a className={cx('log-timeline-link')} href={'#evento-' + numero(entry.number)} title={'Evento ' + numero(entry.number) + ': ' + entry.title} aria-label={'Evento ' + numero(entry.number) + ': ' + entry.title} onClick={() => document.getElementById('evento-' + numero(entry.number))?.focus({ preventScroll: true })}>
                <span className={cx('log-timeline-number')}>{numero(entry.number)}</span>
              </a>
            </li>)}
            <li className={cx('log-timeline-action')}><button className={cx('log-timeline-add')} type="button" aria-label="Agregar una nueva entrada" aria-haspopup="dialog" aria-controls="log-dialog" title="Agregar una nueva entrada" onClick={abrir}><span aria-hidden="true">+</span></button></li>
          </ol>
        </div>
      </nav>
      <p className={cx('log-status')} role="status">{estado || guardado.error}</p>

      <div className={cx('log-filters')} role="group" aria-label="Filtrar, ordenar y cambiar la vista de los eventos">
        <div className={cx('log-field')}>
          <label htmlFor="log-filter-date">Fecha del evento</label>
          <select id="log-filter-date" aria-controls="log-entries" value={fecha} onChange={(event) => setFecha(event.target.value)}>
            <option value="">Todas las fechas</option>
            {fechas.map((date) => <option key={date} value={date}>{fechaVisible(date)}</option>)}
          </select>
        </div>
        <div className={cx('log-field')}>
          <label htmlFor="log-sort-order">Orden de los eventos</label>
          <select id="log-sort-order" aria-controls="log-entries" value={orden} onChange={(event) => setOrden(event.target.value)}><option value="asc">Ascendente</option><option value="desc">Descendente</option></select>
        </div>
        <p className={cx('log-filter-summary')} role="status" aria-live="polite" aria-atomic="true">{visibles.length} de {todas.length} eventos</p>
        <div className={cx('log-view-switch')} role="group" aria-label="Vista de las entradas">
          {['list', 'cards'].map((view) => <button key={view} className={cx('log-view-button')} type="button" aria-label={view === 'list' ? 'Vista de lista' : 'Vista de tarjetas verticales'} title={view === 'list' ? 'Vista de lista' : 'Vista de tarjetas verticales'} aria-controls="log-entries" aria-pressed={vista === view} onClick={() => cambiarVista(view)}><IconoVista tarjetas={view === 'cards'} /></button>)}
        </div>
      </div>

      <section id="log-entries" className={cx('timeline')} data-view={vista} aria-label="Entradas de la bitácora">
        {visibles.map((entry) => <article key={entry.number} id={'evento-' + numero(entry.number)} className={cx('log-entry')} tabIndex={-1}>
          <div className={cx('log-date')}><span>{numero(entry.number)}</span><small>{entry.type}</small></div>
          <div className={cx('log-entry-copy')}>
            <p className={cx('role')}>Fecha: {fechaVisible(entry.date)}</p><h2>{entry.title}</h2><p>{entry.description}</p>
            <h3>Decisiones</h3><p>{entry.decisions}</p>
            <h3>Desafíos</h3><p>{entry.challenges ?? 'No se registraron desafíos en esta entrada.'}</p>
            <h3>Soluciones</h3><p>{entry.solutions ?? 'No se registraron soluciones en esta entrada.'}</p>
            <h3>Próximo paso</h3><p>{entry.nextStep}</p>
          </div>
        </article>)}
      </section>

      <dialog ref={dialog} id="log-dialog" className={cx('log-dialog')} data-step={verificado ? 'entry' : 'verify'} aria-labelledby="log-dialog-title" aria-describedby={verificado ? 'log-form-note' : 'log-auth-note'} onClose={() => { setAbierto(false); setVerificado(false); botonOrigen.current?.focus() }}>
        <div className={cx('log-dialog-header')}>
          <div><p className={cx('eyebrow')}>{verificado ? 'PASO 2 DE 2' : 'PASO 1 DE 2'}</p><h2 id="log-dialog-title">{verificado ? 'Nueva entrada' : 'Verificar clave'}</h2></div>
          <button className={cx('log-dialog-close')} type="button" aria-label="Cerrar nueva entrada" onClick={cerrar}><span aria-hidden="true">×</span></button>
        </div>
        <form className={cx('log-form')} hidden={verificado} onSubmit={verificar}>
          <p id="log-auth-note" className={cx('log-form-note')}>Pegá tu código de acceso para habilitar una nueva entrada.</p>
          <div className={cx('log-field')}>
            <label htmlFor="log-auth-key">Código de acceso</label>
            <input ref={clave} id="log-auth-key" name="authKey" type="password" autoComplete="off" spellCheck="false" placeholder="Pegá tu código acá" aria-describedby="log-auth-help log-auth-error" aria-invalid={errorClave ? true : undefined} required onInput={() => setErrorClave('')} />
            <p id="log-auth-help" className={cx('log-form-note')}><Link to="/#arcade">Conseguí tu código de acceso en el arcade.</Link></p>
            <p id="log-auth-error" className={cx('log-form-error')} role="alert" hidden={!errorClave}>{errorClave}</p>
          </div>
          <div className={cx('log-form-actions')}><button className={cx('button', 'button-secondary')} type="button" onClick={cerrar}>Cancelar</button><button className={cx('button', 'button-primary')} type="submit">Verificar y continuar</button></div>
        </form>
        <form className={cx('log-form')} hidden={!verificado} onSubmit={publicar} onInput={(event) => event.target.setCustomValidity?.('')}>
          <div className={cx('log-form-row')}>
            <div className={cx('log-field')}><label htmlFor="log-number">Número del evento</label><input id="log-number" value={numero(siguiente)} readOnly /></div>
            <div className={cx('log-field')}><label htmlFor="log-type">Tipo de evento</label><select ref={tipo} id="log-type" name="type" required defaultValue=""><option value="" disabled>Seleccionar tipo</option>{tipos.map((type) => <option key={type}>{type}</option>)}</select></div>
            <div className={cx('log-field')}><label htmlFor="log-date">Fecha</label><input id="log-date" name="date" type="date" min="0001-01-01" max="9999-12-31" defaultValue={fechaHoy} required /></div>
          </div>
          <div className={cx('log-field')}><label htmlFor="log-title">Título del evento</label><input id="log-title" name="title" type="text" maxLength={120} placeholder="¿Qué logró el equipo hoy?" required /></div>
          <div className={cx('log-field')}><label htmlFor="log-description">Descripción</label><textarea id="log-description" name="description" rows={3} maxLength={3000} placeholder="Contá los avances, las dificultades y los aprendizajes." required /></div>
          <div className={cx('log-field')}><label htmlFor="log-decisions">Decisiones</label><textarea id="log-decisions" name="decisions" rows={2} maxLength={2000} placeholder="¿Qué decisiones tomaron?" required /></div>
          <div className={cx('log-field')}><label htmlFor="log-challenges">Desafíos</label><textarea id="log-challenges" name="challenges" rows={2} maxLength={2000} placeholder="¿Qué dificultades o desafíos encontraron?" required /></div>
          <div className={cx('log-field')}><label htmlFor="log-solutions">Soluciones</label><textarea id="log-solutions" name="solutions" rows={2} maxLength={2000} placeholder="¿Cómo resolvieron los desafíos o qué solución propusieron?" required /></div>
          <div className={cx('log-field')}><label htmlFor="log-next-step">Próximo paso</label><textarea id="log-next-step" name="nextStep" rows={2} maxLength={2000} placeholder="¿Cómo van a continuar?" required /></div>
          <p id="log-form-note" className={cx('log-form-note')}>Las nuevas entradas se guardan en este navegador.</p>
          <p className={cx('log-form-error')} role="alert">{estado}</p>
          <div className={cx('log-form-actions')}><button className={cx('button', 'button-secondary')} type="button" onClick={cerrar}>Cancelar</button><button className={cx('button', 'button-primary')} type="submit">Publicar</button></div>
        </form>
      </dialog>

      <div className={cx('page-actions')}><Link className={cx('button', 'button-secondary')} to="/">← Volver al inicio</Link><button className={cx('button', 'button-primary', 'log-add-event')} type="button" aria-haspopup="dialog" aria-controls="log-dialog" onClick={abrir}>Agregar Evento</button></div>
      <a className={cx('button', 'button-primary', 'back-to-top')} href="#inicio-bitacora" aria-label="Volver arriba" title="Volver arriba"><span aria-hidden="true">↑</span></a>
    </div>
  )
}
