<template>
  <section class="bg-white border-b py-8">
    <div class="container max-w-5xl mx-auto m-8">
      <h1
        class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
      >
        Comment ça marche ?
      </h1>
      <div class="w-full mb-4">
        <div
          class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
        ></div>
      </div>
      <feature-right
        headline="Inscription sur la plateforme"
        content="En tant que professionnel de santé, pharmacien, sage-femme, médecin, vous pouvez vous inscrire pour accéder au répertoire des volontaires pour la vaccination. Renseignez vos informations de contact ainsi que votre numéro RPPS et également une photo de votre carte professionnel à des fins de confirmation de votre identité."
      >
        <img src="~assets/img/subscribe.svg?inline" alt slot="svg" />
      </feature-right>
      <feature-left
        headline="Consultation du répertoire"
        content="En cas de désistements, surplus de stocks de vaccin, vous pouvez rechercher dans le répertoire des volontaires par critère géographique"
      >
        <img src="~assets/img/doctors.svg?inline" alt slot="svg" />
      </feature-left>

              <button
          class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
           v-on:click="contact"
        >
          S'inscrire en tant que professionnel de santé
        </button>
    </div>
  </section>
</template>

<script>
import FeatureRight from '@/components/FeatureRight'
import FeatureLeft from '@/components/FeatureLeft'

export default {
  name: 'Features',
  components: {
    'feature-right': FeatureRight,
    'feature-left': FeatureLeft
  },
  methods: {
  contact() {
    this.$router.push({
    path: "/medics-subscription"
  });
}

  }
}
</script>
