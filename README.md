# YOS SALUT — Web profesional

Sitio web para el centro de masajes **YOS SALUT** en Vilanova del Camí (Barcelona).

## Estructura del proyecto

```
/
├── index.html          # Página principal (10 secciones)
├── css/
│   ├── base.css        # Reset, variables CSS, tipografía
│   ├── layout.css      # Contenedores, grids, secciones
│   ├── components.css  # Header, hero, cards, FAQ, footer, botones
│   └── utilities.css   # Clases de utilidad reutilizables
├── js/
│   ├── config.js       # Datos de negocio editables (WhatsApp, Instagram, etc.)
│   └── main.js         # Menú móvil, smooth scroll, FAQ accordion
├── assets/             # Imágenes, fuentes locales, favicons
└── README.md
```

## Configuración

Edita `js/config.js` para cambiar:

- **WhatsApp**: número y mensaje prellenado
- **Instagram**: URL del perfil (`instagramUrl`)
- **Horario**: texto mostrado
- **Ubicación**: ciudad y zona de servicio

Busca también `https://www.instagram.com/yossalut` en `index.html` para actualizar el enlace real de Instagram en los botones del HTML.

## SEO incluido

- `<title>` y `<meta description>` optimizados para SEO local
- Open Graph + Twitter Cards
- Schema.org JSON-LD: `HealthAndBeautyBusiness` + `FAQPage`
- Estructura semántica H1 > H2 > H3
- Keywords naturales para Vilanova del Camí e Igualada

## Desarrollo local

```bash
# Servir con Python
python3 -m http.server 8080

# O con Node (si tienes npx)
npx serve .
```

Abre `http://localhost:8080` en tu navegador.

## Escalabilidad

El proyecto está preparado para:

- **Añadir más servicios**: duplica una `<article class="service-card">` en la sección de servicios.
- **Nuevas páginas**: crea archivos HTML adicionales reutilizando header/footer.
- **Blog**: crea una carpeta `/blog/` con su propia estructura.
- **Sistema de reservas**: integra un widget externo o formulario en la sección de contacto.

## Rendimiento

- Sin dependencias JS externas
- CSS modular y mínimo
- Fuentes con `font-display: swap` (Google Fonts)
- Imágenes con `loading="lazy"`
- Iframe del mapa con `loading="lazy"`

## Licencia

Proyecto privado — © YOS SALUT
