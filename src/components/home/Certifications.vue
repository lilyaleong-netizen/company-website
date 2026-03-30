<template>
  <section class="certifications section">
    <div class="container">
      <div class="section-header" v-scroll-animate>
        <p class="section-label">Quality Assured</p>
        <h2 class="section-title">what <span>CERTIFICATIONS</span> DO WE HAVE</h2>
        <div class="divider divider-center"></div>
        <p class="section-subtitle" style="margin: 0 auto;">
          Our manufacturing processes are certified to the highest international standards,
          ensuring consistent quality and reliability.
        </p>
      </div>

      <div class="cert-grid" v-scroll-animate>
        <div v-for="cert in certs" :key="cert.name" class="cert-item">
          <img :src="cert.img" :alt="cert.name" class="cert-item-img" loading="lazy" />
          <span class="cert-item-name">{{ cert.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const certs = [
  { name: 'RoHS Compliant',  img: '/images/cert-1.webp' },
  { name: 'REACH Compliant', img: '/images/cert-2.webp' },
  { name: 'IPC Member',      img: '/images/cert-3.webp' },
  { name: 'ISO 9001:2015',   img: '/images/cert-4.webp' },
  { name: 'ISO 14001',       img: '/images/cert-5.webp' },
  { name: 'ISO 13485:2016',  img: '/images/cert-6.webp' },
]
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.certifications {
  background: $white;

  .section-header {
    text-align: center;
    margin-bottom: 48px;
    .divider { margin: 16px auto 24px; }
  }
}

.cert-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
}

.cert-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 20px 16px;
  border-radius: var(--radius-lg);
  cursor: default;
  transition: box-shadow var(--transition), transform var(--transition);

  &:hover {
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }

  &-img {
    width: 130px;
    height: 130px;
    object-fit: contain;
  }

  &-name {
    font-size: 13px;
    font-weight: 600;
    color: $text-light;
    text-align: center;
    letter-spacing: 0.3px;
  }
}
</style>
