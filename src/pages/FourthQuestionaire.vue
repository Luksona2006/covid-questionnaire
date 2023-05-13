<template>
  <TheContainer>
    <TheHeader pageNum="4" />
    <Form @submit.prevent class="grid grid-cols-2">
      <div class="flex flex-col gap-12 mt-12 pr-36">
        <p>
          რედბერის მთავარი ღირებულება ჩვენი გუნდის თითოეული წევრია. გარემო, რომელსაც ჩვენი
          თანამშრომლები ქმნით, ბევრისთვის არის და ყოფილა წლების განმავლობაში მიზნებისთვის ერთად
          ბრძოლის მიზეზი, ბევრისთვის კი — ჩვენთან გადმოსვლის.<br /><br />
          პანდემიის პერიოდში ერთმანეთსაც იშვიათად ვნახულობთ პირისპირ და ყოველდღიური კომუნიკაციაც
          გაიშვიათდა.
        </p>
        <InputWithOptions
          title="რა სიხშირით შეიძლება გვქონდეს საერთო არაფორმალური ონლაინ შეხვედრები, სადაც ყველა სურვილისამებრ ჩაერთვება?"
          type="radio"
          :isImportant="true"
          v-model="non_formal_meetings"
          stateKey="non_formal_meetings"
          :options="firstQuestionOptions"
          :validation="validateIsSelected"
        />
        <InputWithOptions
          title="კვირაში რამდენი დღე ისურვებდი ოფისიდან მუშაობას?"
          type="radio"
          :isImportant="true"
          v-model="number_of_days_from_office"
          stateKey="number_of_days_from_office"
          :options="secondQuestionOptions"
          :validation="validateIsSelected"
        />
        <TheTextarea
          title="რას ფიქრობ ფიზიკურ შეკრებებზე?"
          v-model="what_about_meetings_in_live"
          stateKey="what_about_meetings_in_live"
        />
        <TheTextarea
          title="რას ფიქრობ არსებულ გარემოზე: რა მოგწონს, რას დაამატებდი, რას შეცვლიდი?"
          v-model="tell_us_your_opinion_about_us"
          stateKey="tell_us_your_opinion_about_us"
        />
        <div class="ml-auto">
          <router-link v-if="isAvailable.next" to="/thanks">
            <button class="bg-[#208298] rounded-[48px] text-white text-lg font-bold py-4 px-7">
              დასრულება
            </button>
          </router-link>
          <button
            v-if="!isAvailable.next"
            class="bg-[#208298] rounded-[48px] text-white text-lg font-bold py-4 px-7"
          >
            დასრულება
          </button>
        </div>
      </div>
      <div>
        <img class="w-full" src="images/bike.png" alt="man-riding-bike" />
      </div>
      <Buttons :hasNextPage="false" :previousRoute="previousRoute" :isAvailable="isAvailable" />
    </Form>
  </TheContainer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Form } from 'vee-validate'

import TheHeader from '../components/TheHeader.vue'
import TheContainer from '../components/TheContainer.vue'
import Buttons from '../components/form/Buttons.vue'
import InputWithOptions from '../components/form/InputWithOptions.vue'
import TheTextarea from '../components/form/TheTextarea.vue'
import { useStore } from 'vuex'

const previousRoute = ref('third-questionaire')
const nextRoute = ref(false)

const isAvailable = ref({
  show: false,
  next: false
})

const firstQuestionOptions = ref([
  {
    id: 1,
    title: 'კვირაში ორჯერ',
    storeData: 'twice_a_week'
  },
  {
    id: 2,
    title: 'კვირაში ერთხელ',
    storeData: 'once_a_week'
  },
  {
    id: 3,
    title: 'ორ კვირაში ერთხელ',
    storeData: 'once_in_two_weeks'
  },
  {
    id: 4,
    title: 'თვეში ერთხელ',
    storeData: 'once_a_month'
  }
])

const secondQuestionOptions = ref([
  {
    id: 5,
    title: 0,
    storeData: 0
  },
  {
    id: 6,
    title: 1,
    storeData: 1
  },
  {
    id: 7,
    title: 2,
    storeData: 2
  },
  {
    id: 8,
    title: 3,
    storeData: 3
  },
  {
    id: 9,
    title: 4,
    storeData: 4
  },
  {
    id: 10,
    title: 5,
    storeData: 5
  }
])

const store = useStore()

watch(
  () => [store.state['non_formal_meetings'], store.state['number_of_days_from_office']],
  () => {
    isAvailable.value.show = false
    isAvailable.value.next = false

    if (store.state['non_formal_meetings'] && store.state['number_of_days_from_office']) {
      isAvailable.value.show = true
      isAvailable.value.next = true
    }
  }
)

function validateIsSelected(value) {
  if (!value) {
    return 'აირჩიეთ რომელიმე ვარიანტი'
  }

  return true
}
</script>
