<template>
  <div class="home">
    <HeroBanner />
    <WhoWeAre />
    <ServiceCards />
    <Testimonials />
    <Certifications />
    <BottomCTA />
  </div>
</template>

<script setup>
import HeroBanner from '@/components/home/HeroBanner.vue'
import WhoWeAre from '@/components/home/WhoWeAre.vue'
import ServiceCards from '@/components/home/ServiceCards.vue'
import Testimonials from '@/components/home/Testimonials.vue'
import Certifications from '@/components/home/Certifications.vue'
import BottomCTA from '@/components/home/BottomCTA.vue'
import { useSeoMeta } from '@/composables/useSeoMeta'

useSeoMeta({
  title: 'Yeld Tech | Professional mobile welding Solutions',
  description: 'Yeld Tech provides advanced cobot welding platforms featuring mobile welding systems, no programming required, and true plug-and-play operation—designed to simplify automation.',
  path: '/',
  ogType: 'website',
})
</script>
