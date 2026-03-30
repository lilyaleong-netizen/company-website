import { useHead } from '@unhead/vue'

// TODO: Replace with your actual site URL
const SITE_URL = 'https://[SITE_DOMAIN]'

/** Organization schema — injected once in App.vue */
export function useOrganizationSchema() {
  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '[COMPANY_NAME]',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: '[PRODUCT_DESC]',
        foundingDate: '[FOUNDING_YEAR]',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '[STREET_ADDRESS]',
          addressLocality: '[CITY]',
          addressRegion: '[REGION]',
          addressCountry: '[COUNTRY_CODE]',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '[PHONE_NUMBER]',
          email: '[CONTACT_EMAIL]',
          contactType: 'sales',
          availableLanguage: ['English'],
        },
        sameAs: [SITE_URL],
      }),
      key: 'org-schema',
    }],
  })
}

/** LocalBusiness schema — for Contact page */
export function useLocalBusinessSchema() {
  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: '[COMPANY_NAME]',
        url: SITE_URL,
        telephone: '[PHONE_NUMBER]',
        email: '[CONTACT_EMAIL]',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '[STREET_ADDRESS]',
          addressLocality: '[CITY]',
          addressRegion: '[REGION]',
          postalCode: '[POSTAL_CODE]',
          addressCountry: '[COUNTRY_CODE]',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '[LATITUDE]',
          longitude: '[LONGITUDE]',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        priceRange: '$$',
      }),
      key: 'localbiz-schema',
    }],
  })
}

/**
 * Article schema — for blog detail pages
 * @param {{ title, description, publishedDate, image, url }} article
 */
export function useArticleSchema(article) {
  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        image: article.image,
        datePublished: article.publishedDate,
        author: {
          '@type': 'Organization',
          name: '[COMPANY_NAME]',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: '[COMPANY_NAME]',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': article.url,
        },
      }),
      key: 'article-schema',
    }],
  })
}

/**
 * BreadcrumbList schema — generic for inner pages
 * @param {Array<{ name: string, url: string }>} items
 */
export function useBreadcrumbSchema(items) {
  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.url}`,
        })),
      }),
      key: 'breadcrumb-schema',
    }],
  })
}
