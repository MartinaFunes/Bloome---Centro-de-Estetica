/** Página "Quiénes somos": presenta el centro, su espacio, la tecnología que usa y cómo llegar. */

import type React from "react"
import espacioRecepcion from "../assets/espacio/recepcion.webp"
import espacioSala from "../assets/espacio/sala-espera.webp"
import espacioPlantas from "../assets/espacio/recepcion-plantas.webp"
import espacioAparatologia from "../assets/espacio/aparatologia.webp"
import espacioPuerta from "../assets/espacio/puerta.webp"
import espacioFachada from "../assets/espacio/fachada.webp"
import { BOOKING_URL, PILLARS, TREATMENT_CATEGORIES } from "../data/treatments"
import { ArrowIcon, FadeImage, type NavigableService } from "./TreatmentComponents"

// Enlace para abrir la ruta hasta el centro en Google Maps.
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Rep%C3%BAblica%20del%20L%C3%ADbano%20163%2C%20San%20Luis"

// Fotos reales del centro con su descripción (alt) y una leyenda breve.
const SPACE_PHOTOS = [
  { src: espacioSala, alt: "Sala de espera con letras BLOOME, plantas y sillón capitoné turquesa.", caption: "Sala de espera" },
  { src: espacioPlantas, alt: "Mostrador de recepción decorado con plantas.", caption: "Recepción" },
  { src: espacioPuerta, alt: "Puerta de entrada de BLOOME con el logo en el vidrio.", caption: "La entrada" },
  { src: espacioFachada, alt: "Frente del local de BLOOME en color turquesa.", caption: "Nuestro frente" },
]

// Equipos y técnicas que el centro usa en sus tratamientos (tomados de las fichas).
const TECHNOLOGIES = [
  { name: "Alpha Sinergy", detail: "Tratamientos corporales y faciales" },
  { name: "Mio Up", detail: "Tonificación muscular" },
  { name: "Bio Roll", detail: "Pulsos magnéticos y radiofrecuencia" },
  { name: "Crystal 3D Plus", detail: "Depilación definitiva: Alexandrita, Diodo y ND YAG con tecnología CRIO" },
  { name: "Fraxface y microneedling", detail: "Renovación y textura de la piel" },
]

