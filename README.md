# BLOOME — Centro de estética

Sitio web desarrollado con React, TypeScript, Vite y Tailwind CSS 4. El código está organizado en componentes y archivos de datos para facilitar su mantenimiento y futuras modificaciones.

## Requisitos

- Node.js 20.19+ o 22.12+ (recomendado: Node.js 22 LTS).
- Visual Studio Code.
- Conexión a internet para instalar las dependencias (las fuentes se alojan en el propio sitio).

## Ejecutar en Visual Studio Code

1. Extraé el ZIP en una carpeta fácil de encontrar, por ejemplo `C:\Proyectos\bloome\`.
2. Abrí Visual Studio Code.
3. Elegí **Archivo → Abrir carpeta…** y seleccioná la carpeta `bloome`, que contiene `package.json`.
4. Abrí **Terminal → Nueva terminal**.
5. Instalá las dependencias:

   ```bash
   npm install
   ```

6. Cuando termine la instalación, iniciá el servidor de desarrollo:

   ```bash
   npm run dev
   ```

7. Abrí en el navegador la dirección que muestre la terminal. Por defecto, Vite utiliza `http://localhost:5173/`.
8. Para detener el servidor, volvé a la terminal y presioná `Ctrl + C`.

## Comprobar el proyecto

Los siguientes comandos permiten verificar el código y probar la versión de producción:

- `npm run typecheck`: verifica los tipos de TypeScript, si el script está definido en `package.json`.
- `npm run build`: ejecuta la compilación de producción y genera los archivos finales en `dist/`.
- `npm run preview`: permite visualizar localmente la versión compilada. Primero hay que ejecutar `npm run build`.

## Estructura principal

bloome/
├── public/
│   └── logo.png                 # Ícono de la pestaña del navegador
│
├── src/
│   ├── assets/                     # Fotografías, logotipos y recursos visuales
│   │
│   ├── components/
│   │   ├── PublicSite.tsx          # Página principal y organización de las secciones
│   │   └── TreatmentComponents.tsx # Componentes reutilizables de tratamientos y elementos visuales
│   │
│   ├── data/
│   │   └── treatments.ts           # Datos, descripciones, categorías e imágenes de tratamientos
│   │
│   ├── App.tsx                     # Componente raíz de la aplicación
│   ├── main.tsx                    # Punto de entrada de React
│   ├── index.css                   # Estilos globales, tema y animaciones
│   └── vite-env.d.ts               # Tipos de entorno de Vite
│
├── index.html                      # Documento HTML, título y metadatos
├── package.json                    # Scripts y dependencias
├── package-lock.json               # Versiones exactas de las dependencias
├── tsconfig.json                   # Configuración de TypeScript
├── vite.config.ts                  # Configuración de Vite
├── .gitignore                      # Archivos excluidos de Git
└── README.md                       # Documentación del proyecto


## Funcionalidades incluidas

- Navegación de escritorio y menú adaptable a pantallas pequeñas.
- Secciones de inicio, presentación, tratamientos, promociones y contacto.
- Vista detallada por categoría de tratamiento con navegación mediante hash.
- Enlaces para reservar por WhatsApp con un mensaje inicial.
- Ubicación incrustada de Google Maps.
- Diseño adaptable a diferentes tamaños de pantalla.
- Animaciones y respeto por la preferencia del usuario de reducir el movimiento.
- Componentes reutilizables para evitar repetir código.
- Datos de tratamientos separados de los componentes visuales.

## Organización del código

El proyecto está dividido en archivos con responsabilidades específicas para facilitar su lectura, mantenimiento y ampliación.

### Componentes principales

- `src/components/PublicSite.tsx`: organiza la página pública de BLOOME, sus secciones, navegación, estados e interacciones generales.
- `src/components/TreatmentComponents.tsx`: contiene componentes reutilizables para presentar tratamientos y otros elementos visuales.
- `src/App.tsx`: componente raíz que conecta la aplicación con la página principal.
- `src/main.tsx`: inicializa React y carga los estilos globales.

### Datos de tratamientos

- `src/data/treatments.ts`: centraliza la información de los tratamientos, como nombres, descripciones, categorías, enlaces e imágenes. De esta manera, se puede modificar la información sin tener que buscarla entre todo el código de la interfaz.

### Estilos y recursos visuales

- `src/index.css`: define los estilos globales, el tema visual, las animaciones y las reglas de diseño adaptable.
- `src/assets/`: contiene las fotografías, logotipos y otros recursos visuales utilizados por la aplicación.
- `public/favicon.png`: contiene el ícono que aparece junto al título de la página en la pestaña del navegador. El nombre y la extensión deben coincidir con la referencia definida en `index.html`.

## Antes de publicar

### 1. Fotografías de los tratamientos

Verificá que cada tratamiento tenga asociada la imagen correcta en `src/data/treatments.ts` o en el archivo donde se encuentren definidas sus imágenes.

Si todavía hay imágenes provisionales, agregá las fotografías correspondientes a `src/assets/` y actualizá las referencias en los datos de los tratamientos. Comprobá que las rutas y los nombres de archivo coincidan exactamente, incluyendo mayúsculas y minúsculas.

### 2. Datos de contacto

Verificá el teléfono de WhatsApp, la dirección, los horarios de atención y los enlaces de redes sociales antes de publicar la web. Según cómo esté organizado el dato, puede encontrarse en `src/data/treatments.ts` o en `src/components/PublicSite.tsx`.

### 3. Google Fonts

Las fuentes Playfair Display y Raleway se cargan desde Google Fonts. Si no hay conexión a internet, se utilizarán las fuentes de respaldo definidas en los estilos.

### 4. Reservas

El sitio abre WhatsApp con un mensaje inicial para facilitar las consultas y reservas. No incluye un sistema de turnos con calendario, base de datos ni panel de administración de reservas.

### 5. Favicon

El favicon se configura en `index.html`. Si utilizás `public/logo.png`, la referencia correspondiente es:

```html
<link rel="icon" type="image/png" href="/logo.png" />
```

Si el archivo tiene otro nombre o formato, actualizá la referencia para que coincida.

### 6. Verificación de la versión final

Antes de publicar, ejecutá:

```bash
npm run build
```

Comprobá que la compilación termine correctamente y revisá la web para verificar que las imágenes, los enlaces, la navegación y las secciones funcionen como corresponde.

## Tecnologías utilizadas

- **React 19:** construcción de la interfaz mediante componentes.
- **TypeScript:** tipado estático y detección de errores.
- **Vite 8:** servidor de desarrollo y compilación.
- **Tailwind CSS 4:** estilos y diseño adaptable.
- **Google Fonts:** tipografías Playfair Display y Raleway.
- **WhatsApp:** canal de contacto para consultas y reservas.
- **Google Maps:** visualización de la ubicación del establecimiento.

## Mantenimiento del proyecto

Para mantener el código ordenado al incorporar nuevas funcionalidades:

- Colocá los componentes reutilizables en `src/components/`.
- Mantené la información de los tratamientos separada de la interfaz en `src/data/`.
- Guardá las imágenes y los logotipos en la carpeta de recursos correspondiente.
- Evitá modificar manualmente `package-lock.json`; npm lo actualiza al instalar o cambiar dependencias.
- Agregá comentarios breves que expliquen la responsabilidad de las funciones y los bloques importantes.
- Después de realizar cambios relevantes, ejecutá las comprobaciones de TypeScript y la compilación de producción.
