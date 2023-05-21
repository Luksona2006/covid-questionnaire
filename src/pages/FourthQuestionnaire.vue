<template>
  <the-container>
    <the-header pageNum="4" />
    <Form @submit.prevent class="grid grid-cols-2 mt-12" v-slot="{ meta }">
      <div class="flex flex-col gap-12 pr-36">
        <p>
          რედბერის მთავარი ღირებულება ჩვენი გუნდის თითოეული წევრია. გარემო, რომელსაც ჩვენი
          თანამშრომლები ქმნით, ბევრისთვის არის და ყოფილა წლების განმავლობაში მიზნებისთვის ერთად
          ბრძოლის მიზეზი, ბევრისთვის კი — ჩვენთან გადმოსვლის.<br /><br />
          პანდემიის პერიოდში ერთმანეთსაც იშვიათად ვნახულობთ პირისპირ და ყოველდღიური კომუნიკაციაც
          გაიშვიათდა.
        </p>
        <input-with-options
          title="რა სიხშირით შეიძლება გვქონდეს საერთო არაფორმალური ონლაინ შეხვედრები, სადაც ყველა სურვილისამებრ ჩაერთვება?"
          type="radio"
          :isImportant="true"
          stateKey="non_formal_meetings"
          :options="onlineAttendance"
        />
        <input-with-options
          title="კვირაში რამდენი დღე ისურვებდი ოფისიდან მუშაობას?"
          type="radio"
          :isImportant="true"
          stateKey="number_of_days_from_office"
          :options="workingInOffice"
        />
        <the-textarea
          title="რას ფიქრობ ფიზიკურ შეკრებებზე?"
          stateKey="what_about_meetings_in_live"
        />
        <the-textarea
          title="რას ფიქრობ არსებულ გარემოზე: რა მოგწონს, რას დაამატებდი, რას შეცვლიდი?"
          stateKey="tell_us_your_opinion_about_us"
        />
        <div class="ml-auto mb-16">
          <button
            class="bg-[#208298] rounded-[48px] text-white text-lg font-bold py-4 px-7"
            @click="sendData(meta.valid)"
          >
            დასრულება
          </button>
        </div>
      </div>
      <the-image-container
        mainSrc="@/assets/images/BikeImage.png"
        hoverSrc="@/assets/images/HeartImage.png"
        mainAlt="man-riding-bike"
        hover-alt="pink-heart"
        styles="left-[98px] top-[72px]"
        :image-enter-from="imageEnterFrom"
        :image-enter-to="imageEnterTo"
        :image-leave-from="imageLeaveFrom"
        :image-leave-to="imageLeaveTo"
      />
      <navigation-buttons
        :hasNextPage="false"
        :previousRoute="previousRoute"
        :isAvailable="false"
      />
    </Form>
  </the-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from 'vee-validate'
import { useStore } from 'vuex'
import { onlineAttendance, workingInOffice } from '@/config/questionnaires/job/index.js'
import {
  imageEnterFrom,
  imageEnterTo,
  imageLeaveFrom,
  imageLeaveTo
} from '@/config/animations/fourthQuestionnaire.js'

import InputWithOptions from '@/components/form/InputWithOptions.vue'
import TheTextarea from '@/components/form/TheTextarea.vue'

const previousRoute = ref('third-questionaire')

const router = useRouter()

const store = useStore()
function sendData(valid) {
  const data = JSON.parse(localStorage.getItem('data'))
  const filteredKeys = Object.keys(data).filter((key) => data[key] !== '')
  const filteredKeyValuePairs = filteredKeys.map((key) => [key, store.state[key]])
  const filteredData = Object.fromEntries(filteredKeyValuePairs)

  if (filteredData['number']) {
    filteredData['antibodies'] = {
      number: store.state['number']
    }
  }

  if (filteredData['test_date']) {
    filteredData['antibodies'] = {
      number: store.state['test_date']
    }
  }

  if (filteredData['test_date'] && filteredData['number']) {
    filteredData['antibodies'] = {
      test_date: store.state['test_date'],
      number: store.state['number']
    }
  }
  if (valid) {
    fetch('https://covid19.devtest.ge/api/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(filteredData)
    }).then((response) => {
      if (response.status === 201) {
        router.push('/thanks')
        localStorage.removeItem('data')
      } else {
        throw Error('Something went wrong! :()')
      }
    })
  }
}
</script>
