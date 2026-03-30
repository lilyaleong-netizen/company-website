<template>
  <section class="who-we-are section">
    <div class="container">
      <div class="who-we-are-grid">
        <!-- Left Text -->
        <div class="who-we-are-text" v-scroll-animate>
          <p class="section-label">Our Company</p>
          <h2 class="section-title">who we are</h2>
          <div class="divider"></div>
          <p class="who-we-are-desc">
            [WHO_WE_ARE_DESC_1] — Replace with your company introduction.
          </p>
          <p class="who-we-are-desc">
            [WHO_WE_ARE_DESC_2] — Replace with your industries and client description.
          </p>
          <p class="who-we-are-desc">
            [WHO_WE_ARE_DESC_3] — Replace with your experience highlight.
          </p>

          <!-- Brands -->
          <div class="who-we-are-brands">
            <p class="who-we-are-brands-label">Trusted Component Partners</p>
            <div class="who-we-are-brands-grid">
              <span v-for="brand in brands" :key="brand" class="brand-tag">{{ brand }}</span>
            </div>
          </div>

          <RouterLink to="/about" class="btn btn-primary" style="margin-top: 28px;">
            Learn More About Us
          </RouterLink>
        </div>

        <!-- Right Image -->
        <div class="who-we-are-image" v-scroll-animate="{ direction: 'right', delay: 200 }">
          <div class="image-frame">
            <img
              src="/images/who-we-are-real.jpg"
              alt="[COMPANY_NAME] Products"
              loading="lazy"
            />
            <div class="image-badge">
              <span class="badge-number">15+</span>
              <span class="badge-text">Years of<br/>Experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const brands = [
  '[PARTNER_1]', '[PARTNER_2]', '[PARTNER_3]', '[PARTNER_4]', '[PARTNER_5]', '[PARTNER_6]',
  '[PARTNER_7]', '[PARTNER_8]', '[PARTNER_9]', '[PARTNER_10]', '[PARTNER_11]', '[PARTNER_12]'
]
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.who-we-are {
  background: $white;

  &-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;

    @include tablet {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  &-desc {
    color: $text-light;
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 16px;
  }

  &-brands {
    margin-top: 24px;
    padding: 20px;
    background: $bg-light;
    border-radius: var(--radius);
    border-left: 4px solid $primary-color;
  }

  &-brands-label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: $text-light;
    margin-bottom: 12px;
  }

  &-brands-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}

.brand-tag {
  display: inline-block;
  padding: 4px 10px;
  background: $white;
  border: 1px solid #dde2e9;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: $text-dark;
  transition: all var(--transition);

  &:hover {
    border-color: $primary-color;
    color: $primary-color;
    background: rgba(0, 102, 204, 0.05);
  }
}

.image-frame {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: visible;

  img {
    width: 100%;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
  }
}

.image-badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: $accent-color;
  color: $white;
  padding: 20px 24px;
  border-radius: var(--radius);
  text-align: center;
  box-shadow: var(--shadow-md);

  @include mobile {
    right: 10px;
    bottom: 10px;
  }
}

.badge-number {
  display: block;
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
}

.badge-text {
  font-size: 13px;
  opacity: 0.9;
  line-height: 1.4;
}
</style>
