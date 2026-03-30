import { useHead } from '@unhead/vue'

// TODO: Replace with your actual values
const SITE_URL = 'https://[SITE_DOMAIN]'
const SITE_NAME = '[COMPANY_NAME]'
const DEFAULT_OG_IMAGE = 'https://[SITE_DOMAIN]/logo.png'

/**
 * Inject full SEO meta tags per page
 * @param {Object} options
 * @param {string} options.title         Page title (without site name)
 * @param {string} options.description   Page description (120-160 chars optimal)
 * @param {string} [options.path]        Path for canonical URL (e.g. '/about')
 * @param {string} [options.ogImage]     OG image URL
 * @param {string} [options.ogType]      'website' | 'article', default website
 * @param {Object} [options.article]     Article extra fields { publishedTime, author, section }
 */
export function useSeoMeta(options) {
  const {
    title,
    description,
    path = '',
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    article = null,
  } = options

  const fullTitle = `${title} | ${SITE_NAME}`
  const canonical = `${SITE_URL}${path}`
  const resolvedOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`

  const meta = [
    // Basic
    { name: 'description', content: description },
    { name: 'keywords', content: '[SEO_KEYWORDS]' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: SITE_NAME },

    // Open Graph
    { property: 'og:type', content: ogType },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: resolvedOgImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'en_US' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: resolvedOgImage },
  ]

  // Article-specific fields
  if (ogType === 'article' && article) {
    if (article.publishedTime) meta.push({ property: 'article:published_time', content: article.publishedTime })
    if (article.author) meta.push({ property: 'article:author', content: article.author })
    if (article.section) meta.push({ property: 'article:section', content: article.section })
  }

  useHead({
    title: fullTitle,
    meta,
    link: [
      { rel: 'canonical', href: canonical },
      { rel: 'alternate', hreflang: 'en', href: canonical },
      { rel: 'alternate', hreflang: 'x-default', href: canonical },
    ],
  })
}
