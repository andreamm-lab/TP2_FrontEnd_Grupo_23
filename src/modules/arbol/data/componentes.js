// Actualizar estas relaciones al integrar nuevos componentes.
// App se define en src/App.jsx y main.jsx lo importa directamente.
const hoja = (nombre) => ({ nombre })
const nodo = (nombre, hijos) => ({ nombre, hijos })
const ficha = () => [hoja('FotoTransformable'), hoja('Ubicacion'), hoja('EnlaceGithub')]

export const componentes = nodo('App', [
  nodo('BrowserRouter → Routes → Route', [
    nodo('Layout', [
      hoja('Sidebar'),
      nodo('Outlet · una página según la ruta', [
        nodo('Inicio · /', [
          hoja('Hero'),
          nodo('GrillaEquipo', [nodo('TarjetaIntegrante × 4 · integrantes.json', ficha())]),
          hoja('Mision'),
        ]),
        nodo('Perfil · /equipo/:slug', [
          nodo('CarruselPerfiles', [hoja('Flecha × 2')]),
          nodo('FichaPerfil', ficha()),
          hoja('ListaHabilidades'),
          nodo('FavoritosIntegrante', [
            nodo('SeriePelicula × registro', [hoja('TarjetaPortada')]),
            nodo('Disco × registro', [hoja('TarjetaPortada')]),
          ]),
          hoja('Desafios · diálogo y generador'),
          hoja('IntegranteNoEncontrado · alternativa si el slug no existe'),
        ]),
        nodo('Favoritos · /favoritos', [hoja('TarjetaPortada × recomendación · cuatro JSON de perfiles')]),
        nodo('Clima · /clima', [hoja('PaginaPendiente')]),
        nodo('Bitacora · /bitacora', [hoja('PaginaPendiente')]),
        nodo('Arbol · /arbol', [hoja('NodoComponente · recursivo por cada rama')]),
        hoja('NoEncontrada · cualquier otra dirección'),
      ]),
      hoja('Footer'),
    ]),
  ]),
])
