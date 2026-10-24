# TP2 Front-End — Grupo 23

Proyecto de React con JavaScript y Vite para el trabajo práctico de Front-End del Grupo 23.

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
  modules/             Equipo, favoritos, clima, bitácora, árbol y desafíos
  styles/global.css    Paleta y estilos comunes
```

`main.jsx` importa directamente `App` desde `src/App.jsx`. Hay un solo componente App y un solo BrowserRouter. El layout muestra cada página a través de Outlet.

La sección `/arbol` representa la jerarquía de componentes, no las carpetas. Sus datos están en `src/modules/arbol/data/componentes.js`; deben actualizarse al cambiar las relaciones entre componentes. Mover App a la raíz de src no cambia esa jerarquía.

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



