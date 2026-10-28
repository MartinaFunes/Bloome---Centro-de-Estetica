/** Página principal de BLOOME: organiza las secciones visibles, la navegación y los estados de interacción. */

import React, { useEffect, useState } from "react"
import heroImage from "../assets/main/bloome-hero.webp"
import AboutPage from "./AboutPage"
import {
  NAV_LINKS, TREATMENT_CATEGORIES, PILLARS, PROMOTIONS, BOOKING_URL, WHATSAPP_NUMBER,
} from "../data/treatments"
import {
  Logo, ContactIcon, ServiceDetails, ArrowIcon, FadeImage,
  type ExpandableService, type NavigableService, SERVICE_HASHES,
} from "./TreatmentComponents"

// Dirección de la página "Quiénes somos".
const ABOUT_HASH = "#quienes-somos"

// Orden único de categorías para el catálogo y el pie de página.
const CATEGORY_ORDER = ["facials", "body", "laser", "brows", "nails"] as const

export default function PublicSite() {
  // Estados de interfaz: menú móvil, cabecera al desplazarse y tratamiento abierto.
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openService, setOpenService] = useState<ExpandableService | null>(null)
  // Indica si se está viendo la página "Quiénes somos".
  const [aboutOpen, setAboutOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("#inicio")

  // Hace aparecer con suavidad los elementos marcados con data-reveal al entrar en pantalla.
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [openService, aboutOpen])

  // Cierra el menú móvil con Escape y bloquea el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  // Resalta en el menú la sección que se está viendo.
  useEffect(() => {
    if (openService) {
      setActiveSection("#tratamientos")
      return
    }
    if (aboutOpen) {
      setActiveSection(ABOUT_HASH)
      return
    }
    const sections = NAV_LINKS.map((link) =>
      document.querySelector<HTMLElement>(link.href),
    ).filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [openService, aboutOpen])

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
      setAboutOpen(window.location.hash === ABOUT_HASH)
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
    setAboutOpen(false)
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  // Navega a una sección; si hay un detalle abierto, primero lo cierra y espera a que la sección exista.
  const goToSection = (event: React.MouseEvent, href: string) => {
    setMenuOpen(false)
    if (href === ABOUT_HASH) {
      event.preventDefault()
      openAboutPage()
      return
    }
    if (!openService && !aboutOpen) return
    event.preventDefault()
    window.history.pushState(null, "", href)
    setOpenService(null)
    setAboutOpen(false)
    // Salto directo (sin animación): al cambiar de vista, la página se vuelve a armar
    // y un scroll suave puede quedar corto mientras se reacomoda el contenido.
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "instant", block: "start" })
    }, 50)
  }

  // Abre la página "Quiénes somos" y la muestra desde el principio.
  const openAboutPage = () => {
    window.history.pushState(null, "", ABOUT_HASH)
    setOpenService(null)
    setAboutOpen(true)
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }))
  }

  // Vuelve de "Quiénes somos" al inicio de la página principal.
  const closeAboutPage = () => {
    window.history.pushState(null, "", "#inicio")
    setAboutOpen(false)
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }))
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
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      {/* Barra de navegación: logo, enlaces de escritorio y acceso al menú móvil. */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || openService || aboutOpen
            ? "bg-teal-deep/95 shadow-xl shadow-teal-deep/10 backdrop-blur-xl"
            : "bg-transparent"
        }`}
        aria-label="Navegación principal"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
          <a
            href="#inicio"
            aria-label="BLOOME, volver al inicio"
            onClick={(event) => goToSection(event, "#inicio")}
          >
            <Logo />
          </a>
          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => goToSection(event, link.href)}
                aria-current={activeSection === link.href ? "page" : undefined}
                className={`relative py-1 text-xs font-medium uppercase tracking-[0.14em] text-off-white transition-opacity hover:opacity-100 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-sage-light after:transition-transform ${
                  activeSection === link.href
                    ? "opacity-100 after:scale-x-100"
                    : "opacity-75 after:scale-x-0"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light min-h-9 px-4 text-[0.6875rem]"
            >
              Reservar Turno
            </a>
          </div>
          <button
            type="button"
            className="-mr-2 flex size-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
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
          <div id="menu-movil" className="flex max-h-[calc(100dvh-3.75rem)] flex-col gap-1 overflow-y-auto border-t border-white/10 bg-teal-deep/98 px-6 pb-7 pt-4 lg:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => goToSection(event, link.href)}
                aria-current={activeSection === link.href ? "page" : undefined}
                className={`border-b border-white/10 py-3.5 text-sm font-medium uppercase tracking-[0.15em] transition-[padding,color] duration-300 hover:pl-2 hover:text-sage-light ${
                  activeSection === link.href ? "text-sage-light" : "text-off-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="btn-light mt-4 min-h-12"
            >
              Reservar Turno
            </a>
          </div>
        )}
      </nav>

      {/* Decide entre la página institucional completa y el detalle de una categoría. */}
      {aboutOpen ? (
        <AboutPage onBack={closeAboutPage} onOpenCategory={openTreatmentCategory} />
      ) : !openService ? (
        <>
          {/* Portada principal con imagen, mensaje de marca y enlace al catálogo. */}
          <section
            id="inicio"
            className="relative flex min-h-screen items-center overflow-hidden bg-teal-deep"
          >
            <div className="absolute inset-0">
              <img
                src={heroImage}
                alt=""
                fetchPriority="high"
                className="hero-photo h-full w-full object-cover object-center md:object-[65%_center]"
              />
            </div>
            <div className="hero-protection-layer" aria-hidden="true" />
            <div className="botanical-shadow absolute -bottom-24 -left-16 hidden h-96 w-96 opacity-20 md:block" />
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-28 sm:pb-24 sm:pt-36">
              <div className="max-w-3xl py-7 sm:py-9">
                <p className="hero-in mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-sage-light sm:mb-5 sm:text-sm sm:tracking-[0.3em]" style={{ "--hero-delay": "150ms" } as React.CSSProperties}>
                  Centro de estética · San Luis
                </p>
                <h1 style={{ "--hero-delay": "300ms" } as React.CSSProperties} className="hero-in max-w-4xl font-serif text-[2.6rem] font-medium leading-[1.05] tracking-[-0.025em] text-off-white sm:text-5xl lg:text-[4rem]">
                  <span className="block">Tu mejor versión</span>
                  <span className="mt-1 block italic text-sage-light">
                    florece en <strong className="font-semibold">Bloome</strong>
                    .
                  </span>
                </h1>
                <p style={{ "--hero-delay": "480ms" } as React.CSSProperties} className="hero-in mt-5 max-w-lg text-lg font-normal leading-relaxed text-off-white/90 sm:mt-6 md:text-xl">
                  Tratamientos estéticos y corporales personalizados,
                  acompañados por profesionales.
                </p>
                <div style={{ "--hero-delay": "640ms" } as React.CSSProperties} className="hero-in mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
                  <a
                    href="#tratamientos"
                    className="btn-primary min-h-12 sm:px-7"
                  >
                    Conocé nuestros tratamientos <ArrowIcon />
                  </a>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-light min-h-12 sm:px-7"
                  >
                    Reservar turno
                  </a>
                </div>
              </div>
            </div>
            <a
              href="#nosotros"
              className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.75rem] uppercase tracking-[0.25em] text-off-white/50 md:flex"
            >
              Descubrir
              <span className="h-10 w-px bg-off-white/30" />
            </a>
          </section>

          {/* Presentación de la filosofía de BLOOME y sus pilares de atención. */}
          <div id="contenido" />
          <section id="nosotros" className="bg-[#f9fafa] px-6 py-16 md:py-24">
            <div className="mx-auto max-w-7xl">
              <div data-reveal className="grid gap-10 border-b border-teal-soft/15 pb-14 md:grid-cols-2 md:gap-16 md:pb-20">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-teal-soft sm:text-sm">
                    Quiénes somos
                  </p>
                  <h2 className="max-w-xl font-serif text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-teal-deep sm:text-4xl lg:text-5xl">
                    <span className="block">Un enfoque integral</span>
                    <em className="block font-normal text-teal-soft">
                      para tu bienestar
                    </em>
                  </h2>
                </div>
                <p className="self-end max-w-xl text-lg font-normal leading-8 text-ink-muted">
                  En Bloome creemos que el cuidado personal no debe sentirse
                  como una exigencia, sino como un momento para vos. Por eso,
                  como cada persona es diferente, buscamos conocer tus
                  necesidades y objetivos para ofrecerte tratamientos pensados
                  para vos.
                  <a
                    href={ABOUT_HASH}
                    onClick={(event) => goToSection(event, ABOUT_HASH)}
                    className="mt-6 flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-teal-soft link-underline"
                  >
                    Conocé más sobre nosotros <ArrowIcon />
                  </a>
                </p>
              </div>

              {/* Genera una tarjeta por cada pilar definido en los datos. */}
              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
                {/* Repite una tarjeta por cada pilar institucional. */}
                {PILLARS.map((pillar, index) => (
                  <article
                    key={pillar.title}
                    data-reveal
                    style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                    className="card-hover group relative overflow-hidden rounded-3xl border border-teal-soft/20 bg-white p-7 sm:p-8 lg:min-h-64"
                  >
                    <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-teal-soft transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                    <span className="font-serif text-sm italic text-teal-soft" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-serif text-2xl font-medium text-teal-deep">
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
            className="relative overflow-hidden bg-white px-6 py-20 md:py-24"
          >
            <div className="botanical-shadow absolute -right-28 top-0 h-96 w-96 opacity-10" />
            <div className="relative mx-auto max-w-7xl">
              <div data-reveal className="mx-auto mb-10 max-w-3xl text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-teal-soft sm:text-sm">
                  Cuidado a tu medida
                </p>
                <h2 className="section-title">Nuestros Tratamientos</h2>
                <p className="mt-4 text-lg leading-7 text-ink-muted">
                  Explorá nuestras propuestas y encontrá tu momento.
                </p>
              </div>
              {!openService ? (
                <div className="grid items-stretch gap-6 sm:grid-cols-2">
                  {/* Recorre las categorías en el orden en que deben mostrarse. */}
                  {CATEGORY_ORDER.map(
                    (categoryId, categoryIndex) => {
                      // Busca los datos completos de la categoría actual.
                      const category = TREATMENT_CATEGORIES.find(
                        ({ id }) => id === categoryId,
                      )!

                      return (
                        <article
                          key={category.title}
                          data-reveal
                          style={{ "--reveal-delay": `${(categoryIndex % 2) * 100}ms` } as React.CSSProperties}
                          className={`group relative flex flex-col overflow-hidden rounded-[24px] border border-teal-deep/10 bg-[#F9FAFA] card-hover ${
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
                            <FadeImage
                              src={category.img}
                              alt={category.alt}
                              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
                            />
                          </div>
                          <div
                            className={`flex flex-col p-6 md:p-7 ${
                              "flex-1"
                            }`}
                          >
                            <h3 className="font-serif text-2xl font-normal leading-tight md:text-[1.625rem] tracking-[-0.02em] text-teal-deep">
                              {category.title}
                            </h3>
                            <p className="mt-2 text-base leading-6 text-ink-muted">
                              {category.description}
                            </p>
                            {/* Muestra los servicios principales para escanear rápido cada categoría. */}
                            <ul className="mb-6 mt-5 flex flex-wrap gap-2" aria-label="Servicios destacados">
                              {category.services.map((service) => (
                                <li
                                  key={service}
                                  className="rounded-full bg-teal-soft/8 px-3 py-1 text-[0.8125rem] font-medium text-teal-deep"
                                >
                                  {service}
                                </li>
                              ))}
                            </ul>
                            <div
                              className={`flex items-center justify-between gap-4 border-t border-teal-deep/10 pt-5 ${
                                "mt-auto"
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  openTreatmentCategory(
                                    category.id as NavigableService,
                                  )
                                }}
                                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-teal-soft transition-colors after:absolute after:inset-0 after:rounded-[24px] after:content-[''] group-hover:text-teal-deep"
                                aria-label={`Ver tratamientos de ${category.title.toLowerCase()}`}
                              >
                                Ver tratamientos{" "}
                                <span className="transition-transform group-hover:translate-x-1">
                                  <ArrowIcon />
                                </span>
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
            className="relative overflow-hidden bg-[#edf1e8] px-6 py-20 md:py-24"
          >
            <div className="botanical-shadow absolute -right-24 -top-24 h-[32rem] w-[32rem] rotate-45 opacity-15" />
            <div className="absolute -bottom-48 -left-40 size-[30rem] rounded-full bg-teal-deep/10 blur-3xl" />
            <div className="relative mx-auto max-w-7xl">
              <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                <div data-reveal>
                  <p className="section-label">Experiencias BLOOME</p>
                  <h2 className="section-title">Imperdibles</h2>
                  <p className="mt-5 max-w-lg text-lg leading-7 text-ink-muted">
                    Propuestas pensadas para que puedas disfrutar de nuestros
                    tratamientos y experiencias de cuidado.
                  </p>
                  <div className="mt-10 h-px w-24 bg-teal-soft/40" />
                  <p className="mt-6 max-w-sm text-[1rem] leading-6 text-ink-muted">
                    Consultá disponibilidad, valores y vigencia al momento de
                    reservar.
                  </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Convierte cada promoción en una tarjeta visual. */}
                  {PROMOTIONS.map((promo, index) => (
                    <article
                      key={promo.title}
                      data-reveal
                      style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                      className={`promo-card group relative flex flex-col rounded-3xl border border-t-4 bg-[#F9FAFA] p-7 card-hover hover:bg-white ${
                        index === 0 || index === 3
                          ? "border-teal-soft"
                          : "border-orange"
                      }`}
                    >
                      <h3 className="font-serif text-[1.375rem] font-semibold text-teal-deep">
                        {promo.title}
                      </h3>
                      <p className="mt-3 text-[1rem] font-medium leading-6 text-sage-deep">
                        {promo.included}
                      </p>
                      <p className="mt-4 border-t border-sage-deep/10 pt-4 text-[0.9375rem] leading-6 text-ink-muted">
                        {promo.benefit}
                      </p>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Hola BLOOME, quisiera consultar por la promo "${promo.title}".`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-teal-soft after:absolute after:inset-0 after:rounded-3xl after:content-[''] group-hover:text-teal-deep"
                        aria-label={`Consultar por la promo ${promo.title} en WhatsApp`}
                      >
                        Consultar esta promo <ArrowIcon />
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Datos de contacto, perfiles sociales y mapa de ubicación. */}
          <section id="contacto" className="bg-[#f9fafa] px-6 py-20 md:py-24">
            <div className="mx-auto max-w-7xl">
              <div data-reveal className="mb-16 text-center">
                <p className="section-label">Encontranos</p>
                <h2 className="section-title">
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
                      href: undefined,
                      action: undefined,
                    },
                    {
                      icon: "phone" as const,
                      label: "Teléfono / WhatsApp",
                      value: "2664 884080",
                      href: BOOKING_URL,
                      action: "Escribir por WhatsApp",
                    },
                    {
                      icon: "clock" as const,
                      label: "Horarios",
                      value: "Lunes a viernes, de 9:00 a 21:00",
                      href: undefined,
                      action: undefined,
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-5">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-teal-soft/10 text-teal-soft">
                        <ContactIcon type={item.icon} />
                      </div>
                      <div>
                        <p className="mb-1 text-[0.875rem] font-semibold uppercase tracking-[0.16em] text-teal-soft">
                          {item.label}
                        </p>
                        <p className="text-base text-teal-deep">{item.value}</p>
                        {item.href && (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-teal-soft hover:text-teal-deep"
                          >
                            {item.action} <ArrowIcon />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="pt-3">
                    <p className="mb-4 text-[0.875rem] font-semibold uppercase tracking-[0.16em] text-teal-soft">
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
                          className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-teal-deep px-4 text-sm font-semibold text-off-white transition-[background-color,translate] duration-300 hover:-translate-y-0.5 hover:bg-teal-soft active:translate-y-0"
                          aria-label={`${social.label} de BLOOME (se abre en otra pestaña)`}
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Mapa de Google (se carga al llegar a la sección) con una tarjeta de ubicación encima. */}
                <div data-reveal className="relative min-h-[26rem] overflow-hidden rounded-3xl border border-teal-soft/15 bg-sage-cream shadow-xl shadow-teal-deep/5">
                  <iframe
                    title="Mapa de ubicación de BLOOME"
                    src="https://www.google.com/maps?q=Centro+de+Est%C3%A9tica+BLOOME,+Rep%C3%BAblica+del+L%C3%ADbano+163,+San+Luis&z=16&output=embed"
                    className="absolute inset-0 h-full w-full border-0 saturate-[0.85]"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute inset-x-4 bottom-4 flex flex-col gap-4 rounded-2xl bg-off-white/95 p-5 shadow-lg backdrop-blur-md sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-md sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <p className="font-serif text-xl font-medium text-teal-deep">BLOOME</p>
                      <p className="text-sm leading-5 text-ink-muted">República del Líbano 163, San Luis</p>
                    </div>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Rep%C3%BAblica%20del%20L%C3%ADbano%20163%2C%20San%20Luis"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary min-h-11 shrink-0 px-5"
                    >
                      Cómo llegar <ArrowIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <main id="contenido" className="bg-white px-6 pb-20 pt-24 md:pb-28 md:pt-28">
          <div className="mx-auto max-w-7xl">
            <ServiceDetails
              category={openService}
              onBack={closeTreatmentCategory}
              onOpenCategory={openTreatmentCategory}
            />
          </div>
        </main>
      )}

      {/* Pie de página con marca, accesos rápidos y enlaces legales. */}
      <footer className="bg-teal-deep px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-12 md:grid-cols-3">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-[0.9375rem] leading-6 text-off-white/75">
                Centro de estética en San Luis. Tu espacio de cuidado, bienestar
                y autenticidad.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light mt-6 min-h-11 px-5"
              >
                Reservar turno <ArrowIcon />
              </a>
              <div className="mt-5 flex gap-4 text-sm text-off-white/80">
                <a href="https://instagram.com/bloome.sl" target="_blank" rel="noopener noreferrer" className="py-2 transition-colors hover:text-off-white">Instagram</a>
                <a href="https://facebook.com/bloomesl" target="_blank" rel="noopener noreferrer" className="py-2 transition-colors hover:text-off-white">Facebook</a>
                <a href="https://www.tiktok.com/@bloome.sl" target="_blank" rel="noopener noreferrer" className="py-2 transition-colors hover:text-off-white">TikTok</a>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sage-light">
                Explorar
              </p>
              <div>
                {NAV_LINKS.filter((link) => link.href !== "#inicio").map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => goToSection(event, link.href)}
                    className="block w-fit py-1.5 text-[0.9375rem] text-off-white/80 transition-colors hover:text-off-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sage-light">
                Tratamientos
              </p>
              <div>
                {/* Enlaces rápidos a categorías al final de la página. */}
                {CATEGORY_ORDER.map((id) =>
                  TREATMENT_CATEGORIES.find((category) => category.id === id)!,
                ).map((category) => (
                  <a
                    key={category.title}
                    href={SERVICE_HASHES[category.id as NavigableService]}
                    onClick={(event) => {
                      event.preventDefault()
                      openTreatmentCategory(category.id as NavigableService)
                    }}
                    className="block w-fit py-1.5 text-[0.9375rem] text-off-white/80 transition-colors hover:text-off-white"
                  >
                    {category.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-off-white/20 pt-8 text-xs text-off-white/65 md:flex-row">
            <p className="text-sm">
              © 2026 BLOOME – Centro de estética. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-5 text-sm">
              <span>República del Líbano 163 · San Luis</span>
              <a href="/privacidad.html" className="py-2 underline-offset-4 hover:text-off-white hover:underline">
                Privacidad
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Acceso flotante a reservas por WhatsApp, visible en todas las secciones. */}
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-4 right-4 z-50 flex size-12 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-whatsapp/30 transition-[scale,box-shadow] duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 sm:bottom-6 sm:right-6 sm:size-14"
        aria-label="Reservar por WhatsApp"
      >
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-teal-deep px-4 py-2 text-xs font-semibold text-off-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
          ¿Reservamos tu turno?
        </span>
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
