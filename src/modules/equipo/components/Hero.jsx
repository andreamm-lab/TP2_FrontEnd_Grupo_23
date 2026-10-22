import { useState } from 'react'
import styles from './Hero.module.css'

function Hero() {
  const [encendido, setEncendido] = useState(false)

  return (
    <section className={`${styles.hero} ${encendido ? styles.encendido : ''}`} aria-labelledby="titulo-hero">
      <div className={styles.texto}>
        <p className={styles.eyebrow}>&lt;equipo_online /&gt;</p>
        <h1 id="titulo-hero">Código con energía de <span>otro nivel.</span></h1>
        <p className={styles.bajada}>
          Somos DragonByte: cuatro personas combinando creatividad, estrategia y desarrollo
          front-end para construir experiencias web con identidad.
        </p>
        <div className={styles.acciones}>
          <a className={`${styles.boton} ${styles.botonPrimario}`} href="#equipo">Conocer al equipo</a>
          <button
            type="button"
            className={`${styles.boton} ${styles.botonSecundario}`}
            aria-pressed={encendido}
            onClick={() => setEncendido((actual) => !actual)}
          >
            {encendido ? 'Desactivar poder' : 'Activar poder'}
          </button>
        </div>
        <p className={styles.mensaje} aria-live="polite">
          {encendido ? 'Nivel de energía: ¡DragonByte al máximo!' : 'Nivel de energía: estable.'}
        </p>
      </div>

      <div className={styles.nucleoEnergia} aria-hidden="true">
        <div className={styles.orbita}></div>
        <div className={styles.aura}>
          <svg className={styles.llamas} viewBox="0 0 430 430" fill="none" focusable="false">
            <defs>
              <linearGradient id="llama-exterior" x1="215" y1="355" x2="215" y2="25" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ff4d00" stopOpacity=".15" />
                <stop offset=".35" stopColor="#ff6a00" />
                <stop offset=".7" stopColor="#ffb52e" />
                <stop offset="1" stopColor="#fff4ba" />
              </linearGradient>
              <linearGradient id="llama-interior" x1="215" y1="335" x2="215" y2="65" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ff8a18" stopOpacity=".3" />
                <stop offset=".4" stopColor="#ffd84d" />
                <stop offset="1" stopColor="#fffce9" />
              </linearGradient>
            </defs>
            <path className={styles.llama} fill="url(#llama-exterior)" d="M215 355 C139 361 79 307 87 252 C90 228 76 207 66 189 C96 196 108 216 115 230 C106 179 127 164 110 123 C144 136 157 163 160 181 C169 134 190 121 184 76 C198 87 207 103 207 122 C232 90 247 62 237 25 C273 57 283 100 265 144 C291 126 299 107 299 88 C322 125 309 168 296 193 C321 181 337 165 337 142 C358 180 344 211 328 237 C351 231 359 211 360 200 C386 273 322 355 215 355 Z" />
            <path className={`${styles.llama} ${styles.llamaInterior}`} fill="url(#llama-interior)" d="M215 335 C153 340 113 299 120 249 C124 231 121 214 114 201 C136 209 147 226 149 240 C141 193 170 170 161 139 C180 152 192 176 187 198 C201 164 231 146 228 101 C250 126 254 156 241 187 C262 173 273 152 273 136 C289 169 280 204 266 223 C288 211 302 190 302 177 C320 212 303 234 302 251 C323 243 331 231 332 224 C339 282 292 335 215 335 Z" />
            <path className={`${styles.llama} ${styles.llamaBrillo}`} stroke="#fff5bf" strokeWidth="3" strokeLinecap="round" d="M106 273 C91 247 108 227 99 214 M178 159 C171 138 194 121 189 106 M276 165 C299 145 293 125 299 115 M326 294 C346 276 337 254 347 243" />
          </svg>
          <span className={styles.brasa}></span>
          <span className={styles.brasa}></span>
          <span className={styles.brasa}></span>
          <span className={styles.brasa}></span>
        </div>
        <div className={styles.nucleo}>
          <span className={`${styles.estrella} ${styles.estrella1}`}></span>
          <span className={`${styles.estrella} ${styles.estrella2}`}></span>
          <span className={`${styles.estrella} ${styles.estrella3}`}></span>
          <span className={`${styles.estrella} ${styles.estrella4}`}></span>
          <span className={`${styles.estrella} ${styles.estrella5}`}></span>
          <span className={styles.siglas}>DB</span>
        </div>
        <span className={`${styles.chispa} ${styles.chispa1}`}></span>
        <span className={`${styles.chispa} ${styles.chispa2}`}></span>
        <span className={`${styles.chispa} ${styles.chispa3}`}></span>
      </div>
    </section>
  )
}

export default Hero
