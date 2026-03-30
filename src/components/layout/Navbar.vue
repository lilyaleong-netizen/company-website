<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, 'menu-open': menuOpen, 'on-hero': isHeroPage }">
    <div class="navbar-inner">
      <!-- Logo -->
      <RouterLink to="/" class="navbar-logo">
        <img
          src="/logo.png"
          alt="[COMPANY_NAME] Logo"
          @error="onLogoError"
          ref="logoImg"
        />
      </RouterLink>

      <!-- Desktop Nav -->
      <ul class="navbar-links">
        <li v-for="item in navItems" :key="item.path">
          <RouterLink :to="item.path" class="navbar-link" @click="menuOpen = false">
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>

      <!-- Hamburger -->
      <button class="navbar-hamburger" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="drawer">
      <div v-if="menuOpen" class="navbar-drawer">
        <!-- Drawer Header -->
        <div class="navbar-drawer-header">
          <img src="/logo.png" alt="[COMPANY_NAME]" class="navbar-drawer-logo" />
          <button class="navbar-drawer-close" @click="menuOpen = false" aria-label="Close menu">
            <span></span><span></span>
          </button>
        </div>

        <!-- Nav Links -->
        <nav class="navbar-drawer-nav">
          <RouterLink
            v-for="(item, index) in navItems"
            :key="item.path"
            :to="item.path"
            class="navbar-drawer-link"
            :style="{ '--i': index }"
            @click="menuOpen = false"
          >
            <span class="navbar-drawer-link-text">{{ item.label }}</span>
            <svg class="navbar-drawer-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </RouterLink>
        </nav>

        <!-- Drawer Footer -->
        <div class="navbar-drawer-footer">
          <a href="mailto:[CONTACT_EMAIL]" class="navbar-drawer-contact">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            [CONTACT_EMAIL]
          </a>
          <p class="navbar-drawer-copy">© [YEAR] [COMPANY_NAME]</p>
        </div>
      </div>
    </Transition>

    <!-- Overlay -->
    <Transition name="overlay">
      <div v-if="menuOpen" class="navbar-overlay" @click="menuOpen = false"></div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const isScrolled = ref(false)
const menuOpen = ref(false)
const logoImg = ref(null)
const route = useRoute()

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/capability', label: 'Capability' },
  { path: '/blog', label: 'BLOG' },
  { path: '/contact', label: 'Contact' },
]

// 只有首页才允许完全透明（有全屏 Hero 图做背景）
// 其他页面的 PageHero 也有背景图，navbar 覆盖在上方保持透明即可
const isHeroPage = computed(() => route.path === '/')

const onLogoError = () => {
  if (logoImg.value) {
    logoImg.value.style.display = 'none'
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: var(--navbar-height);
  transition: all 0.35s ease;
  // 默认透明（所有有背景图的页面——首页 Hero 或内页 PageHero）
  background: transparent;

  &.scrolled {
    background: rgba(255, 255, 255, 0.97);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: var(--shadow-sm);
    height: 64px;

    .navbar-link {
      color: $text-dark;
      text-shadow: none;
      &:hover, &.router-link-active {
        color: $primary-color;
      }
    }
  }

  &-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    max-width: var(--wide, 1440px);
    margin: 0 auto;
    padding: 0 24px;
    box-sizing: border-box;
  }

  &-logo {
    display: flex;
    align-items: center;
    img {
      height: 44px;
      width: auto;
      object-fit: contain;
    }
  }

  &-links {
    display: flex;
    align-items: center;
    gap: 8px;

    @include mobile {
      display: none;
    }
  }

  &-link {
    padding: 8px 14px;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: $white;
    border-radius: var(--radius);
    transition: all var(--transition);
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);

    &:hover {
      color: $accent-color;
      background: rgba(255,255,255,0.1);
    }

    &.router-link-active {
      color: $accent-color;
      background: rgba(255,255,255,0.15);
    }
  }

  &-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 8px;
    margin-left: auto;
    flex-shrink: 0;

    @include mobile {
      display: flex;
    }

    span {
      display: block;
      width: 24px;
      height: 2px;
      background: $white;
      border-radius: 2px;
      transition: all 0.3s ease;
    }
  }

  &.scrolled .navbar-hamburger span,
  &.scrolled .navbar-hamburger span {
    background: $text-dark;
  }

  &.menu-open .navbar-hamburger {
    span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
  }

  &-drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background: linear-gradient(160deg, #0a1628 0%, #0d2347 60%, #0a1628 100%);
    box-shadow: -8px 0 40px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    z-index: 1001;
    overflow: hidden;
  }

  &-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    height: var(--navbar-height);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    flex-shrink: 0;
  }

  &-drawer-logo {
    height: 36px;
    width: auto;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    padding: 4px 8px;
  }

  &-drawer-close {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    flex-shrink: 0;
    transition: background var(--transition);

    &:hover { background: rgba(255, 255, 255, 0.15); }

    span {
      position: absolute;
      width: 16px;
      height: 1.5px;
      background: $white;
      border-radius: 1px;
      &:nth-child(1) { transform: rotate(45deg); }
      &:nth-child(2) { transform: rotate(-45deg); }
    }
  }

  &-drawer-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px 0;
    overflow-y: auto;
  }

  &-drawer-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 28px;
    font-weight: 600;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.7);
    border-left: 3px solid transparent;
    transition: all 0.25s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 28px;
      right: 28px;
      height: 1px;
      background: rgba(255, 255, 255, 0.06);
    }

    &-arrow {
      width: 16px;
      height: 16px;
      opacity: 0;
      transform: translateX(-6px);
      transition: all 0.25s ease;
      flex-shrink: 0;
    }

    &:hover,
    &.router-link-active {
      color: $white;
      border-left-color: $primary-color;
      background: rgba(255, 255, 255, 0.05);
      padding-left: 32px;

      .navbar-drawer-link-arrow {
        opacity: 1;
        transform: translateX(0);
      }
    }

    &.router-link-active {
      color: $white;
      border-left-color: $accent-color;
      background: rgba(255, 255, 255, 0.08);
    }
  }

  &-drawer-footer {
    padding: 20px 28px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    flex-shrink: 0;
  }

  &-drawer-contact {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 10px;
    transition: color var(--transition);
    word-break: break-all;

    svg { width: 14px; height: 14px; flex-shrink: 0; color: $primary-color; }
    &:hover { color: rgba(255, 255, 255, 0.8); }
  }

  &-drawer-copy {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.25);
  }

  &-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 1000;
  }
}

.drawer-enter-active, .drawer-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-enter-from, .drawer-leave-to {
  transform: translateX(100%);
}

.overlay-enter-active, .overlay-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-enter-from, .overlay-leave-to {
  opacity: 0;
}
</style>
