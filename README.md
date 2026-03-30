# Company Website Template

A production-ready Vue 3 + Vite corporate website template with SSG (Static Site Generation), SEO optimization, and responsive design.

## Features

- **Vue 3** with Composition API (`<script setup>`)
- **Vite SSG** — pre-renders all pages to static HTML for SEO
- **Responsive Design** — mobile-first with tablet/desktop breakpoints
- **SEO Ready** — structured data (JSON-LD), Open Graph, Twitter Cards, sitemap, robots.txt
- **Blog System** — category filtering, detail pages with sidebar
- **Contact Form** — EmailJS integration with validation & rate limiting
- **Scroll Animations** — IntersectionObserver-based reveal animations
- **Performance** — Gzip/Brotli compression, lazy loading, code splitting

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production (SSG)
npm run build

# Preview production build
npm run preview
```

## Customization

Search for `[PLACEHOLDER]` patterns across the codebase and replace them with your actual content.

### Key Placeholders

| Placeholder | Where | Description |
|---|---|---|
| `[COMPANY_NAME]` | Everywhere | Your company name |
| `[SITE_DOMAIN]` | `vite.config.js`, composables, `index.html` | Your domain (e.g. `example.com`) |
| `[CONTACT_EMAIL]` | Navbar, Footer, ContactForm | Contact email address |
| `[PHONE_NUMBER]` | Footer, ContactView, structured data | Phone number |
| `[COMPANY_ADDRESS]` | Footer, ContactView | Full address |
| `[STREET_ADDRESS]` | Structured data | Street address |
| `[CITY]` / `[REGION]` | Structured data | City & region |
| `[COUNTRY_CODE]` | Structured data | ISO country code (e.g. `US`) |
| `[PRODUCT_DESC]` | `index.html`, structured data | Brief product/service description |
| `[HERO_TITLE]` | HeroBanner | Main hero heading |
| `[HERO_SUBTITLE]` | HeroBanner | Hero sub-heading |
| `[SERVICE_*]` | services.js, ServiceCards, Footer | Service names & descriptions |
| `[BLOG_*]` | blogPosts.js | Blog post titles & content |
| `[CLIENT_*]` | testimonials.js | Client testimonials |
| `[CAPABILITY_*]` | capabilities.js | Technical capabilities |
| `[SEO_KEYWORDS]` | useSeoMeta.js | SEO keywords for meta tags |
| `[LINKEDIN_URL]` | Footer | Social media link |
| `[MAP_URL]` | ContactView | Google Maps link |
| `[LATITUDE]` / `[LONGITUDE]` | Structured data | Geo coordinates |

### Files to Customize

1. **`src/data/`** — All data files (services, testimonials, blog, capabilities)
2. **`src/composables/`** — SEO meta and structured data
3. **`src/components/home/`** — Homepage sections
4. **`src/views/`** — Page-level content and SEO meta
5. **`vite.config.js`** — Site URL for sitemap
6. **`index.html`** — Default title and meta
7. **`public/`** — Logo, favicon, and images

### Environment Variables

Copy `.env.example` to `.env` and fill in your EmailJS credentials:

```bash
cp .env.example .env
```

### Images

Replace placeholder image paths in the data files and components with your actual images. Place them in the `public/images/` directory.

## Project Structure

```
├── public/              # Static assets (logo, favicon, images)
├── src/
│   ├── assets/styles/   # SCSS variables, global styles, animations
│   ├── components/
│   │   ├── contact/     # Contact form
│   │   ├── home/        # Homepage sections (Hero, Services, Testimonials, etc.)
│   │   └── layout/      # Navbar, Footer, PageHero
│   ├── composables/     # SEO meta, structured data
│   ├── data/            # Services, testimonials, blog posts, capabilities
│   ├── directives/      # Scroll animation directive
│   ├── router/          # Vue Router routes
│   ├── views/           # Page components
│   ├── App.vue
│   └── main.js          # Vite SSG entry
├── index.html
├── vite.config.js
└── package.json
```

## Pages

- **Home** — Hero banner, company intro, services, testimonials, certifications, CTA
- **About** — Company story, stats, video, mission, advantages
- **Services** — Detailed service pages with image grids
- **Capability** — Technical specs, equipment, key stats
- **Blog** — Category-filtered blog with detail pages
- **Contact** — Contact form + company info + map

## Deployment

The `npm run build` command generates a `dist/` directory with pre-rendered static HTML. Deploy to any static hosting:

- **Netlify** / **Vercel** — Auto-detects Vite, just connect your repo
- **GitHub Pages** — Push `dist/` to `gh-pages` branch
- **Nginx** — Serve `dist/` as root with appropriate caching headers
- **AWS S3 + CloudFront** — Upload `dist/` to S3, use CloudFront for CDN

## Tech Stack

- Vue 3.5 + Vue Router 4
- Vite 7 + Vite SSG
- SCSS with variables & mixins
- @unhead/vue for SEO head management
- EmailJS for contact form
- vite-plugin-sitemap
- vite-plugin-compression2

