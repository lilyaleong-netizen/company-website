<template>
  <section class="testimonials section">
    <div class="container">
      <div class="section-header" v-scroll-animate>
        <p class="section-label">Client Feedback</p>
        <h2 class="section-title">what <span>CLIENTS SAY</span> ABOUT US</h2>
        <div class="divider divider-center"></div>
      </div>
    </div>

    <!-- 无缝滚动轨道（不受 container 宽度限制） -->
    <div class="testimonials-track-wrapper">
      <div class="testimonials-track">
        <!-- 复制两份实现无缝循环 -->
        <div
          v-for="(item, index) in [...testimonials, ...testimonials]"
          :key="`${item.id}-${index}`"
          class="testimonial-card"
        >
          <div class="testimonial-card-quote">"</div>
          <p class="testimonial-card-text">{{ item.text }}</p>
          <div class="testimonial-card-stars">
            <template v-for="n in 5" :key="n">
              <!-- 满星 -->
              <svg v-if="n <= Math.floor(item.rating ?? 5)" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <!-- 半星 -->
              <span
                v-else-if="n === Math.ceil(item.rating ?? 5) && (item.rating ?? 5) % 1 !== 0"
                class="star-half"
              >
                <svg style="position:absolute;left:0;top:0;clip-path:inset(0 50% 0 0)" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <svg style="position:absolute;left:0;top:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </span>
              <!-- 空星 -->
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </template>
          </div>
          <div class="testimonial-card-author">
            <img
              v-if="item.avatar"
              :src="item.avatar"
              :alt="item.name"
              class="testimonial-card-avatar"
            />
            <div
              v-else
              class="testimonial-card-avatar testimonial-card-avatar-initial"
              :style="{ background: item.color || '#0066CC' }"
            >
              {{ item.name.charAt(0) }}
            </div>
            <div>
              <p class="testimonial-card-name">{{ item.name }}</p>
              <p class="testimonial-card-title">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { testimonials } from '@/data/testimonials.js'
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.testimonials {
  background: $bg-light;
  overflow: hidden;

  .section-header {
    text-align: center;
    margin-bottom: 48px;
    .divider { margin: 16px auto 0; }
  }
}

/* 轨道容器：两侧渐隐遮罩 */
.testimonials-track-wrapper {
  position: relative;
  overflow: hidden;
  padding: 12px 0 24px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 120px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, $bg-light 0%, transparent 100%);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, $bg-light 0%, transparent 100%);
  }
}

/* 滚动轨道 */
.testimonials-track {
  display: flex;
  gap: 24px;
  width: max-content;
  animation: scroll-left 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
}

@keyframes scroll-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* 单张卡片 */
.testimonial-card {
  width: 320px;
  flex-shrink: 0;
  background: $white;
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: box-shadow var(--transition), transform var(--transition);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-4px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, $primary-color, $secondary-color);
  }

  &-quote {
    font-size: 60px;
    line-height: 0.8;
    color: $primary-color;
    opacity: 0.15;
    font-family: Georgia, serif;
    font-weight: 700;
    margin-bottom: 8px;
  }

  &-text {
    font-size: 14px;
    color: $text-light;
    line-height: 1.8;
    flex: 1;
    margin-bottom: 16px;
    font-style: italic;
  }

  &-stars {
    display: flex;
    gap: 3px;
    margin-bottom: 16px;

    svg {
      width: 16px;
      height: 16px;
      color: #FFB800;
    }

    .star-half {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: #FFB800;

      svg {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }

  &-author {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid $bg-light;
  }

  &-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid $bg-light;
    flex-shrink: 0;

    &-initial {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }
  }

  &-name {
    font-weight: 700;
    font-size: 15px;
    color: $text-dark;
  }

  &-title {
    font-size: 13px;
    color: $text-light;
    margin-top: 2px;
  }
}
</style>
