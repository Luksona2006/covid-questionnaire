<template>
  <TheContainer>
    <TheHeader pageNum="3" />
    <Form @submit.prevent class="grid grid-cols-2 gap-3 mt-10" v-slot="{ meta }">
      <div class="flex flex-col gap-12 pr-36">
        <InputWithOptions
          title="უკვე აცრილი ხარ?"
          type="radio"
          :isImportant="true"
          stateKey="had_vaccine"
          validation="required"
          :options="hadVaccine"
        />
        <InputWithOptions
          v-if="store.state['had_vaccine'] === true"
          title="აირჩიე რა ეტაპზე ხარ"
          type="radio"
          :isImportant="true"
          stateKey="vaccination_stage"
          validation="required"
          :options="vaccinationStage"
        />
        <InputWithOptions
          v-if="store.state['had_vaccine'] === false"
          title="რას ელოდები?"
          type="radio"
          :isImportant="true"
          stateKey="i_am_waiting"
          validation="required"
          :options="iAmWaiting"
        />
        <div v-if="store.state['vaccination_stage'] !== '' || store.state['i_am_waiting'] !== ''">
          <p>
            <span v-show="store.state['vaccination_stage'] === vaccinationStage[2].storeData">
              რომ არ გადადო, <br />
              ბარემ ახლავე დარეგისტრირდი <br />
              <br />
            </span>
            <span v-show="store.state['i_am_waiting'] === iAmWaiting[2].storeData">
              ახალი პროტოკოლით კოვიდის გადატანიდან 1 <br />
              თვის შემდეგ შეგიძლიათ ვაქცინის გაკეთება. 👉 <br />
              <br />
            </span>

            👉 რეგისტრაციის ბმული <br />
            <a href="https://booking.moh.gov.ge/">https://booking.moh.gov.ge/</a>
          </p>
        </div>
      </div>
      <TheImageContainer
        mainSrc="@/assets/images/Doctor.png"
        hoverSrc="@/assets/images/YellowStar.png"
        mainAlt="yellow-star"
        hover-alt="red-circle"
        styles="left-5 -top-7"
      />
      <Buttons :previousRoute="previousRoute" :nextRoute="nextRoute" :isAvailable="meta.valid" />
    </Form>
  </TheContainer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Form } from 'vee-validate'
import { useStore } from 'vuex'
import { hadVaccine, vaccinationStage, iAmWaiting } from '@/config/questionaries/vaccine/index.js'
import TheImageContainer from '@/components/TheImageContainer.vue'

import TheHeader from '@/components/TheHeader.vue'
import TheContainer from '@/components/TheContainer.vue'
import Buttons from '@/components/form/Buttons.vue'
import InputWithOptions from '@/components/form/InputWithOptions.vue'

const previousRoute = ref('second-questionaire')
const nextRoute = ref('fourth-questionaire')

const store = useStore()

watch(
  () => [store.state['had_vaccine'], store.state['vaccination_stage'], store.state['i_am_waiting']],
  () => {
    if (store.state['had_vaccine'] === false) {
      store.commit('changeValue', { value: '', stateKey: 'vaccination_stage' })
    }

    if (store.state['had_vaccine'] === true) {
      store.commit('changeValue', { value: '', stateKey: 'i_am_waiting' })
    }
  }
)
</script>
