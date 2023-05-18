<template>
  <TheContainer>
    <TheHeader pageNum="2" />
    <Form @submit.prevent class="grid grid-cols-2 gap-3 mt-12" v-slot="{ meta }">
      <div class="flex flex-col gap-12 pr-36">
        <InputWithOptions
          title="გაქვს გადატანილი Covid-19?"
          type="radio"
          :isImportant="true"
          stateKey="had_covid"
          validation="required"
          :options="hadCovid"
        />
        <InputWithOptions
          v-if="personHadCovid"
          title="ანტისხეულების ტესტი გაქვს გაკეთებული?"
          type="radio"
          :isImportant="true"
          stateKey="had_antibody_test"
          validation="required"
          :options="hadTest"
        />
        <div v-if="store.state['had_antibody_test'] !== ''">
          <div class="flex flex-col gap-6" v-if="personHadAntibodyTest">
            <TheInput
              title="თუ გახსოვს, გთხოვ მიუთითე ტესტის მიახლოებითი რიცხვი და ანტისხეულების რაოდენობა"
              type="date"
              placeholder="თარიღი"
              stateKey="test_date"
            />

            <TheInput placeholder="ანტისხეულების რაოდენობა" stateKey="number" />
          </div>
          <TheInput
            v-else
            title="მიუთითე მიახლოებითი პერიოდი (დღე/თვე/წელი) როდის გქონდა Covid-19"
            type="date"
            :isImportant="true"
            placeholder="თარიღი"
            stateKey="covid_sickness_date"
            validation="required"
          />
        </div>
      </div>
      <TheImageContainer
        mainSrc="@/assets/images/Vaccinate.png"
        hoverSrc="@/assets/images/RedCircle.png"
        mainAlt="ill-man"
        hover-alt="red-circle"
        styles="left-5 top-44"
      />
      <Buttons :previousRoute="previousRoute" :nextRoute="nextRoute" :isAvailable="meta.valid" />
    </Form>
  </TheContainer>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Form } from 'vee-validate'
import { hadCovid, hadTest } from '@/config/questionaries/covid/index.js'
import { useStore } from 'vuex'
import TheImageContainer from '../components/TheImageContainer.vue'

import TheHeader from '@/components/TheHeader.vue'
import TheContainer from '@/components/TheContainer.vue'
import Buttons from '@/components/form/Buttons.vue'
import InputWithOptions from '@/components/form/InputWithOptions.vue'
import TheInput from '@/components/form/TheInput.vue'

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
