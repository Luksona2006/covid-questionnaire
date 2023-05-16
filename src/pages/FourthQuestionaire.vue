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
          stateKey="non_formal_meetings"
          :options="onlineAttendance"
        />
        <InputWithOptions
          title="კვირაში რამდენი დღე ისურვებდი ოფისიდან მუშაობას?"
          type="radio"
          :isImportant="true"
          stateKey="number_of_days_from_office"
          :options="workingInOffice"
        />
        <TheTextarea
          title="რას ფიქრობ ფიზიკურ შეკრებებზე?"
          stateKey="what_about_meetings_in_live"
        />
        <TheTextarea
          title="რას ფიქრობ არსებულ გარემოზე: რა მოგწონს, რას დაამატებდი, რას შეცვლიდი?"
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
        <img class="w-full" src="@/assets/images/Bike.png" alt="man-riding-bike" />
      </div>
      <Buttons :hasNextPage="false" :previousRoute="previousRoute" :isAvailable="isAvailable" />
    </Form>
  </TheContainer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { Form } from 'vee-validate'
import { onlineAttendance, workingInOffice } from '@/config/questionaries/job/index.js'
import isAvailableValidation from '@/store/isAvailableValidation.js'

import TheHeader from '@/components/TheHeader.vue'
import TheContainer from '@/components/TheContainer.vue'
import Buttons from '@/components/form/Buttons.vue'
import InputWithOptions from '@/components/form/InputWithOptions.vue'
import TheTextarea from '@/components/form/TheTextarea.vue'

const previousRoute = ref('third-questionaire')
const nextRoute = ref(false)

const isAvailable = ref({
  show: false,
  next: false
})

const store = useStore()

const stateWithValidations = [
  {
    value: store.state['non_formal_meetings']
  },
  {
    value: store.state['number_of_days_from_office']
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
  () => [store.state['non_formal_meetings'], store.state['number_of_days_from_office']],
  () => {
    const stateWithValidations = [
      {
        value: store.state['non_formal_meetings']
      },
      {
        value: store.state['number_of_days_from_office']
      }
    ]

    isAvailable.value.show = false
    isAvailable.value.next = false

    if (!isAvailableValidation(stateWithValidations).isAnyEmpty) {
      isAvailable.value.show = true
      isAvailable.value.next = false
      if (isAvailableValidation(stateWithValidations).isValid) {
        isAvailable.value.next = true
      }
    }
  }
)
</script>
