import assert from 'node:assert/strict'
import test from 'node:test'

let instancia = 0
const servicio = () => import('./clima.js?test=' + ++instancia)
const respuesta = () => ({
  current: { time: 1793372400, temperature_2m: 22.5, apparent_temperature: 21.1, wind_speed_10m: 14.2 },
  current_units: { temperature_2m: '°C', apparent_temperature: '°C', wind_speed_10m: 'km/h' },
})
const exito = () => ({ ok: true, json: async () => respuesta() })

test('consulta una ubicación fija, pide unidades explícitas y devuelve la fecha de los datos', async (t) => {
  let url
  t.mock.method(globalThis, 'fetch', async (value) => { url = new URL(value); return exito() })
  const { obtenerClima } = await servicio()
  const datos = await obtenerClima()
  assert.equal(url.protocol, 'https:')
  assert.equal(url.hostname, 'api.open-meteo.com')
  assert.equal(url.searchParams.get('latitude'), '-34.6037')
  assert.equal(url.searchParams.get('longitude'), '-58.3816')
  assert.equal(url.searchParams.get('temperature_unit'), 'celsius')
  assert.equal(url.searchParams.get('wind_speed_unit'), 'kmh')
  assert.equal(url.searchParams.get('timezone'), 'America/Argentina/Buenos_Aires')
  assert.equal(datos.temperatura, 22.5)
  assert.equal(datos.sensacion, 21.1)
  assert.equal(datos.viento, 14.2)
  assert.equal(datos.unidadTemperatura, '°C')
  assert.equal(datos.unidadViento, 'km/h')
  assert.equal(Date.parse(datos.fecha), respuesta().current.time * 1000)
})

test('comparte pedidos simultáneos y reutiliza el resultado durante cinco minutos', async (t) => {
  let resolver
  const fetch = t.mock.method(globalThis, 'fetch', () => new Promise((resolve) => { resolver = resolve }))
  const { obtenerClima } = await servicio()
  const primero = obtenerClima()
  const segundo = obtenerClima()
  assert.equal(fetch.mock.callCount(), 1)
  resolver(exito())
  assert.deepEqual(await primero, await segundo)
  await obtenerClima()
  assert.equal(fetch.mock.callCount(), 1)
})

test('vuelve a consultar cuando vence la caché', async (t) => {
  let reloj = 1000000
  t.mock.method(Date, 'now', () => reloj)
  const fetch = t.mock.method(globalThis, 'fetch', async () => exito())
  const { obtenerClima } = await servicio()
  await obtenerClima()
  reloj += 5 * 60 * 1000
  await obtenerClima()
  assert.equal(fetch.mock.callCount(), 2)
})

test('un error HTTP permite reintentar y no queda almacenado', async (t) => {
  let falla = true
  const fetch = t.mock.method(globalThis, 'fetch', async () => falla ? { ok: false, status: 503 } : exito())
  const { obtenerClima } = await servicio()
  await assert.rejects(obtenerClima(), /HTTP/)
  falla = false
  assert.equal((await obtenerClima()).temperatura, 22.5)
  assert.equal(fetch.mock.callCount(), 2)
})

test('maneja errores de conexión y JSON inválido', async (t) => {
  let falloJson = false
  t.mock.method(globalThis, 'fetch', async () => {
    if (!falloJson) throw new TypeError('sin conexión')
    return { ok: true, json: async () => { throw new SyntaxError('JSON inválido') } }
  })
  const { obtenerClima } = await servicio()
  await assert.rejects(obtenerClima(), /conexión/)
  falloJson = true
  await assert.rejects(obtenerClima(), /JSON/)
})

test('rechaza mediciones incompletas o unidades inesperadas sin inventar valores', async (t) => {
  const dato = respuesta()
  dato.current.temperature_2m = null
  t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => dato }))
  const { obtenerClima } = await servicio()
  await assert.rejects(obtenerClima(), /datos esperados/)
  dato.current.temperature_2m = 22.5
  dato.current_units.wind_speed_10m = 'mph'
  await assert.rejects(obtenerClima(), /datos esperados/)
})

test('cancela solicitudes que exceden doce segundos y permite volver a intentar', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  let falla = true
  t.mock.method(globalThis, 'fetch', (_url, { signal }) => falla ? new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('timeout')), { once: true })
  }) : Promise.resolve(exito()))
  const { obtenerClima } = await servicio()
  const comprobacion = assert.rejects(obtenerClima(), /timeout/)
  t.mock.timers.tick(12000)
  await comprobacion
  falla = false
  assert.equal((await obtenerClima()).temperatura, 22.5)
})
