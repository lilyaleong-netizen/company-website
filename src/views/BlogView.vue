<template>
  <div class="blog-page">
    <PageHero
      title="Industry Blog"
      label="Insights & Tips"
      subtitle="Technical articles, best practices, and industry insights."
      bg-image="/page-hero-bg.jpg"
    />

    <section class="section">
      <div class="container">
        <!-- Category Filter -->
        <div class="blog-filter" v-scroll-animate>
          <button
            v-for="cat in categories"
            :key="cat"
            class="filter-btn"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Grid -->
        <div class="blog-grid">
          <RouterLink
            v-for="(post, index) in filteredPosts"
            :key="post.id"
            :to="`/blog/${post.slug}`"
            class="blog-card hover-lift"
            v-scroll-animate="{ delay: index * 100 }"
          >
            <div class="blog-card-img">
              <img :src="post.image" :alt="post.title" loading="lazy" />
              <span class="blog-card-category">{{ post.category }}</span>
            </div>
            <div class="blog-card-body">
              <p class="blog-card-date">{{ formatDate(post.date) }}</p>
              <h3 class="blog-card-title">{{ post.title }}</h3>
              <p class="blog-card-excerpt">{{ post.excerpt }}</p>
              <span class="blog-card-link">
                Read More
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { blogPosts } from '@/data/blogPosts.js'
import PageHero from '@/components/layout/PageHero.vue'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { useBreadcrumbSchema } from '@/composables/useStructuredData'

useSeoMeta({
  title: 'Blog — Tips & Insights',
  description: '[BLOG_SEO_DESC] — Replace with your blog page SEO description.',
  path: '/blog',
})
useBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }])

const activeCategory = ref('All')
const categories = computed(() => ['All', ...new Set(blogPosts.map(p => p.category))])
const filteredPosts = computed(() =>
  activeCategory.value === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory.value)
)

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';


.blog-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
}

.filter-btn {
  padding: 8px 20px;
  border: 2px solid #dde2e9;
  background: $white;
  color: $text-light;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition);

  &:hover, &.active {
    border-color: $primary-color;
    background: $primary-color;
    color: $white;
  }
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @include tablet { grid-template-columns: repeat(2, 1fr); }
  @include mobile { grid-template-columns: 1fr; }
}

.blog-card {
  display: flex;
  flex-direction: column;
  background: $white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: inherit;
  border: 1px solid #eee;

  &-img {
    position: relative;
    height: 220px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    &:hover img { transform: scale(1.05); }
  }

  &-category {
    position: absolute;
    top: 14px;
    left: 14px;
    background: $primary-color;
    color: $white;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &-body {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &-date {
    font-size: 12px;
    color: $text-light;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &-title {
    font-size: 17px;
    font-weight: 700;
    color: $text-dark;
    line-height: 1.4;
    margin-bottom: 12px;
    transition: color var(--transition);
  }

  &:hover &-title { color: $primary-color; }

  &-excerpt {
    font-size: 14px;
    color: $text-light;
    line-height: 1.7;
    flex: 1;
    margin-bottom: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: $primary-color;
    font-weight: 600;
    font-size: 14px;
    margin-top: auto;
    transition: gap var(--transition);

    svg { width: 16px; height: 16px; }
    &:hover { gap: 10px; }
  }
}
</style>
