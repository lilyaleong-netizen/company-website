<template>
  <div class="capability-page">
    <PageHero
      title="Manufacturing &amp; Assembly"
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

        <!-- 左图 + 右卡片网格 -->
        <div class="cap-layout">
          <div class="cap-image" v-scroll-animate="{ direction: 'left' }">
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
  @include mobile { grid-template-columns: 1fr; }
}

.cap-image {
  img {
    width: 100%;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    display: block;
  }
}

.cap-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @include mobile { grid-template-columns: 1fr 1fr; }
}

.cap-card {
  background: $white;
  border: 1px solid #e8ecf0;
  border-radius: var(--radius);
  padding: 14px 16px;
  text-align: center;
  cursor: default;
  transition: all var(--transition);

  &:hover {
    border-color: $primary-color;
    background: rgba(0, 102, 204, 0.03);
  }

  &-icon {
    font-size: 22px;
    margin-bottom: 6px;
  }

  &-label {
    font-size: 11px;
    color: $text-light;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
    font-weight: 600;
  }

  &-value {
    font-size: 13px;
    font-weight: 700;
    color: $primary-color;
    line-height: 1.4;
  }
}

.smt-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;

  @include mobile { grid-template-columns: 1fr; }
}

.smt-image {
  position: relative;

  img {
    width: 100%;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
  }
}

.smt-badge {
  position: absolute;
  bottom: 20px;
  right: -16px;
  background: $accent-color;
  color: $white;
  padding: 14px 20px;
  border-radius: var(--radius);
  text-align: center;
  box-shadow: var(--shadow-md);

  span { display: block; font-size: 24px; font-weight: 700; }
  small { font-size: 12px; opacity: 0.9; }

  @include mobile { right: 10px; bottom: 10px; }
}

.smt-specs {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.smt-spec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #eee;

  &:last-child { border-bottom: none; }

  &-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    color: $text-dark;
    font-weight: 500;
  }

  &-icon { font-size: 18px; }

  &-value {
    font-size: 15px;
    font-weight: 700;
    color: $primary-color;
    text-align: right;
    max-width: 200px;
  }
}

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @include tablet { grid-template-columns: repeat(2, 1fr); }
  @include mobile { grid-template-columns: 1fr; }
}

.equipment-item {
  background: $white;
  border-radius: var(--radius);
  padding: 28px 24px;
  box-shadow: var(--shadow-sm);
  text-align: center;
  border-top: 3px solid transparent;
  cursor: default;
  transition: all var(--transition);

  &:hover { border-top-color: $primary-color; }

  &-icon { font-size: 40px; margin-bottom: 16px; }
  h4 { font-size: 17px; font-weight: 700; color: $text-dark; margin-bottom: 10px; }
  p { font-size: 14px; color: $text-light; line-height: 1.7; }
}
</style>
