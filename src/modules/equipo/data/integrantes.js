// Único punto de acceso a los datos del equipo: las páginas no importan el JSON directamente.
import integrantes from './integrantes.json'

export function obtenerIntegrantes() {
  return integrantes
}

export function buscarIntegrante(id) {
  return integrantes.find((integrante) => integrante.id === id)
}

export function obtenerPosicion(id) {
  return integrantes.findIndex((integrante) => integrante.id === id) + 1
}

// El carrusel es circular: después del último vuelve al primero.
export function obtenerVecinos(id) {
  const indice = integrantes.findIndex((integrante) => integrante.id === id)
  const total = integrantes.length

  return {
    anterior: integrantes[(indice - 1 + total) % total],
    siguiente: integrantes[(indice + 1) % total],
  }
}

export function nombreCompleto(integrante) {
  return `${integrante.nombre} ${integrante.apellido}`
}
