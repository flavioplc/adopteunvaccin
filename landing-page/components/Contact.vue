<template>

<div class="bg-grey-lighter min-h-screen flex flex-col">
  <valid-modal v-if="displayModal" @closeModal="closeModal()" :success="this.success" :email_address="this.email_address" :error_message="this.error_message" />
            <div class="container max-w-l mx-auto flex-1 flex flex-col items-center justify-center px-1">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <div class="mt-10 sm:mt-0">
                <div class="md:grid md:grid-cols-3 md:gap-6">
                    <div class="md:col-span-1">
                      <div class="px-4 sm:px-0">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">Choisissez votre centre de vaccination</h3>
                        <p class="text-s font-s leading-4 text-gray-900 mt-4" > Agrandissez la carte jusqu'à ce que votre centre de vaccination apparaisse en rouge puis cliquez dessus pour le sélectionner</p>
                        <gmaps class="w-full h-full mt-4" @changeCenter="changeCenter($event)"/>
                      </div>
                    </div>
                    <div class="mt-5 md:mt-0 md:col-span-2">
                      <form v-on:submit.prevent="onSubmit">
                        <div class="shadow overflow-hidden sm:rounded-md">
                          <div class="px-4 py-5 bg-white sm:p-6">
                            <div class="grid grid-cols-6 gap-6">
                              <div class="col-span-6 sm:col-span-2">
                                <label for="first_name" class="block text-sm font-medium text-gray-700">Prénom</label>
                                <input type="text" v-model="first_name" id="first_name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                              </div>

                              <div class="col-span-6 sm:col-span-2">
                                <label for="last_name" class="block text-sm font-medium text-gray-700">Nom</label>
                                <input type="text" v-model="last_name" name="last_name" id="last_name" autocomplete="family-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                              </div>
                              
                              <div class="col-span-6 sm:col-span-2">
                                <label for="birth_date" class="block text-sm font-medium text-gray-700">Date de naissance</label>
                                <input type="date" v-model="birth_date" name="birth_date" id="birth_date" autocomplete="birth_date" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                              </div>

                              <div class="col-span-6 sm:col-span-3">
                                <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
                                <input type="phone" v-model="phone" name="phone" id="phone" autocomplete="phone" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label for="phone" class="block text-sm font-medium text-gray-700">Confirmation Téléphone</label>
                                <input type="phone" v-model="phone_confirmation" name="phone_confirmation" id="phone_comfirmation" autocomplete="phone" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                              </div>

                              <div class="col-span-6 sm:col-span-6">
                                <label for="email_address" class="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" v-model="email_address" name="email_address" id="email_address" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                              </div>

                              

                              <div class="col-span-6 sm:col-span-3">
                                <label for="weekavailability" class="block text-sm font-medium text-gray-700">Disponibilité en semaine (Du Lundi au Vendredi)</label>
                                <v-select :options="availability" v-model="weekavailability" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></v-select>

                              </div>

                              <div class="col-span-6 sm:col-span-3">
                                <label for="weekendavailability" class="block text-sm font-medium text-gray-700">Disponibilité le weekend (Samedi Dimanche)</label>
                                <v-select :options="availability" v-model="weekendavailability" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></v-select>
                              </div>

                              <div class="col-span-6 sm:col-span-6">
                                <label for="vaccinationCenter" class="block text-sm font-medium text-gray-700">Centre de Vaccination</label>
                                <input type="text" name="vaccinationCenter" id="vaccinationCenter" disabled="true" v-model="vaccination_center.name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                              </div>
                                <div class="col-span-6 sm:col-span-2">
                                <label class="block text-sm font-medium text-gray-700">Email Valide</label>
                                  <div class="grid grid-cols-3 gap-2">
                                  <div v-if="email_invalid" class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <!-- Heroicon name: outline/exclamation -->
                                    <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                  </div>
                                  <div v-else class="col-span-1 mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-400 sm:mx-0 sm:h-10 sm:w-10">
                                    <!-- Heroicon name: outline/exclamation -->
                                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <p class="text-xs col-span-2"> {{ email_invalid }}</p>
                                  </div>
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                <label class="block text-sm font-medium text-gray-700">Téléphone valide</label>
                                  <div class="grid grid-cols-3 gap-2">
                                  <div v-if="phone_invalid" class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <!-- Heroicon name: outline/exclamation -->
                                    <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                  </div>
                                    <div v-else class="col-span-1 mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-400 sm:mx-0 sm:h-10 sm:w-10">
                                    <!-- Heroicon name: outline/exclamation -->
                                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <p class="text-xs col-span-2">{{ phone_invalid }}  </p>
                                  </div>
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                <label class="block text-sm font-medium text-gray-700">Fomulaire valide</label>
                                  <div class="grid grid-cols-3 gap-2">
                                  <div v-if="form_error" class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <!-- Heroicon name: outline/exclamation -->
                                    <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                  </div>
                                    <div v-else class="col-span-1 mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-400 sm:mx-0 sm:h-10 sm:w-10">
                                    <!-- Heroicon name: outline/exclamation -->
                                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <p class="text-xs col-span-2">{{ form_error }}  </p>
                                  </div>
                                </div>
                            </div>
                          </div>
                          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button v-show="valid_form" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Valider l'inscription
            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                         </div>
                    </div>
                </div>

                <div class="text-grey-dark mt-6">
