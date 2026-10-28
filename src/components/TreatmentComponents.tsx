/** Componentes reutilizables de la web: íconos, logo y presentación/detalle de los tratamientos. */

import type { ReactNode } from "react"
import logoWhite from "../assets/main/bloome-logo.png"
import {
  WHATSAPP_NUMBER,
  FACIAL_TREATMENTS, BODY_TREATMENTS, BROW_TREATMENTS, LASER_TREATMENTS, NAIL_TREATMENTS,
  type Treatment, type TreatmentImage,
} from "../data/treatments"

// Ícono de flecha reutilizable para enlaces y llamadas a la acción.
export function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
      <path
        d="M3 10h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Tipos que limitan las categorías válidas para abrir y navegar tratamientos.
// Categorías que pueden abrirse como fichas detalladas.
export type ExpandableService = "facials" | "body" | "brows" | "laser" | "kinesiology" | "nails"
// Categorías que tienen un hash propio para navegación directa.
export type NavigableService = "facials" | "body" | "brows" | "laser" | "nails"


export const SERVICE_HASHES: Record<NavigableService, string> = {
  facials: "#tratamientos-faciales",
  body: "#tratamientos-corporales",
  brows: "#cejas-y-pestanas",
  laser: "#depilacion-definitiva",
  nails: "#unas",
}

// Reserva un espacio accesible cuando una categoría no tiene imagen disponible.
export function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex min-h-72 h-full items-center justify-center bg-sage-cream p-8"
      role="img"
      aria-label={`Espacio reservado para una fotografía de ${label}`}
    >
    </div>
  )
}

// Muestra la imagen principal de una ficha o un fondo neutro si no hay foto.
export function TreatmentGallery({ images }: { images: TreatmentImage[] }) {
  const image = images[0]
  if (!image) {
    return <div className="aspect-square h-full w-full bg-sage-cream" aria-hidden="true" />
  }
  return (
    <div className="aspect-square h-full min-h-0 w-full overflow-hidden bg-sage-cream" aria-label="Fotografía del tratamiento">
      <img
        src={image.src}
        alt={image.alt}
        className="block h-full min-h-0 w-full object-cover"
      />
    </div>
  )
}

// Genera un enlace de WhatsApp con el nombre del tratamiento en el mensaje.
export function BookingLink({ service }: { service: string }) {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hola BLOOME, quisiera coordinar un turno para ${service}.`,
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-7 inline-flex items-center gap-2 rounded-full border border-teal-soft bg-teal-soft px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-off-white transition-colors hover:bg-off-white hover:text-teal-deep"
    >
      Coordinar turno <ArrowIcon />
    </a>
  )
}

// Plantilla común de ficha: imagen, título, contenido y enlace para reservar.
export function EditorialService({
  title,
  index,
  children,
  visual,
  uppercaseTitle = true,
}: {
  title: string
  index: number
  children: ReactNode
  visual?: ReactNode
  uppercaseTitle?: boolean
}) {
  return (

<article className="grid overflow-hidden rounded-[2rem] border border-teal-soft/10 bg-off-white shadow-lg shadow-teal-deep/5 lg:grid-cols-2">
      <div
        className={`h-72 overflow-hidden border-teal-soft/10 ${
          index % 2 === 1 ? "lg:order-2 lg:border-l" : "lg:border-r"
        } sm:h-84 lg:h-full`}
        >
        {visual ?? <PhotoPlaceholder label={title} />}
      </div>
      <div className={`p-7 md:p-9 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
        <h4
          className={`font-serif text-2xl font-semibold leading-tight text-teal-deep md:text-3xl ${
            uppercaseTitle ? "uppercase" : ""
          }`}
        >
          {title}
        </h4>
        {children}
        <BookingLink service={title} />
      </div>
    </article>
  )
}

// Presenta una lista de elementos incluidos usando viñetas con el estilo del sitio.
export function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-sm leading-6 text-ink-muted"
        >
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-soft" />
          {item}
        </li>
      ))}
    </ul>
  )
}

