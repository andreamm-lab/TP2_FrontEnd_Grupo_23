import { useEffect } from 'react'
import NodoComponente from '../components/NodoComponente'
import { componentes } from '../data/componentes'
import styles from './Arbol.module.css'

export default function Arbol() {
  useEffect(() => { document.title = 'DragonByte | Árbol de componentes' }, [])
  return (
    <section className="pagina-base">
      <p className="etiqueta">ASÍ SE CONSTRUYE DRAGONBYTE</p>
      <h1>Árbol de componentes</h1>
      <p>Este esquema representa los componentes de la aplicación y cómo se relacionan. Seleccioná una rama para expandirla o contraerla.</p>
      <p>El menú y el pie son compartidos. En Outlet se muestra una sola página según la dirección; los perfiles inexistentes muestran su mensaje alternativo.</p>
      <ul className={styles.arbol} aria-label="Jerarquía de componentes">
        <NodoComponente nodo={componentes} />
      </ul>
    </section>
  )
}