Conformément à la Loi Informatique et Libertés et Règlement général sur la protection des données (RGPD), vous disposez d’un droit d’accès, de modification, de suppression et d’opposition au traitement de vos données à caractère personnel.
                </div>
            </div>
        </div>
</template>

<script>
import Gmaps from '@/components/Gmaps'
import ValidModal from '@/components/ValidModal'
import dispoableEmails from '@/helpers/disposable-emails'

export default {
  name: 'Contact',
  methods: {
      changeCenter: function (center) {
          this.vaccination_center = center;
      },
      closeModal: function () {
        this.displayModal = false;
      },
      async onSubmit () {
        this.displayModal = true;
        const [year, month, day] = this.birth_date.split('-');
        const preferedVaccinationCenter = {
          name: this.vaccination_center.name,
          gid: this.vaccination_center.id,
          location: {
            coordinates: [this.vaccination_center.position.lng, this.vaccination_center.position.lat],
          }
        }
        const payload = {
          firstName: this.first_name,
          lastName: this.last_name,
          birthDate: new Date(year, month, day),
          phone: this.phone,
          email: this.email_address,
          preferedVaccinationCenter,
          weekAvailability: [this.weekavailability.code],
          weekendAvailability: [this.weekendavailability.code],
        }
        try {
        await this.$axios.$post(`https://${process.env.apiUrl}/candidates`, payload);
        this.success = true;
        this.displayModal = true;
        } catch (err) {
          console.error(err);
          this.success = false;
          this.displayModal = true;
        }
      },
  },
  components: {
    gmaps: Gmaps,
    validModal: ValidModal
  },
  computed: {
    email_invalid: function () {
        const email = this.email_address;
        const validationRegex = new RegExp('\\S+@\\S+\\.\\S+');
        const isValid = validationRegex.test(email);
        const domain = (email.split('@') || [])[1];
        const isDisposable = dispoableEmails.some(dispDomain => dispDomain === domain);
        if (isValid && !isDisposable) {
          return ''
        }
        return "L'adresse email est invalide";
    },
    phone_invalid: function() {
        const phoneRegex = new RegExp("(?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.-]*\\d{2}){4}",'g');
        const isValid = phoneRegex.test(this.phone)
        const match = this.phone === this.phone_confirmation;

        if (!isValid) {
          return 'Le numéro de téléphone est invalide, exemple : +33123456789'
        }
        
        if (!match) {
          return 'Le numéro de téléphone de confirmation ne correspond pas'
        }

        return "";
    }, 
    form_error: function() {
      const isValidDate = (formDate) => { 
        const [year, month, day] = formDate.split('-')
        const date = new Date(year, month, day);

        return date instanceof Date && !isNaN(date);
      };
      if (!this.vaccination_center.name) return 'Le centre de vaccination n\'est pas renseigné'
      if (!this.first_name) return 'Le champ Prénom est vide'
      if (!this.last_name) return 'Le champ Nom de famille est vide'
      if (!isValidDate(this.birth_date)) return 'La date de naissance est invalide'
      if (!this.vaccination_center) return 'Le centre de vaccination n\'est pas renseigné'
      if (!this.weekavailability) return 'Vos disponibilités en semaine ne sont pas renseignées'
      if (!this.weekendavailability) return 'Vos disponibilités le weekend ne sont pas renseignées'
      return ''
      },
    valid_form: function(){
      if (this.form_error || this.email_invalid || this.phone_invalid) {
        return false;
      } else {
        return true;
      }
    }
    },
  data() {
      return {
          availability: [
            {
              code: 'allDay',
              label: "Toute la journée",
            },
            {
              code: "morning",
              label: "Matin",
            },
            {
              code: "noon",
              label: 'Midi',
            },
            {
              code: "afternoon",
              label: 'Après-Midi',
            },
            {
              code: "evening",
              label: 'Soir',
            }],
          first_name: '',
          last_name: '',
          birth_date: '',
          phone: '',
          phone_confirmation: '',
          email_address: '',
          weekendavailability: '',
          weekavailability: '',
          vaccination_center: {},
          vaccination_id: '',
          displayModal: false,
          success: true,
          error_message: '',
      }
  }
}
</script>
