<template>
  <footer class="bg-white">
    <div class="container mx-auto px-8">
      <div class="w-full flex flex-col md:flex-row py-6">
        <div class="flex-1 mb-6">
          <logo />
        </div>
        <p class="no-underline text-gray-800">
          Created by: &nbsp;
        </p> 
        <a
                href="https://twitter.com/flaviopalacin"
                class="no-underline hover:underline text-gray-800 hover:text-blue-500"
                >  Flavio Palacin</a>
        </div>
      </div>
  </footer>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  name: 'TheFooter',
  components: {
    logo: Logo
  }
}
</script>
