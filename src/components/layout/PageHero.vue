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
      <div class="page-hero-circuit"></div>
    </div>

    <!-- 内容 -->
    <div class="page-hero-content container">
      <div class="page-hero-text">
        <!-- 业务标签 -->
        <p class="page-hero-label">{{ label || 'Cobot Welding Solutions' }}</p>
        <!-- 主标题 -->
        <h1 class="page-hero-title">{{ title || 'Flexible Collaborative Welding Platform' }}</h1>
        <div class="page-hero-divider"></div>
        <!-- 副标题 -->
        <p v-if="subtitle" class="page-hero-subtitle">
          {{ subtitle || 'Empowering manufacturers with safe, precise, and efficient robotic welding technology.' }}
        </p>
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
  title: { type: String, default: '' },
  label: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  bgImage: { type: String, default: '' }, // 后续替换为焊接场景图片
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
  margin-top: calc(-1 * var(--navbar-height));

  @include mobile {
    min-height: 280px;
  }

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