export default function AboutPage({
  onBack,
  onOpenCategory,
}: {
  onBack: () => void
  onOpenCategory: (category: NavigableService) => void
}) {
  return (
    <main id="contenido" className="service-reveal bg-off-white">
      {/* Encabezado de la página con la presentación del centro. */}
      <section className="px-6 pb-14 pt-28 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={onBack}
            className="group mb-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-teal-soft/30 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-teal-soft transition-colors hover:border-teal-soft hover:bg-teal-soft hover:text-off-white"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">←</span> Volver al inicio
          </button>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-teal-soft sm:text-sm">
                Quiénes somos
              </p>
              <h1 className="font-serif text-[2.6rem] font-medium leading-[1.06] tracking-[-0.02em] text-teal-deep sm:text-5xl lg:text-6xl">
                <span className="block">Bloome,</span>
                <em className="block font-normal text-teal-soft">tu espacio de cuidado</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-ink-muted">
                Somos un centro de estética integral en San Luis. Creemos que el
                cuidado personal no debe sentirse como una exigencia, sino como
                un momento para vos.
              </p>
              <p className="mt-3 max-w-xl text-base leading-7 text-ink-muted">
                Por eso escuchamos tus necesidades y objetivos antes de proponerte
                un tratamiento, y te acompañamos en cada sesión.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Reservar turno <ArrowIcon />
                </a>
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  Cómo llegar
                </a>
              </div>
            </div>
            <figure className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sage-cream shadow-2xl shadow-teal-deep/10">
              <FadeImage
                src={espacioRecepcion}
                alt="Recepción de BLOOME con el logo en la pared y sillones turquesa."
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-off-white/95 px-4 py-2 text-xs font-semibold text-teal-deep shadow-md backdrop-blur-md">
                República del Líbano 163 · San Luis
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Valores del centro. */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-12 max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-soft">Lo que nos guía</p>
            <h2 className="section-title">Cómo trabajamos</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, index) => (
              <article
                key={pillar.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                className="card-hover group relative overflow-hidden rounded-3xl border border-teal-soft/20 bg-off-white p-7 sm:p-8"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-teal-soft transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                <span className="font-serif text-sm italic text-teal-soft" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-medium text-teal-deep">{pillar.title}</h3>
                <p className="mt-3 text-base leading-7 text-ink-muted">{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Galería del espacio con leyendas que aparecen al pasar el mouse. */}
      <section className="relative overflow-hidden bg-teal-deep px-6 py-16 md:py-24">
        <div className="botanical-shadow absolute -right-24 -top-24 h-[28rem] w-[28rem] opacity-10" />
        <div className="relative mx-auto max-w-7xl">
          <div data-reveal className="mb-12 grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sage-light">Nuestro espacio</p>
              <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-off-white sm:text-4xl">
                Un lugar pensado
                <em className="block font-normal text-sage-light">para que te sientas cómoda</em>
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-off-white/80 md:justify-self-end">
              Un ambiente cálido y luminoso, donde cada detalle está pensado para
              que disfrutes tu momento.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {SPACE_PHOTOS.map((photo, index) => (
              <figure
                key={photo.src}
                data-reveal
                style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
                className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-teal-soft/20"
              >
                <FadeImage
                  src={photo.src}
                  alt={photo.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-deep/80 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute bottom-4 left-4 font-serif text-lg text-off-white transition-transform duration-500 group-hover:-translate-y-1 md:text-xl">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnología y aparatología. */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <figure data-reveal className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sage-cream sm:aspect-[4/3] lg:aspect-[4/5]">
            <FadeImage
              src={espacioAparatologia}
              alt="Equipos de aparatología estética del centro."
              className="absolute inset-0 h-full w-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </figure>
          <div data-reveal>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-soft">Tecnología</p>
            <h2 className="section-title">Aparatología de última generación</h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-ink-muted">
              Trabajamos con equipos profesionales que nos permiten ofrecer
              tratamientos más cómodos, seguros y con mejores resultados.
            </p>
            <ul className="mt-8 divide-y divide-teal-soft/15 border-y border-teal-soft/15">
              {TECHNOLOGIES.map((tech) => (
                <li key={tech.name} className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:bg-white/60">
                  <span className="font-serif text-xl text-teal-deep transition-transform duration-300 group-hover:translate-x-1">
                    {tech.name}
                  </span>
                  <span className="text-right text-sm text-ink-muted">{tech.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Accesos a las categorías de tratamientos. */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-soft">Todo en un lugar</p>
              <h2 className="section-title">¿Qué hacemos?</h2>
            </div>
            <p className="max-w-md text-lg leading-7 text-ink-muted">
              Tratamientos faciales, corporales, de mirada, depilación y uñas, con
              atención personalizada.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {TREATMENT_CATEGORIES.map((category, index) => (
              <button
                key={category.id}
                type="button"
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                onClick={() => onOpenCategory(category.id as NavigableService)}
                className="card-hover group flex min-h-36 flex-col justify-between rounded-3xl border border-teal-soft/20 bg-off-white p-6 text-left hover:border-teal-soft hover:bg-teal-deep"
              >
                <span className="font-serif text-2xl leading-tight text-teal-deep transition-colors group-hover:text-off-white">
                  {category.title}
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-teal-soft transition-colors group-hover:text-sage-light">
                  Ver tratamientos <ArrowIcon />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre con llamada a la acción. */}
      <section className="px-6 py-20 md:py-24">
        <div data-reveal className="mx-auto flex max-w-5xl flex-col items-center rounded-[2rem] bg-teal-deep px-6 py-14 text-center md:px-16 md:py-20">
          <h2 className="font-serif text-3xl font-medium leading-tight text-off-white md:text-4xl">
            Te esperamos en <em className="font-normal text-sage-light">Bloome</em>
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-8 text-off-white/80">
            República del Líbano 163, San Luis. Escribinos y coordinamos tu turno.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-light">
              Reservar por WhatsApp <ArrowIcon />
            </a>
            <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
              Cómo llegar
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
