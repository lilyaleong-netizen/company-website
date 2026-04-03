<template>
  <section class="bottom-cta">
    <div class="bottom-cta-bg"></div>
    <div class="container">
      <div class="bottom-cta-content" v-scroll-animate>
        <!-- 业务标签 -->
        <p class="bottom-cta-eyebrow">Get In Touch</p>
        <!-- 主标题 -->
        <h2 class="bottom-cta-title">Connect with Our Cobot Welding Experts</h2>
        <!-- 描述文本 -->
        <p class="bottom-cta-text">
          Learn how our collaborative welding platforms can boost flexibility, precision, and efficiency in your production line.
          Experience the future of robotic welding today.
        </p>
        <!-- 按钮 -->
        <div class="bottom-cta-actions">
          <RouterLink to="/contact" class="btn btn-accent">Contact Us</RouterLink>
          <RouterLink to="/services" class="btn btn-outline-light">View Solutions</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.bottom-cta {
  position: relative;
  padding: 80px 0;
  overflow: hidden;
  background: linear-gradient(135deg, #080c12 0%, #0d1828 60%, #060a12 100%);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 130px;
    background: linear-gradient(to top, #1A1A2E 0%, transparent 100%);
    z-index: 2;
    pointer-events: none;
  }

  &-bg {
    position: absolute;
    inset: 0;
    /* 后续替换为焊接场景图 */
    background-image: url('/images/cta-welding.jpg');
    background-size: cover;
    background-position: center;
    opacity: 0.45;
  }

  &-content {
    position: relative;
    z-index: 3;
    text-align: center;
    color: $white;
    max-width: 700px;
    margin: 0 auto;
  }

  &-eyebrow {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: rgba(255,255,255,0.7);
    margin-bottom: 16px;
  }

  &-title {
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 700;
    margin-bottom: 16px;
  }

  &-text {
    font-size: 17px;
    color: rgba(255,255,255,0.85);
    line-height: 1.7;
    margin-bottom: 36px;
  }

  &-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
}

.btn-outline-light {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border: 2px solid rgba(255,255,255,0.6);
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
