<template>
  <div class="services-page">
    <PageHero
      title="Our Services"
      label="What We Offer"
      subtitle="[SERVICES_SUBTITLE] — Replace with your services page subtitle."
      bg-image="/page-hero-bg.jpg"
    />

    <!-- Service Sections - alternate layout -->
    <template v-for="(service, index) in services" :key="service.id">
      <section class="section service-section" :class="index % 2 !== 0 ? 'service-section-alt' : ''">
        <div class="container">
          <div class="service-layout" :class="index % 2 !== 0 ? 'service-layout-reverse' : ''">
            <!-- Images Grid -->
            <div
              class="service-images"
              v-scroll-animate="{ direction: index % 2 !== 0 ? 'right' : 'left' }"
            >
              <div class="service-images-grid">
                <div
                  class="service-images-item"
                  v-for="(img, i) in service.images"
                  :key="i"
                >
                  <img :src="img" :alt="`${service.title} ${i + 1}`" loading="lazy" />
                </div>
              </div>
            </div>

            <!-- Content -->
            <div
              class="service-content"
              v-scroll-animate="{ direction: index % 2 !== 0 ? 'left' : 'right', delay: 150 }"
            >
              <p class="section-label">{{ `0${index + 1}` }}</p>
              <h2 class="section-title">{{ service.title }}</h2>
              <div class="divider"></div>
              <p class="service-desc">{{ service.description }}</p>
              <ul class="service-features">
                <li v-for="feat in service.features" :key="feat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  {{ feat }}
                </li>
              </ul>
              <RouterLink to="/contact" class="btn btn-primary">
                Get a Quote
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- Factory View -->
    <section class="section factory-section" style="background: var(--bg-light);">
      <div class="container">
        <div class="section-header" v-scroll-animate>
          <p class="section-label">Our Facility</p>
          <h2 class="section-title">Factory <span>View</span></h2>
          <div class="divider divider-center"></div>
        </div>

        <div class="factory-block" v-scroll-animate>
          <h3 class="factory-block-title">[FACTORY_1_TITLE]</h3>
          <div class="factory-grid">
            <div class="factory-img hover-lift" v-for="(img, i) in pcbFactoryImgs" :key="`pcb-${i}`">
              <img :src="img" :alt="`[FACTORY_1_TITLE] ${i + 1}`" loading="lazy" />
            </div>
          </div>
        </div>

        <div class="factory-block" v-scroll-animate>
          <h3 class="factory-block-title">[FACTORY_2_TITLE]</h3>
          <div class="factory-grid">
            <div class="factory-img hover-lift" v-for="(img, i) in asmFactoryImgs" :key="`asm-${i}`">
              <img :src="img" :alt="`[FACTORY_2_TITLE] ${i + 1}`" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <BottomCTA />
  </div>
</template>

<script setup>
import { services } from '@/data/services.js'
import BottomCTA from '@/components/home/BottomCTA.vue'
import PageHero from '@/components/layout/PageHero.vue'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { useBreadcrumbSchema } from '@/composables/useStructuredData'

const pcbFactoryImgs = [
  '/images/factory-pcb-1.jpg',
  '/images/factory-pcb-2.jpg',
  '/images/factory-pcb-3.jpg',
  '/images/factory-pcb-4.jpg',
]

const asmFactoryImgs = [
  '/images/factory-asm-1.jpg',
  '/images/factory-asm-2.jpg',
  '/images/factory-asm-3.jpg',
  '/images/factory-asm-4.jpg',
]

useSeoMeta({
  title: 'Our Services',
  description: '[SERVICES_SEO_DESC] — Replace with your services page SEO description.',
  path: '/services',
})
useBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }])
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';


.service-section {
  background: $white;
  &-alt { background: $bg-light; }
}

.service-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @include mobile {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  &-reverse {
    direction: rtl;
    > * { direction: ltr; }

    @include mobile { direction: ltr; }
  }
}

.service-images-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.service-images-item {
  overflow: hidden;
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: all var(--transition);
  transform: translateY(0);

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover {
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18), 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
    img { transform: scale(1.08); }
  }
}

.service-desc {
  font-size: 15px;
  color: $text-light;
  line-height: 1.85;
  margin-bottom: 24px;
  white-space: pre-line;
}

.service-features {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: $text-dark;
    font-weight: 500;

    svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      color: $secondary-color;
    }
  }
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
  .divider { margin: 16px auto; }
}

.factory-block {
  margin-bottom: 48px;
  &:last-child { margin-bottom: 0; }

  &-title {
    font-size: 22px;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 20px;
    padding-left: 16px;
    border-left: 4px solid $primary-color;
  }
}

.factory-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @include tablet { grid-template-columns: repeat(2, 1fr); }
  @include mobile { grid-template-columns: 1fr 1fr; }
}

.factory-img {
  overflow: hidden;
  border-radius: var(--radius);
  cursor: zoom-in;

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    transition: transform 0.5s ease;
    display: block;
  }

  &:hover img { transform: scale(1.05); }
}
</style>
