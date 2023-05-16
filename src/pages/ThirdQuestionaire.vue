<template>
  <TheContainer>
    <TheHeader pageNum="3" />
    <Form @submit.prevent class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-12 mt-12 pr-36">
        <InputWithOptions
          title="უკვე აცრილი ხარ?"
          type="radio"
          :isImportant="true"
          stateKey="had_vaccine"
          :options="hadVaccine"
        />
        <InputWithOptions
          v-if="store.state['had_vaccine'] === true"
          title="აირჩიე რა ეტაპზე ხარ"
          type="radio"
          :isImportant="true"
          stateKey="vaccination_stage"
          :options="vaccinationStage"
        />
        <InputWithOptions
          v-if="store.state['had_vaccine'] === false"
          title="რას ელოდები?"
          type="radio"
          :isImportant="true"
          stateKey="vaccination_stage"
          :options="vaccinationStage2"
        />
        <div v-if="store.state['vaccination_stage'] !== ''">
          <p>
            <span v-show="store.state['vaccination_stage'] === vaccinationStage[2].title">
              რომ არ გადადო, <br />
              ბარემ ახლავე დარეგისტრირდი <br />
              <br />
            </span>
            <span v-show="store.state['vaccination_stage'] === vaccinationStage2[2].title">
              ახალი პროტოკოლით კოვიდის გადატანიდან 1 <br />
              თვის შემდეგ შეგიძლიათ ვაქცინის გაკეთება. 👉 <br />
              <br />
            </span>

            👉 რეგისტრაციის ბმული <br />
            <a href="https://booking.moh.gov.ge/">https://booking.moh.gov.ge/</a>
          </p>
        </div>
      </div>
      <div>
        <img class="w-full" src="@/assets/images/Doctor.png" alt="doctor" />
      </div>
      <Buttons :previousRoute="previousRoute" :nextRoute="nextRoute" :isAvailable="isAvailable" />
    </Form>
  </TheContainer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Form } from 'vee-validate'
import { useStore } from 'vuex'
import {
  hadVaccine,
  vaccinationStage,
  vaccinationStage2
} from '@/config/questionaries/vaccine/index.js'
import isAvailableValidation from '@/store/isAvailableValidation.js'

import TheHeader from '@/components/TheHeader.vue'
import TheContainer from '@/components/TheContainer.vue'
import Buttons from '@/components/form/Buttons.vue'
import InputWithOptions from '@/components/form/InputWithOptions.vue'

const previousRoute = ref('second-questionaire')
const nextRoute = ref('fourth-questionaire')

const isAvailable = ref({
  show: false,
  next: false
})

const store = useStore()

const stateWithValidations = [
  {
    value: store.state['had_vaccine']
  },
  {
    value: store.state['vaccination_stage']
  }
]

if (!isAvailableValidation(stateWithValidations).isAnyEmpty) {
  isAvailable.value.show = true
  isAvailable.value.next = false
  if (isAvailableValidation(stateWithValidations).isValid) {
    isAvailable.value.next = true
  }
}

watch(
  () => [store.state['had_vaccine'], store.state['vaccination_stage']],
  () => {
    const stateWithValidations = [
      {
        value: store.state['had_vaccine']
      },
      {
        value: store.state['vaccination_stage']
      }
    ]

    isAvailable.value.show = false
    isAvailable.value.next = false

    if (!isAvailableValidation(stateWithValidations).isAnyEmpty) {
      isAvailable.value.show = true
      if (isAvailableValidation(stateWithValidations).isValid) {
        isAvailable.value.next = true
      }
    }

    if (
      (store.state['had_vaccine'] === true &&
        (store.state['vaccination_stage'] === vaccinationStage2[0].storeData ||
          store.state['vaccination_stage'] === vaccinationStage2[1].storeData ||
          store.state['vaccination_stage'] === vaccinationStage2[2].storeData)) ||
      (store.state['had_vaccine'] === false &&
        (store.state['vaccination_stage'] === vaccinationStage[0].storeData ||
          store.state['vaccination_stage'] === vaccinationStage[1].storeData ||
          store.state['vaccination_stage'] === vaccinationStage[2].storeData))
    ) {
      store.commit('changeValue', { value: '', stateKey: 'vaccination_stage' })
    }
  }
)
</script>
