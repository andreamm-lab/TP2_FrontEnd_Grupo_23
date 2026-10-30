const CACHE_MS = 5 * 60 * 1000
const TIMEOUT_MS = 12000
export const ZONA_HORARIA = 'America/Argentina/Buenos_Aires'

const parametros = new URLSearchParams({
  latitude: '-34.6037',
  longitude: '-58.3816',
  current: 'temperature_2m,apparent_temperature,wind_speed_10m',
  temperature_unit: 'celsius',
  wind_speed_unit: 'kmh',
  timeformat: 'unixtime',
  timezone: ZONA_HORARIA,
})
export const CLIMA_URL = 'https://api.open-meteo.com/v1/forecast?' + parametros
let cache = null
let pendiente = null

function interpretarRespuesta(respuesta) {
  const actual = respuesta?.current
  const unidades = respuesta?.current_units
  if (!actual || !unidades || respuesta.error ||
      !Number.isFinite(actual.temperature_2m) ||
      !Number.isFinite(actual.apparent_temperature) ||
      !Number.isFinite(actual.wind_speed_10m) || actual.wind_speed_10m < 0 ||
      !Number.isFinite(actual.time) || !Number.isFinite(new Date(actual.time * 1000).getTime()) ||
      unidades.temperature_2m !== '°C' || unidades.apparent_temperature !== '°C' ||
      unidades.wind_speed_10m !== 'km/h') {
    throw new Error('La respuesta meteorológica no contiene los datos esperados.')
  }
  return Object.freeze({
    temperatura: actual.temperature_2m,
    sensacion: actual.apparent_temperature,
    viento: actual.wind_speed_10m,
    fecha: new Date(actual.time * 1000).toISOString(),
    unidadTemperatura: unidades.temperature_2m,
    unidadViento: unidades.wind_speed_10m,
  })
}

async function consultarClima() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const respuesta = await fetch(CLIMA_URL, { signal: controller.signal })
    if (!respuesta.ok) throw new Error('Error HTTP al consultar el clima: ' + respuesta.status)
    const datos = interpretarRespuesta(await respuesta.json())
    cache = { datos, guardadoEn: Date.now() }
    return datos
  } finally {
    clearTimeout(timeout)
  }
}

// Comparte la petición en curso (también en StrictMode) y reutiliza resultados
// durante cinco minutos al volver a la página. Los errores no se guardan.
export function obtenerClima() {
  if (cache && Date.now() - cache.guardadoEn < CACHE_MS) return Promise.resolve(cache.datos)
  if (!pendiente) {
    pendiente = consultarClima().finally(() => { pendiente = null })
  }
  return pendiente
}
