/** Componentes reutilizables de la web: íconos, logo y presentación/detalle de los tratamientos. */

import { useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from "react"
import logoWhite from "../assets/main/bloome-logo.png"
import {
  WHATSAPP_NUMBER, BOOKING_URL, TREATMENT_CATEGORIES,
  FACIAL_TREATMENTS, BODY_TREATMENTS, BROW_TREATMENTS, LASER_TREATMENTS, NAIL_TREATMENTS,
  type Treatment, type TreatmentImage,
} from "../data/treatments"

// Ícono de flecha reutilizable para enlaces y llamadas a la acción.
export function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="arrow-icon size-4 shrink-0" aria-hidden="true">
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

// Imagen que aparece con un fundido suave cuando termina de cargar.
export function FadeImage({ className = "", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  // Si la imagen ya estaba en caché, se marca como cargada al montar.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [])

  return (
    <img
      ref={ref}
      loading="lazy"
      decoding="async"
      {...props}
      onLoad={() => setLoaded(true)}
      className={`fade-img ${loaded ? "is-loaded" : ""} ${className}`}
    />
  )
}

// Convierte un título en un id apto para anclas (ej: "HIGIENE FACIAL" → "higiene-facial").
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
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
      <FadeImage
        src={image.src}
        alt={image.alt}
        className="block h-full min-h-0 w-full object-cover transition-transform duration-700 group-hover/card:scale-[1.03]"
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
      className="btn-primary mt-7"
    >
      Reservar este tratamiento <ArrowIcon />
    </a>
  )
}

// Plantilla común de ficha: imagen, título, contenido y enlace para reservar.
export function EditorialService({
  id,
  title,
  index,
  children,
  visual,
  uppercaseTitle = true,
}: {
  id?: string
  title: string
  index: number
  children: ReactNode
  visual?: ReactNode
  uppercaseTitle?: boolean
}) {
  return (
    <article id={id} className="group/card scroll-mt-12 grid overflow-hidden rounded-[2rem] border border-teal-soft/10 bg-off-white shadow-lg shadow-teal-deep/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-teal-deep/10 lg:grid-cols-2">
      <div
        className={`h-72 overflow-hidden border-teal-soft/10 ${
          index % 2 === 1 ? "lg:order-2 lg:border-l" : "lg:border-r"
        } sm:h-84 lg:h-full`}
        >
        {visual ?? <PhotoPlaceholder label={title} />}
      </div>
      <div className={`p-7 md:p-9 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
        <h4
          className={`font-serif text-2xl font-semibold leading-tight text-teal-deep md:text-[1.625rem] ${
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
          id={slugify(treatment.title)}
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
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-teal-soft">
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

// Relaciona cada categoría con su colección de fichas.
const TREATMENTS_BY_CATEGORY: Record<NavigableService, Treatment[]> = {
  facials: FACIAL_TREATMENTS,
  body: BODY_TREATMENTS,
  brows: BROW_TREATMENTS,
  laser: LASER_TREATMENTS,
  nails: NAIL_TREATMENTS,
}

// Elige y muestra la colección de tratamientos de la categoría activa.
export function ServiceDetails({
  category,
  onBack,
  onOpenCategory,
}: {
  category: ExpandableService
  onBack: () => void
  onOpenCategory: (category: NavigableService) => void
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

  const treatments =
    category !== "kinesiology" ? TREATMENTS_BY_CATEGORY[category] : []
  const categoryInfo = TREATMENT_CATEGORIES.find(({ id }) => id === category)
  const otherCategories = TREATMENT_CATEGORIES.filter(
    ({ id }) => id !== category && id in TREATMENTS_BY_CATEGORY,
  )

  // Desplaza hasta una ficha sin cambiar el hash (así no se cierra el detalle).
  const scrollToTreatment = (title: string) => {
    document
      .getElementById(slugify(title))
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
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
      {/* Encabezado: migas de pan, título, descripción y cantidad de opciones. */}
      <div className="mb-6 border-b border-teal-soft/15 pb-8">
        <nav aria-label="Ruta de navegación" className="mb-5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-teal-soft/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal-soft transition-colors hover:border-teal-soft hover:bg-teal-soft hover:text-off-white"
          >
            <span aria-hidden="true">←</span> Volver a tratamientos
          </button>
        </nav>
        <h3 className="font-serif text-3xl font-semibold uppercase tracking-[0.04em] text-teal-deep md:text-4xl">
          {titles[category]}
        </h3>
        {categoryInfo && (
          <p className="mt-4 max-w-2xl text-lg leading-7 text-ink-muted">
            {categoryInfo.description}
          </p>
        )}
        {treatments.length > 1 && (
          <p className="mt-3 text-sm font-medium text-teal-soft">
            {treatments.length} opciones disponibles
          </p>
        )}
      </div>

      {/* Índice fijo: permite saltar directo a cada tratamiento de la categoría. */}
      {treatments.length > 1 && (
        <div className="sticky top-[3.75rem] z-30 lg:top-14 -mx-6 mb-10 border-b border-teal-soft/10 bg-white/95 px-6 py-3 backdrop-blur-md">
          <div className="no-scrollbar flex gap-2 overflow-x-auto" role="list" aria-label="Ir a un tratamiento">
            {treatments.map((treatment) => (
              <button
                key={treatment.title}
                type="button"
                role="listitem"
                onClick={() => scrollToTreatment(treatment.title)}
                className="shrink-0 whitespace-nowrap rounded-full border border-teal-soft/25 bg-off-white px-4 py-2 text-xs font-semibold capitalize text-teal-deep transition-colors hover:border-teal-soft hover:bg-teal-soft hover:text-off-white"
              >
                {treatment.title.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      <TreatmentCollection treatments={treatments} />

      {/* Cierre: ayuda para elegir y acceso al resto de las categorías. */}
      <div className="mt-16 rounded-[2rem] bg-teal-deep p-8 text-off-white md:p-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h4 className="font-serif text-2xl font-medium leading-tight md:text-3xl">
              ¿No sabés cuál elegir?
            </h4>
            <p className="mt-3 max-w-lg text-base leading-7 text-off-white/80">
              Escribinos y te ayudamos a encontrar el tratamiento ideal según tu
              piel y tus objetivos.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light mt-6"
            >
              Consultar por WhatsApp <ArrowIcon />
            </a>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sage-light">
              Otras categorías
            </p>
            <div className="flex flex-wrap gap-2">
              {otherCategories.map((other) => (
                <button
                  key={other.id}
                  type="button"
                  onClick={() => onOpenCategory(other.id as NavigableService)}
                  className="rounded-full border border-off-white/30 px-4 py-2 text-sm text-off-white transition-colors hover:bg-off-white hover:text-teal-deep"
                >
                  {other.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Muestra el logotipo reutilizable de BLOOME.
export function Logo() {
  return (
    <div className="grid w-32 sm:w-36" aria-label="BLOOME, Centro de estética">
      <div className="block h-auto w-full object-contain" aria-hidden="true">
        <img src={logoWhite} alt="" className="block w-full" />
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

