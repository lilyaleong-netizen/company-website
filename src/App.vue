<template>
  <div id="app">
    <Navbar />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import { useOrganizationSchema } from './composables/useStructuredData'

// 全站结构化数据（Organization）注入一次
useOrganizationSchema()
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
  padding-top: var(--navbar-height);
  /* 建立独立堆叠上下文，防止内部元素的 z-index 与 navbar 竞争 */
  isolation: isolate;
}
</style>
