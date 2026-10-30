export async function obtenerFavoritos(slug, signal) {
  const response = await fetch(
    `${import.meta.env.BASE_URL}data/favoritos/${encodeURIComponent(slug)}.json`,
    { signal },
  )

  if (!response.ok) throw new Error('No pudimos cargar los favoritos.')

  const datos = await response.json()
  const esLista = (lista) => Array.isArray(lista) && lista.every((item) => (
    Number.isInteger(item.id) && item.id > 0 && typeof item.nombre === 'string'
    && typeof item.imagen === 'string'
    && typeof item.url === 'string' && item.url.startsWith('https://www.youtube.com/watch?')
  ))
  if (!Number.isInteger(datos.id) || datos.id < 1
    || !esLista(datos.SeriesPeliculas) || !esLista(datos.Discos)) {
    throw new Error('El archivo de favoritos tiene un formato incorrecto.')
  }
  return datos
}

// Catálogo unificado para la búsqueda y los filtros de la página Favoritos.
export async function obtenerCatalogo(signal) {
  const response = await fetch(
    `${import.meta.env.BASE_URL}data/favoritos/catalogo.json`,
    { signal },
  )
  if (!response.ok) throw new Error('No pudimos cargar el catálogo de favoritos.')
  const datos = await response.json()
  const ids = new Set()
  if (!Array.isArray(datos) || datos.length < 20 || !datos.every((item) => {
    if (!item || typeof item.id !== 'string' || !item.id || ids.has(item.id)
      || typeof item.integranteId !== 'string' || !item.integranteId
      || !['pantalla', 'musica'].includes(item.categoria)
      || typeof item.nombre !== 'string' || !item.nombre.trim()
      || typeof item.imagen !== 'string'
      || typeof item.url !== 'string' || !item.url.startsWith('https://www.youtube.com/watch?')) return false
    ids.add(item.id)
    return true
  })) throw new Error('El catálogo de favoritos tiene un formato incorrecto.')
  return datos
}
