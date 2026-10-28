/** Página principal de BLOOME: organiza las secciones visibles, la navegación y los estados de interacción. */

import { useEffect, useState } from "react"
import heroImage from "../assets/main/bloome-hero.png"
import {
  NAV_LINKS, TREATMENT_CATEGORIES, PILLARS, PROMOTIONS, BOOKING_URL,
} from "../data/treatments"
import {
  Logo, ContactIcon, ServiceDetails, ArrowIcon,
  type ExpandableService, type NavigableService, SERVICE_HASHES,
} from "./TreatmentComponents"

export default function PublicSite() {
  // Estados de interfaz: menú móvil, cabecera al desplazarse y tratamiento abierto.
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openService, setOpenService] = useState<ExpandableService | null>(null)

  // Detecta el desplazamiento para adaptar el aspecto de la cabecera.
  // Escucha el desplazamiento y limpia el evento al desmontar el componente.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Sincroniza el tratamiento abierto con el hash de la URL y permite enlaces directos.
  // Sincroniza el detalle visible con el hash y la navegación atrás/adelante del navegador.
  useEffect(() => {
    const syncServiceWithLocation = () => {
      const category = (Object.entries(
        SERVICE_HASHES,
      ) as [NavigableService, string][]).find(
        ([, hash]) => hash === window.location.hash,
      )?.[0]

      setOpenService(category ?? null)
    }

    syncServiceWithLocation()
    window.addEventListener("popstate", syncServiceWithLocation)
    window.addEventListener("hashchange", syncServiceWithLocation)
    return () => {
      window.removeEventListener("popstate", syncServiceWithLocation)
      window.removeEventListener("hashchange", syncServiceWithLocation)
    }
  }, [])

  // Abre una categoría, actualiza la URL y desplaza suavemente la vista al comienzo.
  const openTreatmentCategory = (category: NavigableService) => {
    window.history.pushState(null, "", SERVICE_HASHES[category])
    setOpenService(category)
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  // Cierra el detalle y vuelve a la sección general de tratamientos.
  const closeTreatmentCategory = () => {
    window.history.pushState(null, "", "#tratamientos")
    setOpenService(null)
    window.requestAnimationFrame(() => {
      document
        .querySelector("#tratamientos")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <div className="min-h-screen bg-off-white text-ink">
      {/* Barra de navegación: logo, enlaces de escritorio y acceso al menú móvil. */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || openService
            ? "bg-teal-deep/95 shadow-xl shadow-teal-deep/10 backdrop-blur-xl"
            : "bg-transparent"
        }`}
        aria-label="Navegación principal"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#inicio"
            aria-label="BLOOME, volver al inicio"
            onClick={() => setOpenService(null)}
          >
            <Logo />
          </a>
          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpenService(null)}
                className="text-xs font-medium uppercase tracking-[0.14em] text-off-white transition-opacity hover:opacity-65"
              >
                {link.label}
              </a>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-teal-soft px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-all hover:-translate-y-0.5 hover:bg-off-white hover:text-teal-deep"
            >
              Reservar Turno
            </a>
          </div>
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
        {/* El panel de navegación móvil se muestra solo si el estado está activado. */}
        {menuOpen && (
          <div className="flex flex-col gap-1 border-t border-white/10 bg-teal-deep/98 px-6 pb-7 pt-4 lg:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setMenuOpen(false)
                  setOpenService(null)
                }}
                className="border-b border-white/10 py-3 text-sm font-medium uppercase tracking-[0.15em] text-off-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-full bg-teal-soft px-5 py-3 text-center text-sm font-semibold uppercase tracking-wider text-white"
            >
              Reservar Turno
            </a>
          </div>
        )}
      </nav>

      {/* Decide entre la página institucional completa y el detalle de una categoría. */}
      {!openService ? (
        <>
          {/* Portada principal con imagen, mensaje de marca y enlace al catálogo. */}
          <section
            id="inicio"
            className="relative flex min-h-screen items-center overflow-hidden bg-teal-deep"
          >
            <div className="absolute inset-0">
              <img
                src={heroImage}
                alt="Mujer entre hojas verdes"
                className="h-full w-full object-cover object-center md:object-[65%_center]"
              />
            </div>
            <div className="hero-protection-layer" aria-hidden="true" />
            <div className="botanical-shadow absolute -bottom-24 -left-16 hidden h-96 w-96 opacity-20 md:block" />
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-28 sm:pb-24 sm:pt-36">
              <div className="max-w-3xl py-7 sm:py-9">
                <p className="mb-4 text-xl font-semibold uppercase tracking-[0.18em] text-sage-light sm:mb-5 sm:tracking-[0.3em]">
                  Centro de estética · San Luis
                </p>
                <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[1.05] tracking-[-0.025em] text-off-white sm:text-6xl lg:text-[80px]">
                  <span className="block">Tu mejor versión</span>
                  <span className="mt-1 block italic text-sage-light">
                    florece en <strong className="font-semibold">Bloome</strong>
                    .
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-xl font-normal leading-relaxed text-off-white sm:mt-7 md:text-[25px]">
                  Tratamientos estéticos y corporales personalizados,
                  acompañados por profesionales.
                </p>
                <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
                  <a
                    href="#tratamientos"
                    className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-teal-soft bg-teal-soft px-2 py-4 text-[11px] font-semibold uppercase tracking-normal text-off-white transition-colors hover:bg-off-white hover:text-teal-deep sm:w-auto sm:px-8 sm:text-sm sm:tracking-[0.08em]"
                  >
                    Conocé nuestros tratamientos →
                  </a>
                </div>
              </div>
            </div>
            <a
              href="#nosotros"
              className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-off-white/50 md:flex"
            >
              Descubrir
              <span className="h-10 w-px bg-off-white/30" />
            </a>
          </section>

          {/* Presentación de la filosofía de BLOOME y sus pilares de atención. */}
          <section id="nosotros" className="bg-[#f9fafa] px-6 py-20 md:py-28">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-10 border-b border-teal-soft/15 pb-14 md:grid-cols-2 md:gap-16 md:pb-20">
                <div>
                  <p className="mb-4 text-xl font-semibold uppercase tracking-[0.3em] text-teal-soft">
                    Quiénes somos
                  </p>
                  <h2 className="max-w-xl font-serif text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-teal-deep sm:text-5xl lg:text-6xl">
                    <span className="block">Un enfoque integral</span>
                    <em className="block font-normal text-teal-soft">
                      para tu bienestar
                    </em>
                  </h2>
                </div>
                <p className="self-end max-w-xl text-xl font-normal leading-8 text-ink-muted md:leading-9">
                  En Bloome creemos que el cuidado personal no debe sentirse
                  como una exigencia, sino como un momento para vos. Por eso,
                  como cada persona es diferente, buscamos conocer tus
                  necesidades y objetivos para ofrecerte tratamientos pensados
                  para vos.
                </p>
              </div>

              {/* Genera una tarjeta por cada pilar definido en los datos. */}
              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
                {/* Repite una tarjeta por cada pilar institucional. */}
                {PILLARS.map((pillar) => (
                  <article
                    key={pillar.title}
                    className="min-h-64 rounded-3xl border border-teal-soft/20 bg-white p-7 sm:p-8"
                  >
                    <h3 className="mt-8 font-serif text-2xl font-medium text-teal-deep">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-ink-muted">
                      {pillar.desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Catálogo de categorías con imágenes, descripciones y accesos al detalle. */}
          <section
            id="tratamientos"
            className="relative overflow-hidden bg-white px-6 py-24 md:py-32"
          >
            <div className="botanical-shadow absolute -right-28 top-0 h-96 w-96 opacity-10" />
            <div className="relative mx-auto max-w-7xl">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <p className="mb-4 text-xl font-semibold uppercase tracking-[0.3em] text-teal-soft">
                  Cuidado a tu medida
                </p>
                <h2 className="section-title">Nuestros Tratamientos</h2>
                <p className="mt-5 text-xl leading-7 text-ink-muted">
                  Explorá nuestras propuestas y encontrá tu momento.
                </p>
              </div>
              {!openService ? (
                <div className="grid items-start gap-6 sm:grid-cols-2">
                  {/* Recorre las categorías en el orden en que deben mostrarse. */}
                  {["facials", "body", "laser", "brows", "nails"].map(
                    (categoryId) => {
                      // Busca los datos completos de la categoría actual.
                      const category = TREATMENT_CATEGORIES.find(
                        ({ id }) => id === categoryId,
                      )!

                      return (
                        <article
                          key={category.title}
                          className={`group flex flex-col overflow-hidden rounded-[24px] border border-teal-deep/10 bg-[#F9FAFA] transition-all duration-300 hover:-translate-y-1 hover:border-teal-soft/40 hover:shadow-[0_16px_40px_rgba(11,70,72,0.08)] ${
                            category.id === "nails"
                              ? "sm:col-span-2 md:grid md:grid-cols-2"
                              : ""
                          }`}
                        >
                          <div
                            className={`h-52 overflow-hidden bg-sage-cream sm:h-56 ${
                              category.id === "nails"
                                ? "md:h-auto md:min-h-72"
                                : ""
                            }`}
                          >
                            <img
                              src={category.img}
                              alt={category.alt}
                              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
                            />
                          </div>
                          <div
                            className={`flex flex-col p-6 md:p-7 ${
                              category.id === "nails" ? "flex-1" : ""
                            } ${category.id === "facials" ? "bg-white" : ""}`}
                          >
                            <h3 className="font-serif text-[30px] font-normal leading-tight tracking-[-0.02em] text-teal-deep">
                              {category.title}
                            </h3>
                            <p className="mt-3 text-[17px] leading-6 text-ink-muted">
                              {category.description}
                            </p>
                            {category.id === "nails" && (
                              <ul className="mt-5 grid gap-x-4 gap-y-2 sm:grid-cols-2">
                                {category.services.map((service) => (
                                  <li
                                    key={service}
                                    className="flex items-start gap-2 text-[15px] leading-5 text-ink-muted"
                                  >
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-soft" />
                                    {service}
                                  </li>
                                ))}
                              </ul>
                            )}
                            <div
                              className={`flex items-center justify-between gap-4 border-t border-teal-deep/10 pt-5 ${
                                category.id === "nails" ? "mt-auto" : "mt-6"
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  openTreatmentCategory(
                                    category.id as NavigableService,
                                  )
                                }}
                                className="inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-teal-soft transition-colors hover:text-teal-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-soft"
                                aria-label={`Más información sobre ${category.title.toLowerCase()}`}
                              >
                                Más información <ArrowIcon />
                              </button>
                            </div>
                          </div>
                        </article>
                      )
                    },
                  )}
                </div>
              ) : null}
            </div>
          </section>

          {/* Promociones y experiencias destacadas cargadas desde PROMOTIONS. */}
          <section
            id="imperdibles"
            className="relative overflow-hidden bg-[#edf1e8] px-6 py-24 md:py-32"
          >
            <div className="botanical-shadow absolute -right-24 -top-24 h-[32rem] w-[32rem] rotate-45 opacity-15" />
            <div className="absolute -bottom-48 -left-40 size-[30rem] rounded-full bg-teal-deep/10 blur-3xl" />
            <div className="relative mx-auto max-w-7xl">
              <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                <div>
                  <p className="section-label editor-text-20">Experiencias BLOOME</p>
                  <h2 className="section-title editor-text-60">Imperdibles</h2>
                  <p className="mt-6 max-w-lg text-[20px] leading-7 text-ink-muted">
                    Propuestas pensadas para que puedas disfrutar de nuestros
                    tratamientos y experiencias de cuidado.
                  </p>
                  <div className="mt-10 h-px w-24 bg-teal-soft/40" />
                  <p className="mt-6 max-w-sm text-[16px] leading-6 text-ink-muted">
                    Consultá disponibilidad, valores y vigencia al momento de
                    reservar.
                  </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Convierte cada promoción en una tarjeta visual. */}
                  {PROMOTIONS.map((promo, index) => (
                    <article
                      key={promo.title}
                      className={`promo-card rounded-3xl border border-t-4 bg-[#F9FAFA] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-teal-deep/5 ${
                        index === 0 || index === 3
                          ? "border-teal-soft"
                          : "border-[#fe8647]"
                      }`}
                    >
                      <h3 className="font-serif text-[24px] font-semibold text-teal-deep">
                        {promo.title}
                      </h3>
                      <p className="mt-3 text-[16px] font-medium leading-6 text-sage-deep">
                        {promo.included}
                      </p>
                      <p className="mt-6 border-t border-sage-deep/10 pt-5 text-[14px] text-ink-muted">
                        Consultá disponibilidad y vigencia.
                      </p>
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-teal-soft hover:text-teal-deep"
                      >
                        Reservar turno <ArrowIcon />
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Datos de contacto, perfiles sociales y mapa de ubicación. */}
          <section id="contacto" className="bg-[#f9fafa] px-6 py-24 md:py-32">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <p className="section-label editor-text-20">Encontranos</p>
                <h2 className="section-title editor-text-60">
                  Contacto & Ubicación
                </h2>
              </div>
              <div className="grid gap-12 lg:grid-cols-2">
                <div className="space-y-7">
                  {[
                    {
                      icon: "location" as const,
                      label: "Dirección",
                      value: "República del Líbano 163, San Luis",
                    },
                    {
                      icon: "phone" as const,
                      label: "Teléfono / WhatsApp",
                      value: "2664 884080",
                    },
                    {
                      icon: "clock" as const,
                      label: "Horarios",
                      value: "Lunes a viernes, de 9:00 a 21:00",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-5">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-teal-soft/10 text-teal-soft">
                        <ContactIcon type={item.icon} />
                      </div>
                      <div>
                        <p className="mb-1 text-[14px] font-semibold uppercase tracking-[0.16em] text-teal-soft">
                          {item.label}
                        </p>
                        <p className="text-[17px] text-teal-deep">{item.value}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3">
                    <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.16em] text-teal-soft">
                      Seguinos
                    </p>
                    <div className="flex gap-3">
                      {[
                        {
                          label: "Instagram",
                          href: "https://instagram.com/bloome.sl",
                          short: "Ig",
                        },
                        {
                          label: "Facebook",
                          href: "https://facebook.com/bloomesl",
                          short: "Fb",
                        },
                        {
                          label: "TikTok",
                          href: "https://www.tiktok.com/@bloome.sl",
                          short: "Tk",
                        },
                      ].map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-11 items-center justify-center rounded-2xl bg-teal-deep px-4 text-xs font-semibold text-off-white transition-transform hover:-translate-y-1"
                          aria-label={social.label}
                        >
                          {social.short}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Mapa de Google Maps con una etiqueta de dirección superpuesta. */}
                <div className="relative min-h-96 overflow-hidden rounded-3xl border border-teal-soft/15 bg-sage/20">
                  <iframe
                    title="BLOOME ubicación"
                    src="https://www.google.com/maps?q=Rep%C3%BAblica%20del%20L%C3%ADbano%20163%2C%20San%20Luis&output=embed"
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute left-4 top-4 rounded-xl bg-off-white/95 px-4 py-2 shadow-md backdrop-blur-md">
                    <p className="text-xs font-semibold text-teal-deep">
                      BLOOME · República del Líbano 163
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <main className="bg-white px-6 pb-24 pt-32 md:pb-32 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <ServiceDetails
              category={openService}
              onBack={closeTreatmentCategory}
            />
          </div>
        </main>
      )}

      {/* Pie de página con marca, horario y enlaces rápidos a tratamientos. */}
      <footer className="bg-teal-deep px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-12 md:grid-cols-3">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-[16px] leading-6 text-off-white/75">
                Centro de estética en San Luis. Tu espacio de cuidado, bienestar
                y autenticidad.
              </p>
            </div>
            <div>
              <p className="mb-4 text-[15px] font-semibold uppercase tracking-[0.25em] text-sage-light">
                Horarios
              </p>
              <div className="space-y-2">
                {[["Lunes – Viernes", "9:00 – 21:00"]].map(([day, time]) => (
                  <div
                    key={day}
                    className="flex justify-between text-[16px] text-off-white/75"
                  >
                    <span>{day}</span>
                    <span className="text-off-white/90">{time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 text-[15px] font-semibold uppercase tracking-[0.25em] text-sage-light">
                Tratamientos
              </p>
              <div className="space-y-2">
                {/* Enlaces rápidos a categorías al final de la página. */}
                {TREATMENT_CATEGORIES.filter(
                  (category) => category.id !== "kinesiology",
                ).map((category) => (
                  <a
                    key={category.title}
                    href="#tratamientos"
                    className="block text-[16px] text-off-white/75 hover:text-off-white"
                  >
                    {category.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-off-white/20 pt-8 text-xs text-off-white/65 md:flex-row">
            <p className="text-[16px]">
              © 2026 BLOOME – Centro de estética. Todos los derechos reservados.
            </p>
            <p className="text-[16px]">República del Líbano 163 · San Luis</p>
          </div>
        </div>
      </footer>

      {/* Acceso flotante a reservas por WhatsApp, visible en todas las secciones. */}
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 flex size-12 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl transition-transform hover:scale-110 sm:bottom-6 sm:right-6 sm:size-14"
        aria-label="Reservar por WhatsApp"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.12 1.522 5.855L.057 23.43a.5.5 0 0 0 .614.614l5.569-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0Zm0 22c-1.97 0-3.81-.524-5.394-1.436l-.387-.23-4.005 1.052 1.053-3.907-.253-.4A9.952 9.952 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z" />
        </svg>
      </a>
    </div>
  )
}
