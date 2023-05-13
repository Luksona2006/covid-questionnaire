<template>
  <TheContainer>
    <TheHeader pageNum="3" />
    <Form @submit.prevent class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-12 mt-12 pr-36">
        <InputWithOptions
          title="უკვე აცრილი ხარ?"
          type="radio"
          :isImportant="true"
          v-model="had_vaccine"
          stateKey="had_vaccine"
          :options="firstQuestionOptions"
          :validation="validateIsSelected"
        />
        <InputWithOptions
          v-if="had_vaccine === 'კი'"
          title="აირჩიე რა ეტაპზე ხარ"
          type="radio"
          :isImportant="true"
          v-model="vaccination_stage"
          stateKey="vaccination_stage"
          :options="secondQuestionOptions"
          :validation="validateIsSelected"
        />
        <InputWithOptions
          v-if="had_vaccine === 'არა'"
          title="რას ელოდები?"
          type="radio"
          :isImportant="true"
          v-model="vaccination_stage"
          stateKey="vaccination_stage"
          :options="thirdQuestionOptions"
          :validation="validateIsSelected"
        />
        <div v-if="vaccination_stage">
          <p>
            <span v-show="vaccination_stage === secondQuestionOptions[2].title">
              რომ არ გადადო, <br />
              ბარემ ახლავე დარეგისტრირდი <br />
              <br />
            </span>
            <span v-show="vaccination_stage === thirdQuestionOptions[2].title">
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
        <img class="w-full" src="images/doctor.png" alt="doctor" />
      </div>
      <Buttons :previousRoute="previousRoute" :nextRoute="nextRoute" :isAvailable="isAvailable" />
    </Form>
  </TheContainer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Form } from 'vee-validate'
import { useStore } from 'vuex'

import TheHeader from '../components/TheHeader.vue'
import TheContainer from '../components/TheContainer.vue'
import Buttons from '../components/form/Buttons.vue'
import InputWithOptions from '../components/form/InputWithOptions.vue'

const previousRoute = ref('second-questionaire')
const nextRoute = ref('fourth-questionaire')

const isAvailable = ref({
  show: false,
  next: false
})

const firstQuestionOptions = ref([
  {
    id: 1,
    title: 'კი',
    storeData: true
  },
  {
    id: 2,
    title: 'არა',
    storeData: false
  }
])

const secondQuestionOptions = ref([
  {
    id: 3,
    title: 'პირველი დოზა და დარეგისტრირებული ვარ მეორეზე',
    storeData: 'first_dosage_and_registered_on_the_second'
  },
  {
    id: 4,
    title: 'სრულად აცრილი ვარ',
    storeData: 'fully_vaccinated'
  },
  {
    id: 5,
    title: 'პირველი დოზა და არ დავრეგისტრირებულვარ მეორეზე',
    storeData: 'first_dosage_and_not_registered_on_the_second'
  }
])

const thirdQuestionOptions = ref([
  {
    id: 6,
    title: 'დარეგისტრირებული ვარ და ველოდები რიცხვს',
    storeData: 'registered_and_waiting_for_a_date'
  },
  {
    id: 7,
    title: 'არ ვგეგმავ',
    storeData: 'registered_and_waiting_for_a_date'
  },
  {
    id: 8,
    title: 'გადატანილი მაქვს და ვგეგმავ აცრას',
    storeData: 'did_not_plan_yet'
  }
])

const store = useStore()

watch(
  () => [store.state['had_vaccine'], store.state['vaccination_stage']],
  () => {
    isAvailable.value.show = false
    isAvailable.value.next = false

    if (store.state['had_vaccine'] !== '' && !!store.state['vaccination_stage']) {
      isAvailable.value.show = true
      isAvailable.value.next = true
    }

    // if (store.state['had_antibody_test'] === 'არა') {
    //   store.commit('changeValue', { value: '', stateKey: 'number' })
    // }
  }
)

function validateIsSelected(value) {
  if (!value) {
    return 'აირჩიეთ რომელიმე ვარიანტი'
  }

  return true
}
</script>
