/** Fuente central de datos del sitio: textos, categorías, promociones, enlaces e imágenes de tratamientos. */

// Datos, textos e imágenes de las secciones públicas del sitio.

// Imágenes principales que ilustran cada categoría en la página de tratamientos.
import tratamientoCejas from "../assets/tratamiento-main/tratamiento-cejas.png"
import tratamientoCorporal from "../assets/tratamiento-main/tratamiento-corporal.png"
import tratamientoDepilacion from "../assets/tratamiento-main/tratamiento-depilacion.png"
import tratamientoUnas from "../assets/tratamiento-main/tratamiento-uñas.png"
import tratamientoFacial from "../assets/tratamiento-main/tratamiento-facial.png"

// Fotografías individuales utilizadas en las fichas detalladas de cada tratamiento.
import cejasDiseño from "../assets/detalle-tratamiento/cejas-diseño.png"
import cejasLaminado from "../assets/detalle-tratamiento/cejas-laminado.png"
import cejasLifting from "../assets/detalle-tratamiento/cejas-lifting.png"
import corporalAlpha from "../assets/detalle-tratamiento/corporal-alpha.png"
import corporalBioRoll from "../assets/detalle-tratamiento/corporal-bioroll.png"
import corporalElectro from "../assets/detalle-tratamiento/corporal-electro.png"
import corporalKine from "../assets/detalle-tratamiento/corporal-kine.png"
import corporalMioUp from "../assets/detalle-tratamiento/corporal-mioup.png"
import depilacionCrystal from "../assets/detalle-tratamiento/depilacion-crystal.png"
import facialAlpha from "../assets/detalle-tratamiento/facial-alpha.png"
import facialDerma from "../assets/detalle-tratamiento/facial-derma.png"
import facialElectro from "../assets/detalle-tratamiento/facial-electro.png"
import facialFraxface from "../assets/detalle-tratamiento/facial-fraxface.png"
import facialHigiene from "../assets/detalle-tratamiento/facial-higiene.png"
import facialMicro from "../assets/detalle-tratamiento/facial-micro.png"
import facialPeeling from "../assets/detalle-tratamiento/facial-peeling.png"
import unasKapping from "../assets/detalle-tratamiento/uñas-kapping.png"
import unasPies from "../assets/detalle-tratamiento/uñas-pies.png"
import unasSemi from "../assets/detalle-tratamiento/uñas-semi.png"
import unasSoft from "../assets/detalle-tratamiento/uñas-soft.png"



// CONSTANTES DE CADA IMAGEN PARA USARLAS EN EL CODIGO

// Imágenes principales que ilustran las categorías en el catálogo.
export const facialCategoryImage = tratamientoFacial
export const bodyCategoryImage = tratamientoCorporal
export const browsCategoryImage = tratamientoCejas
export const laserCategoryImage = tratamientoDepilacion
export const nailsCategoryImage = tratamientoUnas

// Alias de imágenes individuales para referenciarlas dentro de las fichas.
export const higieneFacialTreatment = facialHigiene
export const higieneFacialPeelingTreatment = facialPeeling
export const higieneFacialElectroporacionTreatment = facialElectro
export const higieneFacialMicroneedlingTreatment = facialMicro
export const higieneFacialFraxfaceTreatment = facialFraxface
export const higieneFacialDermaplaningTreatment = facialDerma
export const higieneFacialAlphaSinergyTreatment = facialAlpha

export const alphaSinergyTreatment = corporalAlpha
export const mioUpTreatment = corporalMioUp
export const bioRollTreatment = corporalBioRoll
export const electroporaciNTreatment = corporalElectro
export const kinesiologAYFisioterapiaTreatment = corporalKine

export const diseOYPerfiladoTreatment = cejasDiseño
export const laminadoDeCejasTreatment = cejasLaminado
export const liftingDePestaAsTreatment = cejasLifting

export const bodyHealthCrystal3dPlusTreatment = depilacionCrystal

export const semipermanenteTreatment = unasSemi
export const kappingGelTreatment = unasKapping
export const softGelTreatment = unasSoft
export const bellezaDePiesTreatment = unasPies

