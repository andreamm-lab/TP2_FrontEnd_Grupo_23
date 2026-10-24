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
