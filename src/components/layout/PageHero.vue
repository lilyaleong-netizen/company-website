<template>
  <section class="page-hero">
    <!-- 背景图层 -->
    <div class="page-hero-bg">
      <img
        v-if="bgImage"
        :src="bgImage"
        :alt="title"
        class="page-hero-bg-img"
      />
      <div class="page-hero-overlay"></div>
      <!-- 电路板纹理 SVG 图案 -->
      <div class="page-hero-circuit"></div>
    </div>

    <!-- 内容 -->
    <div class="page-hero-content container">
      <div class="page-hero-text">
        <p class="page-hero-label">{{ label || '[COMPANY_NAME]' }}</p>
        <h1 class="page-hero-title">{{ title }}</h1>
        <div class="page-hero-divider"></div>
        <p v-if="subtitle" class="page-hero-subtitle">{{ subtitle }}</p>
      </div>
    </div>

    <!-- 底部波浪 -->
    <div class="page-hero-wave">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--wave-fill, #fff)" />
      </svg>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  label: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  bgImage: { type: String, default: '' },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.page-hero {
  position: relative;
  min-height: 340px;
  display: flex;
  align-items: center;
  overflow: hidden;
  // 向上延伸覆盖 navbar（与 HeroBanner 相同原理）
  margin-top: calc(-1 * var(--navbar-height));

  @include mobile {
    min-height: 280px;
  }

  // ── 背景 ──
  &-bg {
    position: absolute;
    inset: 0;
  }

  &-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 40%;
    filter: brightness(0.5) saturate(1.1);
  }

  &-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(0, 15, 50, 0.88) 0%,
      rgba(0, 40, 100, 0.72) 50%,
      rgba(0, 20, 60, 0.80) 100%
    );
  }

  // 电路板纹理（纯 CSS）
  &-circuit {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0, 150, 255, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 150, 255, 0.06) 1px, transparent 1px),
      radial-gradient(circle at 20% 30%, rgba(0, 180, 255, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(0, 102, 204, 0.10) 0%, transparent 45%);
    background-size: 48px 48px, 48px 48px, 100% 100%, 100% 100%;
    mask-image: linear-gradient(to bottom, transparent, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.6) 70%, transparent);
  }

  // ── 内容 ──
  &-content {
    position: relative;
    z-index: 2;
    padding-top: var(--navbar-height);
    width: 100%;
  }

  &-text {
    max-width: 700px;
  }

  &-label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: rgba(255, 255, 255, 0.60);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;

    &::before {
      content: '';
      display: inline-block;
      width: 24px;
      height: 2px;
      background: $accent-color;
      border-radius: 1px;
    }
  }

  &-title {
    font-size: clamp(26px, 4vw, 44px);
    font-weight: 700;
    color: $white;
    line-height: 1.2;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
  }

  &-divider {
    width: 48px;
    height: 3px;
    background: $accent-color;
    border-radius: 2px;
    margin: 16px 0;
  }

  &-subtitle {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.6;
    max-width: 560px;
  }

  // ── 底部波浪 ──
  &-wave {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 48px;
    z-index: 3;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
