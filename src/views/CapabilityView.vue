<template>
  <div class="capability-page">
    <!-- Hero Section -->
    <PageHero
      title="Cobot Welding Platform"
      label="Production Capability"
      subtitle="Discover the collaborative welding solutions that improve efficiency, safety, and precision on your production line."
      bg-image="/images/page-hero-welding.jpg"
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
            Our cobot welding platforms excel in precision, repeatability, and safety for industrial welding operations.
          </p>
        </div>

        <!-- Left Image + Right Card Grid -->
        <div class="cap-layout">
          <div class="cap-image" v-scroll-animate="{ direction: 'left' }">
            <!-- Add image here when available -->
            <img src="/images/cap-welding-main.jpg" alt="Cobot Welding Platform in Action" loading="lazy" />
          </div>
          <div class="cap-grid" v-scroll-animate="{ direction: 'right', delay: 150 }">
            <div
              class="cap-card hover-lift"
              v-for="(item, index) in cobotCapabilities"
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
          <h2 class="section-title">Additional <span>Capabilities</span></h2>
          <div class="divider divider-center"></div>
        </div>

        <div class="smt-layout">
          <div class="smt-image" v-scroll-animate="{ direction: 'left' }">
            <!-- Add image here when available -->
            <img src="/images/cap-welding-secondary.jpg" alt="Secondary Welding Setup" loading="lazy" />
            <div class="smt-badge">
              <span>±0.5mm</span>
              <small>Welding Precision</small>
            </div>
          </div>
          <div class="smt-specs" v-scroll-animate="{ direction: 'right', delay: 150 }">
            <div class="smt-spec-item" v-for="item in cobotSecondaryCapabilities" :key="item.label">
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
import BottomCTA from '@/components/home/BottomCTA.vue'
import PageHero from '@/components/layout/PageHero.vue'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { useBreadcrumbSchema } from '@/composables/useStructuredData'

// 数据示例：Cobot Welding Platform 风格
const keyStats = [
  { label: 'Projects Completed', value: 120, decimal: false, suffix: '+' },
  { label: 'Cobot Units', value: 85, decimal: false, suffix: '' },
  { label: 'Precision (mm)', value: 0.5, decimal: true, suffix: ' mm' },
  { label: 'Customer Satisfaction', value: 98, decimal: false, suffix: '%' },
]

const cobotCapabilities = [
  { icon: '🤖', label: 'Collaborative Welding', value: 'High Efficiency' },
  { icon: '⚡', label: 'Automated Safety', value: 'Certified Protocols' },
  { icon: '🛠️', label: 'Versatile Materials', value: 'Steel, Aluminum' },
  { icon: '⏱️', label: 'Cycle Time', value: 'Reduced by 40%' },
]

const cobotSecondaryCapabilities = [
  { icon: '🔧', label: 'Custom Fixtures', value: 'Adaptable Setup' },
  { icon: '📐', label: 'Precision Control', value: '±0.5mm' },
  { icon: '🌡️', label: 'Thermal Management', value: 'Optimized Heat' },
]

useSeoMeta({
  title: 'Cobot Welding Platform Capabilities',
  description: 'Explore the capabilities of our collaborative welding platforms for industrial production.',
  path: '/capability',
})

useBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Capabilities', url: '/capability' }])

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
  { icon: '🤖', name: 'Cobot Arm', desc: 'Collaborative robotic welding arm for precision tasks.' },
  { icon: '🛠️', name: 'Welding Station', desc: 'Fully automated welding station with safety enclosures.' },
  { icon: '⚡', name: 'Power Supply', desc: 'Stable and efficient power units for continuous operation.' },
  { icon: '🌡️', name: 'Thermal Sensors', desc: 'Monitor and control heat during welding cycles.' },
  { icon: '📐', name: 'Positioning Table', desc: 'High-precision fixture for repeatable positioning.' },
  { icon: '🔧', name: 'Tooling Kit', desc: 'Custom tools and jigs for versatile applications.' },
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

  .cap-image img { width: 100%; border-radius: var(--radius); }

  .cap-grid {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(2, 1fr);
  }

  .cap-card {
    background: $white;
    border-radius: var(--radius);
    padding: 24px;
    text-align: center;
    color: $black;
    transition: all var(--transition);
    cursor: default;
    &:hover { transform: translateY(-6px); }
    .cap-card-icon { font-size: 32px; margin-bottom: 12px; }
    .cap-card-label { font-weight: 700; margin-bottom: 6px; }
    .cap-card-value { font-size: 15px; color: $accent-color; }
  }
}

.smt-layout {
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 48px;
  align-items: center;
  @include tablet { grid-template-columns: 1fr 1fr; gap: 32px; }

  .smt-image img { width: 100%; border-radius: var(--radius); }
  .smt-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: $accent-color;
    color: $white;
    padding: 6px 12px;
    border-radius: var(--radius);
    span { font-weight: 700; margin-right: 4px; }
    small { font-size: 11px; opacity: 0.8; }
  }

  .smt-specs { display: flex; flex-direction: column; gap: 16px; }

  .smt-spec-item { display: flex; justify-content: space-between; }
  .smt-spec-item-label { font-weight: 600; display: flex; align-items: center; gap: 8px; }
  .smt-spec-item-value { font-weight: 700; color: $accent-color; }
}

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  @include tablet { grid-template-columns: repeat(2, 1fr); }
  @include mobile { grid-template-columns: 1fr; }

  .equipment-item {
    background: $white;
    border-radius: var(--radius);
    padding: 24px;
    text-align: center;
    transition: all var(--transition);
    &:hover { transform: translateY(-6px); }
    .equipment-item-icon { font-size: 36px; margin-bottom: 12px; }
    h4 { font-weight: 700; margin-bottom: 8px; }
    p { color: $text-light; font-size: 14px; line-height: 1.5; }
  }
}
</style>
