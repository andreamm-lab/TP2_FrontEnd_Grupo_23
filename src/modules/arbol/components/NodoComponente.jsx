import styles from '../pages/Arbol.module.css'

export default function NodoComponente({ nodo }) {
  if (!nodo.hijos) return <li className={styles.hoja}><code>{nodo.nombre}</code></li>
  return (
    <li>
      <details open>
        <summary><code>{nodo.nombre}</code></summary>
        <ul>{nodo.hijos.map((hijo) => <NodoComponente key={hijo.nombre} nodo={hijo} />)}</ul>
      </details>
    </li>
  )
}
