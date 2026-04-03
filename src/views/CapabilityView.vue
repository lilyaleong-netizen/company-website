<template>
  <div class="capability-page">
    <PageHero
      title="Manufacturing & Assembly"
      label="Production Capability"
      subtitle="[CAPABILITY_SUBTITLE] — Replace with your key capability highlights."
      bg-image="/page-hero-bg.jpg"
    />

    <!-- Key Stats -->
    <section class="key-stats">
      <div class="container">
        <div class="key-stats-grid">
          <div
            class="key-stat-item"
            v-for="(stat, i) in keyStats"
            :key="stat.label"
            v-scroll-animate="{ delay: i * 100 }"
          >
            <div class="key-stat-item-value">
              <CountUp :target="stat.value" :decimal="stat.decimal" :suffix="stat.suffix" />
            </div>
            <div class="key-stat-item-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Primary Capabilities -->
    <section class="section">
      <div class="container">
        <div class="section-header" v-scroll-animate>
          <p class="section-label">Manufacturing Capacity</p>
          <h2 class="section-title">Primary <span>Capabilities</span></h2>
          <div class="divider divider-center"></div>
          <p class="section-subtitle" style="margin: 0 auto;">
            [CAPABILITY_DESC] — Replace with your capability description.
          </p>
        </div>

        <!-- Left Image + Right Card Grid -->
        <div class="cap-layout">
          <div class="cap-image" v-scroll-animate="{ direction: 'left' }">
            <!-- Add image here when available -->
            <img src="/images/cap-pcb-types.jpg" alt="[CAPABILITY_IMAGE_ALT]" loading="lazy" />
          </div>
          <div class="cap-grid" v-scroll-animate="{ direction: 'right', delay: 150 }">
            <div
              class="cap-card hover-lift"
              v-for="(item, index) in pcbCapabilities"
              :key="item.label"
            >
              <div class="cap-card-icon">{{ item.icon }}</div>
              <div class="cap-card-label">{{ item.label }}</div>
              <div class="cap-card-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Secondary Capabilities -->
    <section class="section" style="background: var(--bg-light);">
      <div class="container">
        <div class="section-header" v-scroll-animate>
          <p class="section-label">Secondary Capabilities</p>
          <h2 class="section-title">Secondary <span>Capabilities</span></h2>
          <div class="divider divider-center"></div>
        </div>

        <div class="smt-layout">
          <div class="smt-image" v-scroll-animate="{ direction: 'left' }">
            <!-- Add image here when available -->
            <img src="/images/capability-3333.jpg" alt="[SECONDARY_CAP_IMAGE_ALT]" loading="lazy" />
            <div class="smt-badge">
              <span>±0.03mm</span>
              <small>Placement Precision</small>
            </div>
          </div>
          <div class="smt-specs" v-scroll-animate="{ direction: 'right', delay: 150 }">
            <div class="smt-spec-item" v-for="item in smtCapabilities" :key="item.label">
              <div class="smt-spec-item-label">
                <span class="smt-spec-item-icon">{{ item.icon }}</span>
                {{ item.label }}
              </div>
              <div class="smt-spec-item-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Equipment & Process -->
    <section class="section">
      <div class="container">
        <div class="section-header" v-scroll-animate>
          <p class="section-label">Our Equipment</p>
          <h2 class="section-title">Advanced <span>Equipment</span></h2>
          <div class="divider divider-center"></div>
        </div>
        <div class="equipment-grid">
          <div
            class="equipment-item hover-lift"
            v-for="(eq, i) in equipment"
            :key="eq.name"
            v-scroll-animate="{ delay: i * 100 }"
          >
            <div class="equipment-item-icon">{{ eq.icon }}</div>
            <h4>{{ eq.name }}</h4>
            <p>{{ eq.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <BottomCTA />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { pcbCapabilities, smtCapabilities, keyStats } from '@/data/capabilities.js'
import BottomCTA from '@/components/home/BottomCTA.vue'
import PageHero from '@/components/layout/PageHero.vue'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { useBreadcrumbSchema } from '@/composables/useStructuredData'

useSeoMeta({
  title: 'Our Capabilities',
  description: '[CAPABILITY_SEO_DESC] — Replace with your capability page SEO description.',
  path: '/capability',
})
useBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Capability', url: '/capability' }])

// CountUp component inline
const CountUp = {
  props: { target: Number, decimal: Boolean, suffix: String },
  setup(props) {
    const displayed = ref(0)
    const el = ref(null)
    let started = false

    const animate = () => {
      if (started) return
      started = true
      const end = props.target
      const isDecimal = props.decimal
      const duration = 1800
      const start = performance.now()

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = eased * end
        displayed.value = isDecimal
          ? parseFloat(current.toFixed(2))
          : Math.round(current)
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    onMounted(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { animate(); observer.disconnect() }
      }, { threshold: 0.5 })
      if (el.value) observer.observe(el.value)
    })

    return { displayed, el }
  },
  template: `<span ref="el">{{ displayed }}{{ suffix }}</span>`
}

const equipment = [
  { icon: '🔬', name: '[EQUIPMENT_1_NAME]', desc: '[EQUIPMENT_1_DESC]' },
  { icon: '☢️', name: '[EQUIPMENT_2_NAME]', desc: '[EQUIPMENT_2_DESC]' },
  { icon: '🤖', name: '[EQUIPMENT_3_NAME]', desc: '[EQUIPMENT_3_DESC]' },
  { icon: '🔥', name: '[EQUIPMENT_4_NAME]', desc: '[EQUIPMENT_4_DESC]' },
  { icon: '🌊', name: '[EQUIPMENT_5_NAME]', desc: '[EQUIPMENT_5_DESC]' },
  { icon: '🧪', name: '[EQUIPMENT_6_NAME]', desc: '[EQUIPMENT_6_DESC]' },
]
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.key-stats {
  background: $primary-color;
  padding: 40px 0;

  &-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    @include tablet { grid-template-columns: repeat(2, 1fr); }
    @include mobile { grid-template-columns: 1fr 1fr; }
  }
}

.key-stat-item {
  text-align: center;
  padding: 20px;
  border-right: 1px solid rgba(255,255,255,0.15);
  color: $white;

  &:last-child { border-right: none; }

  &-value {
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 8px;
    color: $white;
  }

  &-label {
    font-size: 13px;
    color: rgba(255,255,255,0.75);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
  .divider { margin: 16px auto 24px; }
}

.cap-layout {
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 48px;
  align-items: center;

  @include tablet { grid-template-columns: 1fr 1fr; gap: 32px; }
  @
  