// Número de WhatsApp en formato internacional, sin espacios ni signos.
export const WHATSAPP_NUMBER = "5492664884080"
// Enlace general de reserva con un mensaje inicial predefinido.
export const BOOKING_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20BLOOME%2C%20quisiera%20coordinar%20un%20turno.`

// Texto y destino de cada enlace del menú principal.
export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Tratamientos", href: "#tratamientos" },
  { label: "Imperdibles", href: "#imperdibles" },
  { label: "Contacto", href: "#contacto" },
]

// Datos de las tarjetas del catálogo: nombre, imagen, descripción y servicios destacados.
export const TREATMENT_CATEGORIES = [
  {
    id: "facials",
    category: "Cuidado facial",
    title: "Tratamientos Faciales",
    img: facialCategoryImage,
    alt: "Aplicación de tratamiento facial con equipo de radiofrecuencia.",
    description:
      "Devolvéle a tu piel su salud y luminosidad, con tratamientos que realzan tu vitalidad.",
    services: ["Higiene facial", "Peeling", "Microneedling", "Fraxface"],
  },
  {
    id: "body",
    category: "Bienestar corporal",
    title: "Tratamientos Corporales",
    img: bodyCategoryImage,
    alt: "Tratamiento corporal reafirmante en la espalda de una paciente.",
    description:
      "Modelá tu silueta y reconectá con tu cuerpo a través de un cuidado integral.",
    services: ["Alpha Sinergy", "Mio Up", "Bio Roll", "Electroporación"],
  },
  {
    id: "brows",
    category: "Belleza de la mirada",
    title: "Cejas y Pestañas",
    img: browsCategoryImage,
    alt: "Perfilado de cejas con pinzas de precisión.",
    description:
      "Realzá tu mirada y expresá tu estilo con un diseño pensado para vos.",
    services: [
      "Diseño y perfilado",
      "Laminado de cejas",
      "Lifting de pestañas",
    ],
  },
  {
    id: "laser",
    category: "Tecnología profesional",
    title: "Depilación Definitiva",
    img: laserCategoryImage,
    alt: "Tratamiento de depilación definitiva sobre el brazo.",
    description:
      "Decile adiós al vello y disfrutá de una piel suave y cuidada durante todo el año.",
    services: ["Alexandrita", "Diodo", "ND YAG", "Tecnología CRIO"],
  },
  {
    id: "nails",
    category: "Cuidado complementario",
    title: "Uñas",
    img: nailsCategoryImage,
    alt: "Aplicación de esmalte semipermanente en gel.",
    description:
      "El detalle final que completa tu estilo, con cuidado y diseño en cada visita.",
    services: ["Semipermanente", "Kapping gel", "Soft gel", "Belleza de pies"],
  },
]

// Tipo de datos de una ficha; incluye descripción y campos informativos opcionales.
export type Treatment = {
  title: string
  description: string[]
  includes?: string[]
  images?: TreatmentImage[]
  duration?: string
  recovery?: string
  results?: string
  frequency?: string
}

// Tipo de imagen de tratamiento: archivo de imagen y texto alternativo accesible.
export type TreatmentImage = {
  src: string
  alt: string
}

// Colección de fichas detalladas de tratamientos faciales.
export const FACIAL_TREATMENTS: Treatment[]  = [
  // Ficha de datos para el tratamiento “HIGIENE FACIAL”.
  {
    title: "HIGIENE FACIAL",
    description: [
      "La limpieza facial con extracción remueve impurezas, puntos negros y células muertas, dejando la piel limpia, oxigenada y lista para recibir activos.",
    ],
    includes: [
      "Preparación de piel",
      "Exfoliación",
      "Máscara",
      "Microdermoabrasión con activos específicos (ALQUIMIA)",
      "Extracciones",
      "Descongestión",
      "Terapia LED",
      "FPS",
    ],
    images: [{ src: higieneFacialTreatment, alt: "Limpieza facial profunda con equipo de punta metálica." }],
    duration: "90 minutos",
    recovery: "Sin reposo",
    results: "Inmediatos",
    frequency: "Mensual",
  },
  // Ficha de datos para el tratamiento “HIGIENE FACIAL + PEELING”.
  {
    title: "HIGIENE FACIAL + PEELING",
    description: [
      "Suma ácidos específicos para tratar manchas, poros dilatados, arrugas, cicatrices, acné y puntos negros.",
    ],
    includes: [
      "Higiene profunda completa",
      "Colocación de ácidos según la necesidad del paciente",
      "Máscara",
      "Descongestión",
      "Terapia LED",
      "FPS",
    ],
    images: [{ src: higieneFacialPeelingTreatment, alt: "Aplicación de ácidos con pincel durante un peeling facial." }],
    duration: "90 minutos",
    recovery: "Mínima",
    results: "Inmediatos",
    frequency: "Dependiendo del paciente, cada 7, 14 o 21 días",
  },
  // Ficha de datos para el tratamiento “HIGIENE FACIAL + ELECTROPORACIÓN”.
  {
    title: "HIGIENE FACIAL + ELECTROPORACIÓN",
    description: [
      "Incorporación de activos en capas profundas: mesoterapia virtual, sin agujas.",
    ],
    includes: [
      "Higiene profunda completa",
      "Shock de activos",
      "Electroporación",
      "Máscaras",
      "FPS",
    ],
    images: [{ src: higieneFacialElectroporacionTreatment, alt: "Tratamiento de electroporación con rodillo en el rostro." }],
    duration: "90 minutos",
    recovery: "Sin reposo",
    results: "Inmediatos",
    frequency: "Dependiendo del paciente, cada 7 o 14 días",
  },
  // Ficha de datos para el tratamiento “HIGIENE FACIAL + MICRONEEDLING + HIDRA LIPS”.
  {
    title: "HIGIENE FACIAL + MICRONEEDLING + HIDRA LIPS",
    description: [
      "Los microcanales creados por las microagujas permiten que principios activos como ácido hialurónico y vitamina C penetren en las capas más profundas de la piel.",
    ],
    includes: [
      "Higiene profunda completa",
      "Microneedling con activos específicos según el paciente",
      "Máscaras",
      "Terapia LED",
      "FPS",
      "Hidratación de labios con ácido hialurónico",
    ],
    images: [{ src: higieneFacialMicroneedlingTreatment, alt: "Aplicación de microneedling con dispositivo electrónico en el rostro." }],
    duration: "90 minutos",
    recovery: "Mínima",
    results: "Inmediatos y progresivos",
    frequency: "Dependiendo del paciente, cada 14 o 21 días",
  },
  // Ficha de datos para el tratamiento “HIGIENE FACIAL + FRAXFACE”.
  {
    title: "HIGIENE FACIAL + FRAXFACE",
    description: [
      "Tecnología de radiofrecuencia fraccionada que sirve para estimular la producción de colágeno y elastina en profundidad, de rostro y cuello, mejorando la calidad y la textura de la piel sin necesidad de cirugía.",
    ],
    includes: [
      "Higiene profunda completa",
      "Fraxface",
      "Descongestión",
      "Terapia LED",
      "FPS",
    ],
    images: [{ src: higieneFacialFraxfaceTreatment, alt: "Tratamiento facial con equipo de radiofrecuencia Fraxface." }],
    duration: "90 minutos",
    recovery: "Mínimo",
    results: "Inmediatos y progresivos",
    frequency: "Dependiendo del paciente, cada 21 a 30 días",
  },
  // Ficha de datos para el tratamiento “HIGIENE FACIAL + DERMAPLANING”.
  {
    title: "HIGIENE FACIAL + DERMAPLANING",
    description: [
      "Procedimiento no invasivo de exfoliación física que utiliza un bisturí estéril para eliminar suavemente células muertas y vello facial.",
    ],
    includes: [
      "Preparación de piel",
      "Extracciones",
      "Técnica dermaplaning",
      "Descongestión",
      "Terapia LED",
      "FPS",
    ],
    images: [{ src: higieneFacialDermaplaningTreatment, alt: "Exfoliación facial con bisturí estéril (dermaplaning)." }],
    duration: "90 minutos",
    recovery: "Sin reposo",
    results: "Inmediatos",
    frequency: "Mensual",
  },
  // Ficha de datos para el tratamiento “HIGIENE FACIAL + ALPHA SINERGY”.
  {
    title: "HIGIENE FACIAL + ALPHA SINERGY",
    description: [
      "Tratamiento no invasivo que combina radiofrecuencia multipolar y vacum-dermo-movilización para rejuvenecer, tensar y mejorar la calidad de la piel del rostro y cuello.",
    ],
    includes: [
      "Higiene profunda completa",
      "Alpha Sinergy",
      "Descongestión",
      "Terapia LED",
      "FPS",
    ],
    images: [{ src: higieneFacialAlphaSinergyTreatment, alt: "Tratamiento facial con equipo de radiofrecuencia y vacum." }],
    duration: "90 minutos",
    recovery: "Mínimo",
    results: "Inmediatos y progresivos",
    frequency: "Dependiendo del paciente, cada 14 a 21 días",
  },
]

// Colección de fichas detalladas de tratamientos corporales y kinesiología.
export const BODY_TREATMENTS: Treatment[]  = [
  // Ficha de datos para el tratamiento “ALPHA SINERGY”.
  {
    title: "ALPHA SINERGY",
    description: [
      "Tratamiento corporal no invasivo que combina dermo-movilización, vacumterapia y radiofrecuencia multipolar en una misma sesión.",
      "Trata la celulitis en todos sus estadios, estimula los fibroblastos para producir colágeno y elastina, elimina flacidez, ayuda a reducir la circunferencia corporal y modela abdomen, flancos, glúteos, piernas, brazos y zona del corpiño.",
    ],
    includes: [
      "Uso de aparatología en las zonas elegidas",
      "Drenaje manual de la zona",
    ],
    images: [{ src: alphaSinergyTreatment, alt: "Aplicación de tratamiento corporal con cabezal de radiofrecuencia." }],
    duration: "60 minutos",
    recovery: "Sin reposo",
    results: "Inmediatos y progresivos",
    frequency: "Semanal",
  },
  // Ficha de datos para el tratamiento “MIO UP”.
  {
    title: "MIO UP",
    description: [
      "Tratamiento corporal no invasivo que trabaja con pulsos magnéticos focalizados de alta intensidad y radiofrecuencia, utilizado para generar contracciones musculares rítmicas a alta intensidad en períodos cortos de tiempo.",
      "Genera 30.000 contracciones en 30 minutos.",
    ],
    includes: ["Uso de aparatología en las zonas elegidas"],
    images: [{ src: mioUpTreatment, alt: "Tratamiento corporal con equipo de pulsos magnéticos en gluteos" }],
    duration: "30 minutos por zona elegida",
    recovery: "Sin reposo",
    results: "Inmediatos y progresivos",
    frequency: "Semanal",
  },
  // Ficha de datos para el tratamiento “BIO ROLL”.
  {
    title: "BIO ROLL",
    description: [
      "Tratamiento corporal no invasivo con dos cabezales de rodillos que ejercen vibración y presión sobre el tejido.",
      "La tecnología genera un efecto de drenaje linfático y brinda una experiencia agradable y relajante.",
    ],
    includes: ["Uso de aparatología en las zonas elegidas"],
    images: [{ src: bioRollTreatment, alt: "Rodillos del equipo Bio Roll para drenaje linfático corporal." }],
    duration: "30 minutos por zona elegida",
    recovery: "Sin reposo",
    results: "Inmediato",
    frequency: "Semanal",
  },
  // Ficha de datos para el tratamiento “ELECTROPORACIÓN”.
  {
    title: "ELECTROPORACIÓN",
    description: [
      "Mesoterapia virtual no invasiva que utiliza ondas electromagnéticas para abrir microcanales temporales y permitir que los principios activos penetren profundamente sin agujas.",
    ],
    includes: [
      "Uso de aparatología en las zonas elegidas",
      "Activos específicos según el paciente para celulitis, adiposidad o estrías",
    ],
    images: [{ src: electroporaciNTreatment, alt: "Aplicación de electroporación corporal con electrodo en el abdomen." }],
    duration: "60 minutos por zona elegida",
    recovery: "Sin reposo",
    results: "Progresivos",
    frequency: "Dependiendo del paciente, cada 7 o 14 días",
  },
  // Ficha de datos para el tratamiento “KINESIOLOGÍA Y FISIOTERAPIA”.
  {
    title: "KINESIOLOGÍA Y FISIOTERAPIA",
    description: [
      "Técnicas manuales adaptadas a la necesidad de cada paciente según el criterio y acompañamiento de la Licenciada.",
    ],
    includes: [
      "Masaje",
      "Drenaje",
      "Punción seca",
      "Ventosas",
      "Otras técnicas según evaluación",
    ],
    images: [{ src: kinesiologAYFisioterapiaTreatment, alt: "Masaje fisioterapéutico manual en la zona del cuello y hombros." }],
    duration: "60 minutos",
    recovery: "Sin reposo",
    results: "Inmediatos y progresivos",
    frequency: "Dependiendo del paciente, cada 10 a 20 días",
  },
]

// Colección de fichas de cejas y pestañas.
export const BROW_TREATMENTS: Treatment[]  = [
  // Ficha de datos para el tratamiento “DISEÑO Y PERFILADO”.
  {
    title: "DISEÑO Y PERFILADO",
    description: [
      "Procedimiento estético personalizado que busca darle a la ceja la forma ideal según la estructura del rostro, los ojos y la nariz, respetando su línea natural para potenciar la mirada.",
    ],
    includes: ["Diseño personalizado", "Depilación con pinzas"],
    images: [{ src: diseOYPerfiladoTreatment, alt: "Diseño y perfilado de cejas con efecto laminado." }],
    duration: "30, 60 y 90 minutos dependiendo del tratamiento a realizar",
    recovery: "Sin reposo",
    results: "Inmediatos",
    frequency: "Dependiendo del tratamiento, cada 21 a 30 días",
  },
  // Ficha de datos para el tratamiento “LAMINADO DE CEJAS”.
  {
    title: "LAMINADO DE CEJAS",
    description: [
      "Tratamiento semipermanente que alisa, peina y fija los vellos de las cejas hacia arriba o en una dirección uniforme.",
    ],
    includes: ["Nutrición", "Hidratación", "Tinte a elección"],
    images: [{ src: laminadoDeCejasTreatment, alt: "AAplicación de producto para laminado de cejas con cepillo." }],
    duration: "30, 60 y 90 minutos dependiendo del tratamiento a realizar",
    recovery: "Sin reposo",
    results: "Inmediatos",
    frequency: "Dependiendo del tratamiento, cada 21 a 30 días",
  },
  // Ficha de datos para el tratamiento “LIFTING DE PESTAÑAS”.
  {
    title: "LIFTING DE PESTAÑAS",
    description: [
      "Tratamiento que eleva y curva las pestañas naturales desde la raíz para lograr una mirada más abierta y definida sin usar extensiones.",
    ],
    includes: ["Nutrición", "Hidratación", "Tinte a elección"],
    images: [{ src: liftingDePestaAsTreatment, alt: "Aplicación de lifting de pestañas con pincel." }],
    duration: "30, 60 y 90 minutos dependiendo del tratamiento a realizar",
    recovery: "Sin reposo",
    results: "Inmediatos",
    frequency: "Dependiendo del tratamiento, cada 21 a 30 días",
  },
]

// Colección de fichas de depilación definitiva.
export const LASER_TREATMENTS: Treatment[]  = [
  // Ficha de datos para el tratamiento “BODY HEALTH: CRYSTAL 3D PLUS”.
  {
    title: "BODY HEALTH: CRYSTAL 3D PLUS",
    description: [
      "Combina tres longitudes: ALEXANDRITA + DIODO + ND YAG, apto para todos los tipos de piel y vello. Su cabezal con tecnología CRIO permite realizar el tratamiento con cero dolor.",
      "El tratamiento varía dependiendo de cada paciente y las zonas a tratar, pero se puede estimar un máximo de entre 8 a 10 sesiones.",
    ],
    includes: ["Alexandrita", "Diodo", "ND YAG", "Cabezal con tecnología CRIO"],
    images: [{ src: bodyHealthCrystal3dPlusTreatment, alt: "Sesión de depilación láser en axilas con equipo Crystal 3D Plus." }],
    duration: "Dependiendo de la zona elegida",
    recovery: "Sin reposo",
    results: "Progresivos",
    frequency: "Dependiendo del paciente, cada 45 a 60 días",
  },
]

// Colección de fichas de uñas y belleza de pies.
export const NAIL_TREATMENTS: Treatment[]  = [
  // Ficha de datos para el tratamiento “SEMIPERMANENTE”.
  {
    title: "SEMIPERMANENTE",
    description: ["Incluye manicuría rusa o combinada y esmaltado."],
    images: [{ src: semipermanenteTreatment, alt: "Manicura con esmalte semipermanente en tono nude." }],
    duration: "60 o 90 minutos, dependiendo del tratamiento a realizar",
    frequency: "Según el tratamiento elegido",
  },
  // Ficha de datos para el tratamiento “KAPPING GEL”.
  {
    title: "KAPPING GEL",
    description: [
      "Incluye baño de gel en uña natural, manicuría rusa o combinada y esmaltado.",
    ],
    images: [{ src: kappingGelTreatment, alt: "Uñas con baño de kapping gel y acabado natural." }],
    duration: "60 o 90 minutos, dependiendo del tratamiento a realizar",
    frequency: "Según el tratamiento elegido",
  },
  // Ficha de datos para el tratamiento “SOFT GEL”.
  {
    title: "SOFT GEL",
    description: ["Incluye manicuría combinada y esmaltado."],
    images: [{ src: softGelTreatment, alt: "Uñas esculpidas con sistema soft gel en tono rosado." }],
    duration: "60 o 90 minutos, dependiendo del tratamiento a realizar",
    frequency: "Según el tratamiento elegido",
  },
  // Ficha de datos para el tratamiento “BELLEZA DE PIES”.
  {
    title: "BELLEZA DE PIES",
    description: [
      "Se tratan durezas y talón agrietado; se cortan cutículas y uñas, más esmaltado.",
    ],
    images: [{ src: bellezaDePiesTreatment, alt: "Pedicura profesional con corte de cutículas y esmaltado." }],
    duration: "60 o 90 minutos, dependiendo del tratamiento a realizar",
    frequency: "Según el tratamiento elegido",
  },
]

// Pilares institucionales que se muestran en la sección “Nosotros”.
export const PILLARS = [
  {
    title: "Personalización",
    desc: "Equilibrio entre bienestar, cuidado y belleza natural.",
  },
  {
    title: "Bienestar",
    desc: "Una experiencia pensada para reconectar con tu mejor versión.",
  },
  {
    title: "Profesionalismo",
    desc: "Técnicas y servicios que evolucionan para cuidarte mejor.",
  },
  {
    title: "Innovación",
    desc: "Tratamientos personalizados que respetan tu singularidad.",
  },
]

// Promociones que aparecen en la sección “Imperdibles”.
export const PROMOTIONS = [
  {
    title: "Pack Facial Completo",
    included: "Limpieza facial + hidratación",
    benefit: "Una experiencia integral de cuidado facial.",
  },
  {
    title: "Dúo Corporal",
    included: "Tratamiento corporal + drenaje linfático",
    benefit: "Bienestar y cuidado corporal en una misma propuesta.",
  },
  {
    title: "Beauty Day",
    included: "Tratamientos combinados a elección",
    benefit: "Un momento de cuidado pensado para vos.",
  },
  {
    title: "Voucher Regalo",
    included: "Experiencia personalizable",
    benefit: "Regalá bienestar con una propuesta a medida.",
  },
]