// Recorre una colección de tratamientos y genera una ficha por cada elemento.
export function TreatmentCollection({
  treatments,
}: {
  treatments: Treatment[]
}) {
  return (
    <div className="space-y-7">
      {/* Cada objeto de datos se convierte en una ficha visual de tratamiento. */}
      {treatments.map((treatment, index) => (
        <EditorialService
          key={treatment.title}
          title={treatment.title}
          index={index}
          uppercaseTitle={false}
          visual={
            treatment.images ? (
              <TreatmentGallery images={treatment.images} />
            ) : undefined
          }
        >
          <div className="mt-5 space-y-3">
            {/* Renderiza cada párrafo de la descripción por separado. */}
            {treatment.description.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
          {treatment.includes && (
            <div className="mt-7 border-t border-teal-soft/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-deep">
                Incluye
              </p>
              <DetailList items={treatment.includes} />
            </div>
          )}
          <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-teal-soft/10 bg-teal-soft/10">
            {[
              ["Duración", treatment.duration],
              ["Recuperación", treatment.recovery],
              ["Resultados", treatment.results],
              ["Frecuencia", treatment.frequency],
            ]
              .filter((item): item is [string, string] => Boolean(item[1]))
              .map(([label, value]) => (
                <div key={label} className="bg-white p-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-soft">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium leading-5 text-teal-deep">
                    {value}
                  </dd>
                </div>
              ))}
          </dl>
        </EditorialService>
      ))}
    </div>
  )
}

// Elige y muestra la colección de tratamientos de la categoría activa.
export function ServiceDetails({
  category,
  onBack,
}: {
  category: ExpandableService
  onBack: () => void
}) {
  // Traduce los identificadores internos a títulos legibles para la página.
  const titles: Record<ExpandableService, string> = {
    facials: "Tratamientos Faciales",
    body: "Tratamientos Corporales",
    brows: "Cejas y Pestañas",
    laser: "Depilación Definitiva",
    kinesiology: "Kinesiología y Fisioterapia",
    nails: "Uñas",
  }

  // Asigna un id de ancla cuando la categoría dispone de una ruta navegable.
  return (
    <div
      id={
        category !== "kinesiology"
          ? SERVICE_HASHES[category].slice(1)
          : undefined
      }
      className="service-reveal"
    >
      <div className="mb-10 border-b border-teal-soft/15 pb-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-teal-soft transition-colors hover:text-teal-deep"
        >
          ← Volver a tratamientos
        </button>
        <h3 className="font-serif text-3xl font-semibold uppercase tracking-[0.04em] text-teal-deep md:text-5xl">
          {titles[category]}
        </h3>
      </div>
      {category === "facials" && (
        <TreatmentCollection treatments={FACIAL_TREATMENTS} />
      )}
      {category === "body" && (
        <TreatmentCollection treatments={BODY_TREATMENTS} />
      )}
      {category === "brows" && (
        <TreatmentCollection treatments={BROW_TREATMENTS} />
      )}
      {category === "laser" && (
        <TreatmentCollection treatments={LASER_TREATMENTS} />
      )}
      {category === "nails" && (
        <TreatmentCollection treatments={NAIL_TREATMENTS} />
      )}
    </div>
  )
}

// Muestra el logotipo reutilizable de BLOOME.
export function Logo() {
  return (
    <div className="grid w-44" aria-label="BLOOME, Centro de estética">
      <div className="block h-auto w-40 object-contain" aria-hidden="true">
        <img src={logoWhite} alt="" className="w-[210px] max-w-none" />
      </div>
    </div>
  )
}

// Dibuja el icono SVG correspondiente al tipo de dato de contacto.
export function ContactIcon({
  type,
}: {
  type: "location" | "phone" | "mail" | "clock"
}) {
  // Guarda los trazos SVG de cada icono en un único objeto reutilizable.
  const paths = {
    location: (
      <>
        <path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    phone: (
      <path d="M8 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-3l-4-1-1.5 2.2a13.5 13.5 0 0 1-8.7-8.7L9 7 8 3Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
      {/* Inserta los trazos del icono seleccionado mediante paths[type]. */}
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[type]}
      </g>
    </svg>
  )
}

