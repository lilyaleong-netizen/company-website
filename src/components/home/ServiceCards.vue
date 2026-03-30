<template>
  <section class="services section" style="background: var(--bg-light);">
    <div class="container">
      <div class="section-header" v-scroll-animate>
        <p class="section-label">Our Expertise</p>
        <h2 class="section-title">what do we offer</h2>
        <div class="divider"></div>
        <p class="section-subtitle">
          [SERVICES_SECTION_DESC] — Replace with a brief description of your service offerings.
        </p>
      </div>

      <div class="services-grid">
        <div
          v-for="(card, index) in cards"
          :key="card.title"
          class="service-card hover-lift"
          v-scroll-animate="{ delay: index * 120 }"
        >
          <div class="service-card-img-wrap">
            <img :src="card.image" :alt="card.title" loading="lazy" />
            <div class="service-card-icon">{{ card.icon }}</div>
          </div>
          <div class="service-card-body">
            <h3 class="service-card-title">{{ card.title }}</h3>
            <ul class="service-card-list">
              <li v-for="item in card.items" :key="item">{{ item }}</li>
            </ul>
            <RouterLink to="/services" class="service-card-link">
              Learn More
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  {
    title: '[SERVICE_CARD_1_TITLE]',
    icon: '📦',
    image: '/images/service-card-1.webp',
    items: [
      '[Feature 1]',
      '[Feature 2]',
      '[Feature 3]',
      '[Feature 4]',
      '[Feature 5]',
    ]
  },
  {
    title: '[SERVICE_CARD_2_TITLE]',
    icon: '⚡',
    image: '/images/service-card-2.webp',
    items: [
      '[Feature 1]',
      '[Feature 2]',
      '[Feature 3]',
      '[Feature 4]',
      '[Feature 5]',
    ]
  },
  {
    title: '[SERVICE_CARD_3_TITLE]',
    icon: '🔧',
    image: '/images/service-card-3.webp',
    items: [
      '[Feature 1]',
      '[Feature 2]',
      '[Feature 3]',
      '[Feature 4]',
      '[Feature 5]',
    ]
  },
  {
    title: '[SERVICE_CARD_4_TITLE]',
    icon: '🚀',
    image: '/images/service-card-4.webp',
    items: [
      '[Feature 1]',
      '[Feature 2]',
      '[Feature 3]',
      '[Feature 4]',
      '[Feature 5]',
    ]
  }
]
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.section-header {
  text-align: center;
  margin-bottom: 48px;

  .section-subtitle {
    margin: 0 auto;
  }

  .divider {
    margin: 16px auto 24px;
  }
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }
  @include mobile {
    grid-template-columns: 1fr;
  }
}

.service-card {
  background: $white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;

  &-img-wrap {
    position: relative;
    height: 180px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.08);
    }
  }

  &-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255,255,255,0.95);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: var(--shadow-sm);
  }

  &-body {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &-title {
    font-size: 19px;
    font-weight: 700;
    color: $primary-color;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid $bg-light;
  }

  &-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;

    li {
      font-size: 14px;
      color: $text-light;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      line-height: 1.5;

      &::before {
        content: '✓';
        color: $secondary-color;
        font-weight: 700;
        flex-shrink: 0;
        margin-top: 1px;
      }
    }
  }

  &-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: $primary-color;
    font-weight: 600;
    font-size: 14px;
    transition: all var(--transition);
    margin-top: auto;

    svg { width: 16px; height: 16px; transition: transform var(--transition); }

    &:hover {
      color: $accent-color;
      svg { transform: translateX(4px); }
    }
  }
}
</style>
