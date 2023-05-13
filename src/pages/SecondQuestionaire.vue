<template>
  <TheContainer>
    <TheHeader pageNum="2" />
    <Form @submit.prevent class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-12 mt-12 pr-36">
        <InputWithOptions
          title="გაქვს გადატანილი Covid-19?"
          type="radio"
          :isImportant="true"
          v-model="had_covid"
          stateKey="had_covid"
          :options="firstQuestionOptions"
          :validation="validateIsSelected"
        />
        <InputWithOptions
          v-if="had_covid !== 'არა' && had_covid"
          title="ანტისხეულების ტესტი გაქვს გაკეთებული?"
          type="radio"
          :isImportant="true"
          v-model="had_antibody_test"
          stateKey="had_antibody_test"
          :options="secondQuestionOptions"
          :validation="validateIsSelected"
        />
        <div v-if="store.state['had_antibody_test'] !== ''">
          <div class="flex flex-col gap-6" v-if="store.state['had_antibody_test'] === true">
            <TheInput
              title="თუ გახსოვს, გთხოვ მიუთითე ტესტის მიახლოებითი რიცხვი და ანტისხეულების რაოდენობა"
              type="date"
              placeholder="თარიღი"
              v-model="test_date"
              stateKey="test_date"
            />

            <TheInput placeholder="ანტისხეულების რაოდენობა" v-model="number" stateKey="number" />
          </div>
          <TheInput
            v-else
            title="მიუთითე მიახლოებითი პერიოდი (დღე/თვე/წელი) როდის გქონდა Covid-19"
            type="date"
            :isImportant="true"
            placeholder="თარიღი"
            v-model="covid_date"
            stateKey="covid_date"
            :validation="isNotEmpty"
          />
        </div>
      </div>
      <div>
        <img class="w-full" src="@/assets/images/vaccinate.png" alt="ill-man" />
      </div>
      <Buttons :previousRoute="previousRoute" :nextRoute="nextRoute" :isAvailable="isAvailable" />
    </Form>
  </TheContainer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Form } from 'vee-validate'
import { useStore } from 'vuex'

import TheHeader from '@/components/TheHeader.vue'
import TheContainer from '@/components/TheContainer.vue'
import Buttons from '@/components/form/Buttons.vue'
import InputWithOptions from '@/components/form/InputWithOptions.vue'
import TheInput from '@/components/form/TheInput.vue'

const previousRoute = ref('first-questionaire')
const nextRoute = ref('third-questionaire')

const isAvailable = ref({
  show: false,
  next: false
})

const firstQuestionOptions = ref([
  {
    id: 1,
    title: 'კი',
    storeData: 'yes'
  },
  {
    id: 2,
    title: 'არა',
    storeData: 'no'
  },
  {
    id: 3,
    title: 'ეხლა მაქვს',
    storeData: 'having_it_now'
  }
])

const secondQuestionOptions = ref([
  {
    id: 4,
    title: 'კი',
    storeData: true
  },
  {
    id: 5,
    title: 'არა',
    storeData: false
  }
])

const store = useStore()

watch(
  () => [store.state['had_covid'], store.state['had_antibody_test'], store.state['covid_date']],
  () => {
    const hadCovid = store.state['had_covid']
    const checkAntibodyTest =
      hadCovid && hadCovid !== 'no' ? store.state['had_antibody_test'] : true
    const checkCovidDate =
      store.state['had_antibody_test'] === false ? store.state['covid_date'] : true

    isAvailable.value.show = false
    isAvailable.value.next = false
    if (
      !!hadCovid &&
      (checkAntibodyTest === false || checkAntibodyTest === true) &&
      checkCovidDate
    ) {
      isAvailable.value.show = true
      isAvailable.value.next = true
    }

    if (hadCovid === 'no') {
      store.commit('changeValue', { value: '', stateKey: 'had_antibody_test' })
      store.commit('changeValue', { value: '', stateKey: 'test_date' })
      store.commit('changeValue', { value: '', stateKey: 'number' })
    }

    if (store.state['had_antibody_test'] === false || store.state['had_antibody_test'] === '') {
      store.commit('changeValue', { value: '', stateKey: 'number' })
      store.commit('changeValue', { value: '', stateKey: 'test_date' })
    }

    if (store.state['had_antibody_test'] === true) {
      store.commit('changeValue', { value: '', stateKey: 'covid_date' })
    }
  }
)

function validateIsSelected(value) {
  if (!value) {
    return 'აირჩიეთ რომელიმე ვარიანტი'
  }

  return true
}

function isNotEmpty(value) {
  if (!value) {
    return 'მონაცემი უნდა იყოს შევსებული'
  }

  return true
}
</script>
