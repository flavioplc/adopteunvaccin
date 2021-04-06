<template>
  <div>
    <hero />
    <population-features />
    <teasers />
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import PopulationFeatures from '@/components/PopulationFeatures'
import CallToAction from '@/components/CallToAction'

export default {
  name: 'LandingPage',
  components: {
    hero: Hero,
    'population-features': PopulationFeatures,
    'call-to-action': CallToAction
  }
}
</script>
