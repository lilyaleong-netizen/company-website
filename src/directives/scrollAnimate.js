// v-scroll-animate directive — SSR-safe
export const scrollAnimate = {
  // SSR 服务端渲染时直接跳过（返回空对象即可）
  getSSRProps(binding) {
    return {}
  },

  mounted(el, binding) {
    const options = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }

    const delay = binding.value?.delay || 0
    const direction = binding.value?.direction || 'up'

    if (direction === 'left') {
      el.classList.add('scroll-animate-left')
    } else if (direction === 'right') {
      el.classList.add('scroll-animate-right')
    } else {
      el.classList.add('scroll-animate')
    }

    if (delay) {
      el.style.setProperty('--animate-delay', `${delay}ms`)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      })
    }, options)

    observer.observe(el)
    el._observer = observer
  },

  unmounted(el) {
    if (el._observer) {
      el._observer.disconnect()
    }
  }
}

export default scrollAnimate
