import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import viteSSG from 'vite-ssg'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    
    Components({
      dirs: ['src/components'],
      dts: true
    }),
    VitePWA(),
    VueI18n({
      include: resolve(__dirname, 'src/locales/**'),
      runtimeOnly: false
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core'
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/store'],
      vueTemplate: true
    })
    // 我们已经在这里彻底移除了 sitemap 插件的所有相关代码
  ],

  // vite-ssg options
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    critters: {
      pruneSource: true
    }
  }
})
