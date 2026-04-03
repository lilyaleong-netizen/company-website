<template>
  <div class="about-page">
    <PageHero
      title="About Us"
      label="Who We Are"
      subtitle="We make welding automation simple, flexible, and accessible for manufacturers."
      bg-image="/page-hero-bg.jpg"
    />

    <!-- About Intro -->
    <section class="section">
      <div class="container">
        <div class="about-intro" v-scroll-animate>
          <p class="section-label">Who We Are</p>
          <h2 class="section-title">About Yeld Tech</h2>
          <div class="divider"></div>

          <p class="about-text">
            Yeld Tech specializes in cobot welding platforms designed to simplify industrial automation. Our solutions combine mobility, ease of use, and fast deployment to help manufacturers improve efficiency without complexity.
          </p>

          <p class="about-text">
            Our mobile welding systems are built for real production environments—no programming required, plug-and-play setup, and flexible integration into existing workflows.
          </p>

          <p class="about-text">
            We serve manufacturers across North America, Europe, the Middle East, and Asia, helping them reduce labor costs and adopt automation faster.
          </p>

          <p class="about-text">
            Our systems are developed with strict quality standards and engineered for reliability, safety, and long-term industrial performance.
          </p>
        </div>

        <div class="about-grid" style="margin-top: 60px;">
          <div class="about-image" v-scroll-animate="{ direction: 'left' }">
            <img src="/images/about-5555.webp" alt="Yeld Tech Facility" loading="lazy" />
          </div>

          <div class="about-stats" v-scroll-animate="{ direction: 'right', delay: 200 }">
            <div class="stat-card" v-for="stat in stats" :key="stat.label">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Showcase -->
    <section class="section video-section">
      <div class="container">
        <div class="section-header" v-scroll-animate>
          <p class="section-label">Company Introduction</p>
          <h2 class="section-title">See Yeld Tech <span>In Action</span></h2>
          <div class="divider divider-center"></div>
        </div>

        <div class="video-wrapper" v-scroll-animate>
          <img
            class="about-video"
            src="/videos/about-poster.jpg"
            alt="Yeld Tech Introduction"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="section mission-section">
      <div class="container">
        <div class="mission-content" v-scroll-animate>
          <p class="section-label">Our Purpose</p>
          <h2 class="section-title">Our <span>Mission</span></h2>
          <div class="divider"></div>

          <blockquote class="mission-quote">
            To make welding automation simple, flexible, and accessible for every manufacturer.
          </blockquote>

          <div class="mission-values">
            <div class="mission-value" v-for="val in values" :key="val.title">
              <div class="mission-value-icon">{{ val.icon }}</div>
              <h4>{{ val.title }}</h4>
              <p>{{ val.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose -->
    <section class="section" style="background: var(--bg-light);">
      <div class="container">
        <div class="section-header" v-scroll-animate>
          <p class="section-label">Our Advantages</p>
          <h2 class="section-title">Why Choose <span>Yeld Tech</span></h2>
          <div class="divider divider-center"></div>
        </div>

        <div class="advantages-grid">
          <div
            class="advantage-item hover-lift"
            v-for="(item, index) in advantages"
            :key="item.title"
            v-scroll-animate="{ delay: index * 80 }"
          >
            <div class="advantage-item-icon">{{ item.icon }}</div>
            <div class="advantage-item-content">
              <h4>{{ item.title }}</h4>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import PageHero from '@/components/layout/PageHero.vue'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { useBreadcrumbSchema } from '@/composables/useStructuredData'

useSeoMeta({
  title: 'About Yeld Tech',
  description: 'Learn about Yeld Tech and our cobot welding platforms designed for mobile, plug-and-play, and no-programming industrial automation.',
  path: '/about',
})

useBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'About Us', url: '/about' }
])

const stats = [
  { value: '10+', label: 'Years in Automation' },
  { value: '100+', label: 'Projects Delivered' },
  { value: '30+', label: 'Countries Served' },
  { value: '24h', label: 'Response Time' },
]

const values = [
  { icon: '⚙️', title: 'Simplicity', desc: 'No programming required, easy to deploy and operate' },
  { icon: '🚀', title: 'Efficiency', desc: 'Faster setup and reduced labor costs for manufacturers' },
  { icon: '🔧', title: 'Flexibility', desc: 'Mobile welding systems adaptable to different production needs' },
]

const advantages = [
  { icon: '🤖', title: 'Cobot Welding Platform', desc: 'Advanced collaborative welding systems designed for modern manufacturing.' },
  { icon: '🚗', title: 'Mobile Welding System', desc: 'Flexible mobile welding car enables easy relocation across production lines.' },
  { icon: '🧠', title: 'No Programming Required', desc: 'Intuitive operation allows quick deployment without coding or robotics expertise.' },
  { icon: '🔌', title: 'Plug and Play', desc: 'Fast installation and immediate use without complex integration.' },
  { icon: '⚡', title: 'Fast Deployment', desc: 'Reduce setup time and start production quickly.' },
  { icon: '💰', title: 'Cost Efficiency', desc: 'Lower labor costs and improve production efficiency.' },
  { icon: '🌍', title: 'Global Support', desc: 'Serving clients worldwide with reliable technical support.' },
  { icon: '🏭', title: 'Industrial Reliability', desc: 'Engineered for stable performance in demanding environments.' },
]
</script>
