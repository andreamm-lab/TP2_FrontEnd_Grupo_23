import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buscarIntegrante, nombreCompleto, obtenerPosicion, obtenerVecinos } from '../data/integrantes'
import CarruselPerfiles from '../components/CarruselPerfiles'
import FichaPerfil from '../components/FichaPerfil'
import ListaHabilidades from '../components/ListaHabilidades'
import IntegranteNoEncontrado from '../components/IntegranteNoEncontrado'
import FavoritosIntegrante from '../../favoritos/components/FavoritosIntegrante'
import Desafios from '../../desafios/Desafios'
import styles from './Perfil.module.css'

function Perfil() {
  const { slug } = useParams()
  const integrante = buscarIntegrante(slug)

  useEffect(() => {
    document.title = integrante ? `DragonByte | ${nombreCompleto(integrante)}` : 'DragonByte | Perfil no encontrado'
  }, [integrante])

  // Al pasar de un perfil a otro con el carrusel, el nuevo arranca desde arriba.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!integrante) {
    return (
      <div className={styles.pagina}>
        <IntegranteNoEncontrado slug={slug} />
      </div>
    )
  }

  const { anterior, siguiente } = obtenerVecinos(integrante.id)

  return (
    <div className={styles.pagina}>
      <CarruselPerfiles anterior={anterior} actual={integrante} siguiente={siguiente} />
      <div className={styles.contenido}>
        {/* La key reinicia el estado de la foto al pasar de un perfil a otro. */}
        <FichaPerfil key={integrante.id} integrante={integrante} numero={obtenerPosicion(integrante.id)} />
        <div className={styles.detalles}>
          <ListaHabilidades habilidades={integrante.habilidades} />
          <FavoritosIntegrante key={integrante.id} slug={integrante.id} />
          <Desafios key={`desafios-${integrante.id}`} />
        </div>
      </div>
      <Link className={styles.volver} to="/#equipo">
        <span aria-hidden="true">←</span> Volver al equipo
      </Link>
    </div>
  )
}

export default Perfil
