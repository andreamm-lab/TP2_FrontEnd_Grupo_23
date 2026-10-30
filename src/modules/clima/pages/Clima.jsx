import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerClima, ZONA_HORARIA } from '../services/clima'
import styles from './Clima.module.css'

const numero = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 })
const fecha = new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'long', timeStyle: 'short', timeZone: ZONA_HORARIA,
})

export default function Clima() {
  const [consulta, setConsulta] = useState({ estado: 'cargando', datos: null })
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const anterior = document.title
    document.title = 'DragonByte | Clima de Buenos Aires'
    return () => { document.title = anterior }
  }, [])

  useEffect(() => {
    let vigente = true
    setConsulta({ estado: 'cargando', datos: null })
    obtenerClima().then(
      (datos) => { if (vigente) setConsulta({ estado: 'listo', datos }) },
      () => { if (vigente) setConsulta({ estado: 'error', datos: null }) },
    )
    // La petición compartida continúa para aprovecharla al volver a la ruta;
    // una respuesta tardía nunca actualiza un componente desmontado.
    return () => { vigente = false }
  }, [intento])

  const { estado, datos } = consulta

  return (
    <section className="pagina-base" aria-labelledby="clima-titulo">
      <p className="etiqueta">DATOS DEL EXTERIOR / BUENOS AIRES</p>
      <h1 id="clima-titulo">El clima de Buenos Aires</h1>
      <p>Consultá las condiciones meteorológicas actuales de la Ciudad de Buenos Aires.
        Los datos provienen de Open-Meteo y corresponden a una ubicación fija de la ciudad.</p>

      <div className={styles.panel} aria-busy={estado === 'cargando'}>
        <div className={styles.encabezado}>
          <div><p className={styles.rotulo}>CONDICIONES ACTUALES</p><h2>Ciudad de Buenos Aires</h2></div>
          <span className={styles.ubicacion}>Argentina · CABA</span>
        </div>

        <p className={styles.estado} role="status" aria-live="polite">
          {estado === 'cargando' ? 'Cargando el clima…' : estado === 'listo' ? 'Datos meteorológicos disponibles.' : ''}
        </p>

        {estado === 'error' && <div className={styles.error} role="alert">
          <h3>No pudimos obtener el clima</h3>
          <p>Revisá tu conexión o volvé a intentarlo en unos momentos.</p>
          <button className={styles.boton} type="button" onClick={() => setIntento((actual) => actual + 1)}>Volver a intentar</button>
        </div>}

        {estado === 'listo' && <>
          <dl className={styles.mediciones}>
            <div className={styles.temperatura}><dt>Temperatura</dt><dd>{numero.format(datos.temperatura)} <span>{datos.unidadTemperatura}</span></dd></div>
            <div><dt>Sensación térmica</dt><dd>{numero.format(datos.sensacion)} <span>{datos.unidadTemperatura}</span></dd></div>
            <div><dt>Viento</dt><dd>{numero.format(datos.viento)} <span>{datos.unidadViento}</span></dd></div>
          </dl>
          <p className={styles.fecha}>Fecha y hora de los datos: <time dateTime={datos.fecha}>{fecha.format(new Date(datos.fecha))}</time> (hora de Buenos Aires).</p>
        </>}
      </div>

      <p className={styles.fuente}>Datos meteorológicos de <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo <span className={styles.soloLectores}>(abre en otra pestaña)</span>↗</a>.
        Esta sección permite conocer la temperatura, la sensación térmica y el viento de la ciudad.</p>
      <Link className="enlace-boton" to="/">← Volver al inicio</Link>
    </section>
  )
}
