<template>
  <div class="about-page">
    <PageHero
      title="About Us"
      label="Who We Are"
      subtitle="[ABOUT_SUBTITLE] — Replace with your company subtitle."
      bg-image="/page-hero-bg.jpg"
    />

    <!-- About Intro -->
    <section class="section">
      <div class="container">
        <div class="about-intro" v-scroll-animate>
          <p class="section-label">Who We Are</p>
          <h2 class="section-title">About [COMPANY_NAME]</h2>
          <div class="divider"></div>
          <p class="about-text">
            [ABOUT_TAGLINE] — Replace with your company tagline.
          </p>
          <p class="about-text">
            [ABOUT_DESC_2] — Replace with your company service overview.
          </p>
          <p class="about-text">
            We work with startups, scaling companies, and established brands across North America, Europe, the Middle East, and Asia. Whatever your stage, whatever your volume — we fit into your process, not the other way around.
          </p>
          <p class="about-text">
            [ABOUT_CERTS] — Replace with your certifications or quality standards.
          </p>
        </div>

        <div class="about-grid" style="margin-top: 60px;">
          <div class="about-image" v-scroll-animate="{ direction: 'left' }">
            <img src="/images/about-5555.webp" alt="[COMPANY_NAME] Facility" loading="lazy" />
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
          <h2 class="section-title">See [COMPANY_NAME] <span>In Action</span></h2>
          <div class="divider divider-center"></div>
        </div>
        <div class="video-wrapper" v-scroll-animate>
          <img
            class="about-video"
            src="/videos/about-poster.jpg"
            alt="[COMPANY_NAME] Introduction"
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
            [MISSION_STATEMENT] — Replace with your company mission statement.
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
          <h2 class="section-title">Why Choose <span>[COMPANY_NAME]</span></h2>
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
  title: 'About Us',
  description: '[ABOUT_SEO_DESC] — Replace with your about page SEO description.',
  path: '/about',
})
useBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'About Us', url: '/about' }])

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '5000+', label: 'Customers Worldwide' },
  { value: '[STAT_3]', label: '[STAT_3_LABEL]' },
  { value: '[STAT_4]', label: '[STAT_4_LABEL]' },
]

const values = [
  { icon: '🌟', title: 'Quality First', desc: 'ISO 9001:2015 certified processes ensuring consistent, reliable products' },
  { icon: '🤝', title: 'Client Partnership', desc: 'Long-term relationships built on trust and transparent communication' },
  { icon: '🚀', title: 'Innovation', desc: 'Continuously investing in advanced equipment and technologies' },
]

const advantages = [
  { icon: '✅', title: 'High Quality Boards', desc: '[ADVANTAGE_1_DESC] — Replace with your quality description.' },
  { icon: '🏭', title: 'Superior Component Sourcing', desc: '[ADVANTAGE_2_DESC] — Replace with your sourcing description.' },
  { icon: '💰', title: 'Competitive Pricing', desc: 'Cost-effective solutions without compromising quality through optimized production processes.' },
  { icon: '👥', title: 'Dedicated Team', desc: 'Passionate engineering and sales team dedicated to solving your technical challenges.' },
  { icon: '📅', title: '15+ Years Experience', desc: '[ADVANTAGE_5_DESC] — Replace with your experience description.' },
  { icon: '🔄', title: 'One-Stop Service', desc: '[ADVANTAGE_6_DESC] — Replace with your one-stop service description.' },
  { icon: '🏆', title: 'ISO Certified', desc: 'ISO 9001:2015 certification ensuring systematic quality management throughout production.' },
  { icon: '⚡', title: 'Fast Delivery', desc: '[ADVANTAGE_8_DESC] — Replace with your delivery description.' },
  { icon: '💳', title: 'Easy Payment', desc: 'Quick quotation within 24 hours, PayPal accepted for convenient international payments.' },
  { icon: '📐', title: '[ADVANTAGE_10_TITLE]', desc: '[ADVANTAGE_10_DESC] — Replace with your product range description.' },
]
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';


.about-intro {
  max-width: 800px;
}

.about-text {
  font-size: 16px;
  color: $text-light;
  line-height: 1.85;
  margin-bottom: 16px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;

  @include mobile {
    grid-template-columns: 1fr;
  }
}

.about-image img {
  width: 100%;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.about-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.stat-card {
  background: $white;
  border-radius: var(--radius);
  padding: 28px 20px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  border-top: 4px solid $primary-color;
  transition: transform var(--transition);

  &:hover { transform: translateY(-4px); }
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: $primary-color;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: $text-light;
  font-weight: 500;
}

.video-section {
  background: $bg-light;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
  .divider { margin: 16px auto; }
}

.video-wrapper {
  position: relative;
  max-width: 860px;
  margin: 0 auto;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.about-video {
  width: 100%;
  aspect-ratio: 834 / 480;
  display: block;
  object-fit: cover;
  background: #000;
}

.mission-section {
  background: $bg-dark;
  color: $white;
}

.mission-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  .section-title { color: $white; }
  .section-label { color: rgba(255,255,255,0.6); }
  .divider { margin: 16px auto 32px; background: $accent-color; }
}

.mission-quote {
  font-size: 20px;
  font-style: italic;
  color: rgba(255,255,255,0.85);
  line-height: 1.8;
  padding: 24px 32px;
  background: rgba(255,255,255,0.06);
  border-left: 4px solid $accent-color;
  border-radius: 0 var(--radius) var(--radius) 0;
  margin-bottom: 48px;
  text-align: left;
}

.mission-values {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  text-align: center;

  @include mobile {
    grid-template-columns: 1fr;
  }
}

.mission-value {
  padding: 24px;
  background: rgba(255,255,255,0.06);
  border-radius: var(--radius);

  &-icon { font-size: 36px; margin-bottom: 12px; }
  h4 { font-size: 16px; font-weight: 700; margin-bottom: 8px; color: $white; }
  p { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.6; }
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
  .divider { margin: 16px auto; }
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @include mobile {
    grid-template-columns: 1fr;
  }
}

.advantage-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: $white;
  padding: 24px;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  cursor: default;

  &-icon {
    font-size: 28px;
    flex-shrink: 0;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 102, 204, 0.08);
    border-radius: 50%;
  }

  h4 {
    font-size: 16px;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: $text-light;
    line-height: 1.6;
  }
}
</style>
