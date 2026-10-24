import TarjetaPortada from './TarjetaPortada'

export default function SeriePelicula({ nombre, imagen, url, etiquetaEnlace }) {
  return <TarjetaPortada nombre={nombre} imagen={imagen} url={url} etiquetaEnlace={etiquetaEnlace} />
}
