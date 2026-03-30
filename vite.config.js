import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import compression from 'vite-plugin-compression2'
import sitemap from 'vite-plugin-sitemap'
import { blogPosts } from './src/data/blogPosts.js'

const SITE_URL = 'https://[SITE_DOMAIN]'
const staticRoutes = ['/about', '/services', '/capability', '/blog', '/contact']
const blogRoutes = blogPosts.map(p => `/blog/${p.slug}`)
const dynamicRoutes = [...staticRoutes, ...blogRoutes]

export default defineConfig(({ command, isSsrBuild }) => ({
  plugins: [
    vue(),

    // Sitemap（仅 client build 时生成一次）
    !isSsrBuild && sitemap({
      hostname: SITE_URL,
      dynamicRoutes,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      generateRobotsTxt: false,  // 关掉它的自动生成
    }),

    // Gzip 压缩（仅 client build）
    !isSsrBuild && compression({
      algorithm: 'gzip',
      exclude: [/\.(png|jpe?g|gif|webp|svg|ico)$/],
      threshold: 1024,
    }),

    // Brotli 压缩（仅 client build）
    !isSsrBuild && compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(png|jpe?g|gif|webp|svg|ico)$/],
      threshold: 1024,
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'global-builtin', 'color-functions']
      }
    }
  },

  build: {
    rollupOptions: {
      output: isSsrBuild ? {} : {
        // 分包策略（仅 client）
        manualChunks: {
          'unhead': ['@unhead/vue'],
        }
      }
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    minify: 'esbuild',
    target: 'es2015',
  },

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes(paths) {
      return [...paths, ...dynamicRoutes]
    },
  },
}))
