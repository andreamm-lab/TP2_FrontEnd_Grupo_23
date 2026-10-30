import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PUBLICATION_KEY } from '../bitacora/data/acceso'
import { initializeBowling } from './bowling'
import markup from './arcade.html?raw'
import keyImage from './llave-bitacora.png'
import './Arcade.css'

// HTML estático del arcade del TP1; no incluye contenido proporcionado por usuarios.
const arcadeMarkup = { __html: markup.replace('__ARCADE_KEY_IMAGE__', keyImage) }

export default function Arcade() {
  const host = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    return initializeBowling(host.current.querySelector('[data-bowling]'), PUBLICATION_KEY, navigate)
  }, [navigate])

  return <div ref={host} className="dragonbyte-arcade" dangerouslySetInnerHTML={arcadeMarkup} />
}
