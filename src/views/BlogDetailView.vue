<template>
  <div class="blog-detail-page">
    <PageHero
      v-if="post"
      :title="post.title"
      :label="post.category"
      :subtitle="formatDate(post.date)"
      bg-image="/page-hero-bg.jpg"
    />

    <section class="section" v-if="post">
      <div class="container">
        <div class="post-layout">
          <!-- Main Content -->
          <article class="post-content">
            <div class="post-cover">
              <img :src="post.image" :alt="post.title" loading="lazy" />
            </div>
            <div class="post-body" v-html="post.content"></div>

            <div class="post-tags">
              <span class="tag" v-for="tag in ['[TAG_1]', '[TAG_2]', '[TAG_3]', post.category]" :key="tag">
                #{{ tag }}
              </span>
            </div>

            <div class="post-nav">
              <RouterLink to="/blog" class="btn btn-outline">← Back to Blog</RouterLink>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="post-sidebar">
            <div class="sidebar-widget">
              <h3 class="sidebar-widget-title">Recent Posts</h3>
              <div class="recent-posts">
                <RouterLink
                  v-for="p in otherPosts"
                  :key="p.id"
                  :to="`/blog/${p.slug}`"
                  class="recent-post"
                >
                  <img :src="p.image" :alt="p.title" />
                  <div>
                    <p class="recent-post-title">{{ p.title }}</p>
                    <p class="recent-post-date">{{ formatDate(p.date) }}</p>
                  </div>
                </RouterLink>
              </div>
            </div>

            <div class="sidebar-widget">
              <h3 class="sidebar-widget-title">Contact Us</h3>
              <p style="font-size: 14px; color: var(--text-light); margin-bottom: 16px; line-height: 1.7;">
                Need help with your project? Our experts are ready to assist.
              </p>
              <RouterLink to="/contact" class="btn btn-primary" style="width: 100%; justify-content: center;">
                Get a Free Quote
              </RouterLink>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <div v-else class="not-found section">
      <div class="container" style="text-align: center;">
        <h2>Post not found</h2>
        <RouterLink to="/blog" class="btn btn-primary" style="margin-top: 20px;">Back to Blog</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@/components/layout/PageHero.vue'
import { blogPosts } from '@/data/blogPosts.js'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { useArticleSchema, useBreadcrumbSchema } from '@/composables/useStructuredData'

const route = useRoute()
const post = computed(() => blogPosts.find(p => p.slug === route.params.slug))
const otherPosts = computed(() => blogPosts.filter(p => p.slug !== route.params.slug).slice(0, 3))

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// 动态注入文章 meta（SSG 预渲染时每篇文章各自生成）
if (post.value) {
  useSeoMeta({
    title: post.value.title,
    description: post.value.excerpt,
    path: `/blog/${post.value.slug}`,
    ogImage: post.value.image,
    ogType: 'article',
    article: {
      publishedTime: post.value.date,
      author: '[COMPANY_NAME]',
      section: post.value.category,
    },
  })
  useArticleSchema({
    title: post.value.title,
    description: post.value.excerpt,
    publishedDate: post.value.date,
    image: post.value.image,
    url: `https://[SITE_DOMAIN]/blog/${post.value.slug}`,
  })
  useBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.value.title, url: `/blog/${post.value.slug}` },
  ])
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';


.post-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  align-items: start;

  @include tablet {
    grid-template-columns: 1fr;
  }
}

.post-content {
  background: $white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.post-cover {
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.post-body {
  padding: 36px;
  font-size: 16px;
  line-height: 1.85;
  color: $text-dark;

  :deep(h2) {
    font-size: 24px;
    font-weight: 700;
    color: $primary-color;
    margin: 28px 0 16px;
  }

  :deep(p) { margin-bottom: 16px; color: $text-light; }

  :deep(ul) {
    padding-left: 20px;
    margin-bottom: 16px;

    li {
      margin-bottom: 8px;
      color: $text-light;
    }
  }
}

.post-tags {
  padding: 20px 36px;
  border-top: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background: $bg-light;
  border-radius: 12px;
  font-size: 13px;
  color: $text-light;
  cursor: default;
}

.post-nav {
  padding: 20px 36px;
  border-top: 1px solid #eee;
}

.sidebar-widget {
  background: $white;
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;

  &-title {
    font-size: 16px;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid $primary-color;
  }
}

.recent-posts {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.recent-post {
  display: flex;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  transition: all var(--transition);

  img {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: var(--radius);
    flex-shrink: 0;
  }

  &-title {
    font-size: 13px;
    font-weight: 600;
    color: $text-dark;
    line-height: 1.4;
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color var(--transition);
  }

  &-date { font-size: 12px; color: $text-light; }

  &:hover .recent-post-title { color: $primary-color; }
}
</style>
