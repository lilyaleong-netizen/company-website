<template>
  <section class="hero">
    <!-- Slides -->
    <div class="hero-slides">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="hero-slide"
        :class="{ active: currentIndex === index }"
        :style="slide.bg ? { background: slide.bg } : {}"
      >
        <img v-if="slide.img" :src="slide.img" :alt="slide.alt" class="hero-slide-img" />
        <div v-else class="hero-slide-fallback" :style="{ background: slide.fallbackBg }"></div>
      </div>
    </div>

    <!-- Overlay -->
    <div class="hero-overlay"></div>

    <!-- Content -->
    <div class="hero-content container">
      <div class="hero-text">
        <p class="hero-label">[HERO_LABEL]</p>
        <h1 class="hero-title">[HERO_TITLE]</h1>
        <p class="hero-subtitle">[HERO_SUBTITLE]</p>
        <div class="hero-actions">
          <RouterLink to="/contact" class="btn btn-accent">Get a Free Quote</RouterLink>
          <RouterLink to="/services" class="btn btn-outline-white">Our Services</RouterLink>
        </div>
      </div>
    </div>

    <!-- Arrows -->
    <button class="hero-arrow hero-arrow-prev" @click="prev" aria-label="Previous">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15,18 9,12 15,6"/></svg>
    </button>
    <button class="hero-arrow hero-arrow-next" @click="next" aria-label="Next">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9,18 15,12 9,6"/></svg>
    </button>

    <!-- Dots -->
    <div class="hero-dots">
      <button
        v-for="(_, i) in slides"
        :key="i"
        class="hero-dot"
        :class="{ active: currentIndex === i }"
        @click="goTo(i)"
        :aria-label="`Slide ${i + 1}`"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const slides = ref([
  {
    img: '/images/hero-slide-1.jpg',
    alt: '[SLIDE_1_ALT]',
    fallbackBg: 'linear-gradient(135deg, #0066CC 0%, #004499 100%)'
  },
  {
    img: '/images/hero-slide-2.jpg',
    alt: '[SLIDE_2_ALT]',
    fallbackBg: 'linear-gradient(135deg, #004499 0%, #1A1A2E 100%)'
  },
  {
    img: '/images/hero-slide-3.jpg',
    alt: '[SLIDE_3_ALT]',
    fallbackBg: 'linear-gradient(135deg, #1A1A2E 0%, #0066CC 100%)'
  }
])

const currentIndex = ref(0)
let timer = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}
const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
}
const goTo = (i) => {
  currentIndex.value = i
}

const startTimer = () => {
  timer = setInterval(next, 4500)
}
const stopTimer = () => clearInterval(timer)

onMounted(startTimer)
onUnmounted(stopTimer)
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  margin-top: calc(-1 * var(--navbar-height));

  &-slides {
    position: absolute;
    inset: 0;
  }

  &-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 1s ease-in-out;

    &.active { opacity: 1; }

    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-fallback {
      width: 100%;
      height: 100%;
    }
  }

  &-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 30, 80, 0.7) 0%,
      rgba(0, 50, 120, 0.5) 50%,
      rgba(0, 30, 80, 0.65) 100%
    );
    z-index: 1;
  }

  &-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &-text {
    max-width: 680px;
    color: $white;
    animation: fadeInUp 0.9s ease-out both;
  }

  &-label {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: $accent-color;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;

    &::before {
      content: '';
      display: inline-block;
      width: 30px;
      height: 2px;
      background: $accent-color;
    }
  }

  &-title {
    font-size: clamp(32px, 5vw, 58px);
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 20px;
    text-shadow: 0 2px 20px rgba(0,0,0,0.3);
  }

  &-subtitle {
    font-size: 18px;
    color: rgba(255,255,255,0.85);
    margin-bottom: 36px;
    line-height: 1.6;
  }

  &-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  &-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3);
    color: $white;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(4px);

    svg { width: 22px; height: 22px; }

    &:hover {
      background: rgba(0, 102, 204, 0.7);
      border-color: transparent;
    }

    &-prev { left: 24px; }
    &-next { right: 24px; }

    @include mobile {
      width: 40px;
      height: 40px;
      svg { width: 18px; height: 18px; }
    }
  }

  &-dots {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    display: flex;
    gap: 10px;
  }

  &-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: $accent-color;
      transform: scale(1.3);
    }
  }
}

.btn-outline-white {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border: 2px solid rgba(255,255,255,0.7);
  color: $white;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: rgba(255,255,255,0.15);
    border-color: $white;
  }
}
</style>
