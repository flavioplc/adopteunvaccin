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
        headline="Inscription des volontaires"
        content="En tant que volontaire pour la vaccination, vous renseignez vos informations de contact, vos disponibilités en semaine ainsi que votre centre de vaccination priviliégié"
      >
        <img src="~assets/img/subscribe.svg?inline" alt slot="svg" />
      </feature-right>
      <feature-left
        headline="Consultation du répertoire"
        content="Les professionnels de santé, pharmaciens, sage-femmes et médecins, pratiquant la vaccination contre le COVID 19, peuvent s'inscrire et consulter le répertoire des volontaires et ainsi distribuer des doses non consommées lors de désistements. Ils pourront choisir parmi les inscrits en fonction du lieu préféré ainsi que des disponibilités des volontaires"
      >
        <img src="~assets/img/doctors.svg?inline" alt slot="svg" />
      </feature-left>
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
  }
}
</script>
