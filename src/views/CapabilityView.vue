<template>
  <div class="capability-page">
    <PageHero
      title="Cobot Welding Platform"
      label="Production Capability"
      subtitle="Explore the capabilities that make our Cobot Welding Platform a leader in automated welding solutions."
      bg-image="@/assets/images/cap-welding-bg.jpg"
    />

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

    <section class="section">
      <div class="container">
        <div class="section-header" v-scroll-animate>
          <p class="section-label">Manufacturing Capacity</p>
          <h2 class="section-title">Primary <span>Capabilities</span></h2>
          <div class="divider divider-center"></div>
          <p class="section-subtitle" style="margin: 0 auto;">
            We provide state-of-the-art robotic welding platforms capable of handling a wide range of manufacturing tasks with precision and efficiency.
          </p>
        </div>

        <div class="cap-layout">
          <div class="cap-image" v-scroll-animate="{ direction: 'left' }">
            <img src="@/assets/images/cap-welding-main.jpg" alt="Cobot Welding Platform" loading="lazy" />
          </div>
          <div class="cap-grid" v-scroll-animate="{ direction: 'right', delay: 150 }">
            <div
              class="cap-card hover-lift"
              v-for="(item, index) in weldingCapabilities"
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

    <section class="section" style="background: var(--bg-light);">
      <div class="container">
        <div class="section-header" v-scroll-animate>
          <p class="section-label">Secondary Capabilities</p>
          <h2 class="section-title">Secondary <span>Capabilities</span></h2>
          <div class="divider divider-center"></div>
        </div>

        <div class="smt-layout">
          <div class="smt-image" v-scroll-animate="{ direction: 'left' }">
            <img src="@/assets/images/cap-welding-precision.jpg" alt="Welding Precision" loading="lazy" />
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
import { weldingCapabilities, smtCapabilities, keyStats } from '@/data/capabilities.js'
import BottomCTA from '@/components/home/BottomCTA.vue'
import PageHero from '@/components/layout/PageHero.vue'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { useBreadcrumbSchema } from '@/composables/useStructuredData'

useSeoMeta({
  title: 'Our Capabilities',
  description: 'Explore the advanced capabilities of our Cobot Welding Platform for high-precision automated manufacturing.',
  path: '/capability',
})
useBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Capability', url: '/capability' }])

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
      const duration = 1800
      const start = performance.now()
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        displayed.value = props.decimal ? parseFloat((end * progress).toFixed(2)) : Math.round(end * progress)
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
  { icon: '🔬', name: 'Laser Welding', desc: 'High-precision laser welding technology for detailed work.' },
  { icon: '☢️', name: 'Robotic Arms', desc: 'Automated robotic arms for 24/7 production efficiency.' },
  { icon: '🤖', name: 'Automated Controls', desc: 'Smart controls for precision and efficiency.' },
  { icon: '🔥', name: 'Thermal Management', desc: 'Advanced thermal systems to control temperature during welding.' },
  { icon: '🌊', name: 'Water-Cooled Systems', desc: 'High-efficiency cooling systems for long-lasting operation.' },
  { icon: '🧪', name: 'Quality Assurance', desc: 'Real-time quality control systems to ensure top-quality production.' },
]
</script>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';

.capability-page { font-family: $font-base; }

.key-stats { background: $primary-color; padding: 40px 0; }

.key-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }

.key-stat-item { text-align: center; padding: 20px; border-right: 1px solid rgba(255,255,255,0.15); color: $white; }

.key-stat-item:last-child { border-right: none; }

.section-header { text-align: center; margin-bottom: 48px; }

.cap-layout { display: grid; grid-template-columns: 1fr 1.8fr; gap: 48px; }

.cap-image img, .smt-image img { width: 100%; display: block; }

.cap-grid, .smt-specs, .equipment-grid { display: grid; gap: 24px; }

.equipment-item { text-align: center; padding: 20px; background: $white; border-radius: 8px; }
</style>
