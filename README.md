# TP2 Front-End — Grupo 23

DragonByte es una aplicación de React con JavaScript y Vite que continúa el proyecto del TP1. Presenta al equipo y sus cuatro perfiles, reúne recomendaciones con búsqueda y filtros, consulta el clima de Buenos Aires e incluye arcade, desafíos, bitácora y árbol de componentes.

## Integrantes

| Integrante | Perfil de GitHub |
| --- | --- |
| Sebastián Fernández | [Fernandez-Sebastian](https://github.com/Fernandez-Sebastian) |
| Glaucia Ferreira | [glaucia1906](https://github.com/glaucia1906) |
| Ignacio Grosman | [IgnacioGrosman735](https://github.com/IgnacioGrosman735) |
| Andrea Maslucan Moreno | [andreamm-lab](https://github.com/andreamm-lab) |

## Publicación

Repositorio: [TP2_FrontEnd_Grupo_23](https://github.com/andreamm-lab/TP2_FrontEnd_Grupo_23).

Sitio publicado en Vercel: [DragonByte · TP2 Front-End · Grupo 23](https://tp-2-front-end-grupo-23.vercel.app/).

## Uso de inteligencia artificial

Se utilizaron Claude y Codex como apoyo durante el desarrollo del proyecto.

| Aplicación | Modelo |
| --- | --- |
| Claude | No registrado por el equipo |
| Codex | GPT-6, en las modificaciones realizadas en esta sesión |

El equipo revisó y adaptó el código y las propuestas incorporadas al proyecto.

## Requisitos

- Node.js 22.12 o superior 
- npm, incluido con Node.js.

## Instalación y desarrollo

Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Abrir en el navegador la dirección que indique Vite en la terminal.

## Estructura de la aplicación

```text
src/
  main.jsx             Inicia React e importa App y los estilos globales
  App.jsx              Componente principal con React Router y las rutas
  app/pages/           Páginas auxiliares: NoEncontrada y PaginaPendiente
  layout/              Layout compartido, Sidebar y Footer
  modules/             Equipo, favoritos, clima, bitácora, árbol, arcade y desafíos
  styles/global.css    Paleta y estilos comunes
```

`main.jsx` importa directamente `App` desde `src/App.jsx`. Hay un solo componente App y un solo BrowserRouter. El layout muestra cada página a través de Outlet.

La sección `/arbol` representa la jerarquía de componentes, no las carpetas. Sus datos están en `src/modules/arbol/data/componentes.js`; deben actualizarse al cambiar las relaciones entre componentes. Mover App a la raíz de src no cambia esa jerarquía.

## Catálogo local y filtros

La página `/favoritos` consulta por HTTP un único archivo, `public/data/favoritos/catalogo.json`, con **48 registros**. Cada registro tiene identificador único, título, imagen, enlace, categoría (`pantalla` o `musica`) e identificador del integrante que lo recomienda.

El servicio `obtenerCatalogo`, en `src/modules/favoritos/services/favoritos.js`, valida el contenido. La página presenta los registros dinámicamente mediante `TarjetaPortada`, conserva la búsqueda por texto y los filtros por categoría e integrante, e informa cuando no hay resultados. «Limpiar filtros» restablece la lista completa.

Los perfiles conservan sus archivos individuales y su comportamiento. Si se modifica una recomendación en un archivo de perfil, debe actualizarse también su registro correspondiente en el catálogo unificado.

## Favoritos por integrante

Cada perfil carga por HTTP su archivo de `public/data/favoritos/<slug>.json`
mediante `fetch`. Es una fuente estática de solo lectura, sin backend.
El nombre del archivo coincide con el slug del perfil. El `id` es numérico:
1 para Sebastián, 2 para Glaucia, 3 para Ignacio y 4 para Andrea.

```json
{
  "id": 1,
  "NombreIntegrante": "Sebastián",
  "SeriesPeliculas": [
    {
      "id": 1,
      "nombre": "Dragon Ball Z",
      "imagen": "/imagenes/favoritos/peliculas/dragon-ball-z.jpg",
      "url": "https://www.youtube.com/watch?v=hjmAPk1O2Is"
    }
  ],
  "Discos": []
}
```

Las listas contienen objetos, no cadenas de texto. Para agregar un favorito,
añadir un objeto con `id` numérico único dentro de su arreglo, `nombre`, `imagen`
y `url` (enlace de YouTube). El campo opcional `etiquetaEnlace` describe el destino
para lectores de pantalla. Las portadas abren el enlace en una pestaña nueva.
Los enlaces parten del TP1, incluidos discos que enlazan a una canción
y trailers hechos por fans. 

Los componentes están en `src/modules/favoritos/components/`. Cada perfil muestra
dos bloques: Series y películas, y Discos de música.

## Desafíos

Cada perfil incluye el generador de `src/modules/desafios/Desafios.jsx`.
Las cuatro consignas originales están en `src/modules/desafios/data/desafios.json`.
El botón abre el diálogo de las siete esferas; se puede generar otro desafío sin
repetir el anterior, aceptar o cerrar con el botón, Escape o el fondo del diálogo.
El resultado queda visible en el perfil y se reinicia al cambiar de integrante.
Los estilos usan CSS Modules y respetan la preferencia de movimiento reducido.




## Clima de Buenos Aires

La ruta `/clima` consulta las condiciones actuales de una ubicación fija de CABA
(-34.6037, -58.3816) mediante [Open-Meteo](https://open-meteo.com/).
Muestra temperatura y sensación térmica en °C, viento en km/h y la fecha y hora
de los datos en la zona `America/Argentina/Buenos_Aires`. No solicita geolocalización.

La consulta está separada de la presentación en `src/modules/clima/services/clima.js`.
Comparte peticiones simultáneas, reutiliza resultados durante cinco minutos y
limita la espera a doce segundos. Ante errores de red, HTTP o datos inválidos,
la página muestra un mensaje y permite reintentar. Los errores no se almacenan.
La atribución a Open-Meteo permanece visible durante carga, éxito y error.

Pruebas del servicio (sin conexión externa):

```bash
node --test src/modules/clima/services/clima.test.js
```

Después de publicar esta versión, comprobar `/clima` desde la URL del despliegue:
abrir directamente la ruta, confirmar que aparecen las tres mediciones y la hora
de Buenos Aires, probar el reintento sin conexión y abrir el enlace de Open-Meteo.
El proyecto incluye las reescrituras de Vercel necesarias para las rutas de React.
