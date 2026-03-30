<template>
  <div class="contact-page">
    <PageHero
      title="Contact Us"
      label="Get In Touch"
      subtitle="Send us a message and we'll respond within 24 hours. Free quotation guaranteed."
      bg-image="/page-hero-bg.jpg"
    />

    <section class="section">
      <div class="container">
        <div class="contact-layout">
          <!-- Form -->
          <div v-scroll-animate>
            <ContactForm />
          </div>

          <!-- Info -->
          <div class="contact-info" v-scroll-animate="{ direction: 'right', delay: 200 }">
            <div class="contact-info-card">
              <p class="section-label">Contact Information</p>
              <h3>Reach Out To Us</h3>
              <p class="contact-info-subtitle">
                [CONTACT_DESC] — Replace with your contact description. Contact us and we'll respond within 24 hours.
              </p>

              <div class="info-items">
                <div class="info-item" v-for="info in contactInfo" :key="info.label">
                  <div class="info-item-icon">{{ info.icon }}</div>
                  <div>
                    <p class="info-item-label">{{ info.label }}</p>
                    <p class="info-item-value">{{ info.value }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Map Placeholder -->
            <div class="map-wrap">
              <div class="map-placeholder">
                <div class="map-pin">📍</div>
                <p>[ADDRESS_LINE_1]</p>
                <p>[ADDRESS_LINE_2]</p>
                <p>[CITY], [REGION], China</p>
                <a
                  href="[MAP_URL]"
                  target="_blank"
                  rel="noopener"
                  class="map-link"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import PageHero from '@/components/layout/PageHero.vue'
import ContactForm from '@/components/contact/ContactForm.vue'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { useLocalBusinessSchema, useBreadcrumbSchema } from '@/composables/useStructuredData'

useSeoMeta({
  title: 'Contact Us',
  description: '[CONTACT_SEO_DESC] — Replace with your contact page SEO description.',
  path: '/contact',
})
useLocalBusinessSchema()
useBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }])

const contactInfo = [
  { icon: '📞', label: 'Phone', value: '[PHONE_NUMBER]' },
  { icon: '✉️', label: 'Email', value: '[CONTACT_EMAIL]' },
  { icon: '📍', label: 'Address', value: "[COMPANY_ADDRESS]" },
  { icon: '⏰', label: 'Business Hours', value: 'Mon - Fri: 9:00 AM - 6:00 PM (GMT+8)' },
]
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 56px;
  align-items: start;

  @include tablet { grid-template-columns: 1fr; }
}

.contact-info {
  &-card {
    background: $primary-color;
    color: $white;
    border-radius: var(--radius-lg);
    padding: 36px;
    margin-bottom: 20px;

    h3 { font-size: 22px; font-weight: 700; margin-bottom: 12px; }
    .section-label { color: rgba(255,255,255,0.65); }
  }

  &-subtitle {
    font-size: 15px;
    color: rgba(255,255,255,0.8);
    line-height: 1.7;
    margin-bottom: 28px;
  }
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;

  &-icon {
    font-size: 22px;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    background: rgba(255,255,255,0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-label {
    font-size: 12px;
    color: rgba(255,255,255,0.6);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }

  &-value {
    font-size: 15px;
    color: $white;
    font-weight: 500;
    line-height: 1.5;
  }
}

.map-wrap {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.map-placeholder {
  background: linear-gradient(135deg, $bg-light 0%, #e8ecf0 100%);
  padding: 48px 32px;
  text-align: center;
  border: 2px dashed #ccc;
  border-radius: var(--radius-lg);

  .map-pin { font-size: 48px; margin-bottom: 16px; }

  p {
    font-size: 15px;
    color: $text-light;
    line-height: 1.7;
  }
}

.map-link {
  display: inline-block;
  margin-top: 16px;
  color: $primary-color;
  font-weight: 600;
  font-size: 14px;
  transition: color var(--transition);

  &:hover { color: $primary-dark; }
}
</style>



