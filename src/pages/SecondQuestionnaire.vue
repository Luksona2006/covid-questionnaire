<template>
  <the-container>
    <the-header page-num="2" />
    <Form @submit.prevent class="grid grid-cols-2 gap-3 mt-12" v-slot="{ meta }">
      <div class="flex flex-col gap-12 pr-36">
        <input-with-options
          title="გაქვს გადატანილი Covid-19?"
          type="radio"
          :is-important="true"
          state-key="had_covid"
          validation="required"
          :options="hadCovid"
        />
        <input-with-options
          v-if="personHadCovid"
          title="ანტისხეულების ტესტი გაქვს გაკეთებული?"
          type="radio"
          :is-important="true"
          state-key="had_antibody_test"
          validation="required"
          :options="hadTest"
        />
        <div v-if="store.state['had_antibody_test'] !== ''">
          <div class="flex flex-col gap-6" v-if="personHadAntibodyTest">
            <the-input
              title="თუ გახსოვს, გთხოვ მიუთითე ტესტის მიახლოებითი რიცხვი და ანტისხეულების რაოდენობა"
              type="date"
              placeholder="თარიღი"
              state-key="test_date"
            />

            <the-input placeholder="ანტისხეულების რაოდენობა" state-key="number" />
          </div>
          <the-input
            v-else
            title="მიუთითე მიახლოებითი პერიოდი (დღე/თვე/წელი) როდის გქონდა Covid-19"
            type="date"
            :is-important="true"
            placeholder="თარიღი"
            state-key="covid_sickness_date"
            validation="required"
          />
        </div>
      </div>
      <the-image-container
        main-image-name="VaccinateImage"
        hover-image-name="RedCircleImage"
        main-alt="ill-man"
        hover-alt="red-circle"
        styles="left-5 top-44"
        :image-enter-from="imageEnterFrom"
        :image-enter-to="imageEnterTo"
        :image-leave-from="imageLeaveFrom"
        :image-leave-to="imageLeaveTo"
      />
      <navigation-buttons
        :previous-route="previousRoute"
        :next-route="nextRoute"
        :is-available="meta.valid"
      />
    </Form>
  </the-container>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Form } from 'vee-validate'
import { hadCovid, hadTest } from '@/config/questionnaires/covid/index.js'
import { useStore } from 'vuex'

import InputWithOptions from '@/components/form/InputWithOptions.vue'
import TheInput from '@/components/form/TheInput.vue'
import {
  imageEnterFrom,
  imageEnterTo,
  imageLeaveFrom,
  imageLeaveTo
} from '@/config/animations/secondQuestionnaire.js'

const previousRoute = ref('first-questionaire')
const nextRoute = ref('third-questionaire')

const store = useStore()

const personHadCovid = computed(
  () => store.state['had_covid'] !== 'no' && store.state['had_covid'] !== ''
)

const personHadAntibodyTest = computed(() => store.state['had_antibody_test'] === true)

watch(
  () => [
    store.state['had_covid'],
    store.state['had_antibody_test'],
    store.state['covid_sickness_date']
  ],
  () => {
    if (store.state['had_covid'] === 'no') {
      store.commit('changeValue', { value: '', stateKey: 'had_antibody_test' })
      store.commit('changeValue', { value: '', stateKey: 'test_date' })
      store.commit('changeValue', { value: '', stateKey: 'number' })
      store.commit('changeValue', { value: '', stateKey: 'covid_sickness_date' })
    }

    if (store.state['had_antibody_test'] === false || store.state['had_antibody_test'] === '') {
      store.commit('changeValue', { value: '', stateKey: 'number' })
      store.commit('changeValue', { value: '', stateKey: 'test_date' })
    }

    if (store.state['had_antibody_test'] === true) {
      store.commit('changeValue', { value: '', stateKey: 'covid_sickness_date' })
    }
  }
)
</script>
