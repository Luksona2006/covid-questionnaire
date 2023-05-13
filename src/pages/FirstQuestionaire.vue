<template>
  <TheContainer>
    <TheHeader pageNum="1" />
    <Form @submit.prevent class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-12 mt-12 pr-36">
        <TheInput
          title="სახელი"
          :isImportant="true"
          placeholder="იოსებ"
          v-model="name"
          stateKey="name"
          :validation="validateName"
        />
        <TheInput
          title="გვარი"
          :isImportant="true"
          placeholder="ჯუღაშვილი"
          v-model="surname"
          stateKey="surname"
          :validation="validateSurname"
        />
        <TheInput
          title="მეილი"
          type="email"
          :isImportant="true"
          placeholder="fbi@redberry.ge"
          v-model="email"
          stateKey="email"
          :validation="validateEmail"
        />
        <TheHint class="mt-18" />
      </div>
      <div>
        <img class="w-full" src="images/scan.png" alt="standing-people-with-star-eyes" />
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
import TheInput from '../components/form/TheInput.vue'
import TheHint from '../components/TheHint.vue'
import Buttons from '../components/form/Buttons.vue'

const previousRoute = ref('/')
const nextRoute = ref('second-questionaire')

const isAvailable = ref({
  show: false,
  next: false
})

const store = useStore()

watch(
  () => [store.state.name, store.state.surname, store.state.email],
  () => {
    if (store.state.name && store.state.surname && store.state.email) {
      isAvailable.value.show = true
      isAvailable.value.next = false
      if (
        validateName(store.state.name) === true &&
        validateSurname(store.state.surname) === true &&
        validateEmail(store.state.email) === true
      ) {
        isAvailable.value.next = true
      }
    }
  }
)

function validateName(value) {
  if (!value) {
    return 'მონაცემი უნდა იყოს შევსებული'
  }

  const regex = /\w{2,}/i
  if (!regex.test(value)) {
    return 'სახელი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან'
  }

  return true
}
function validateSurname(value) {
  if (!value) {
    return 'მონაცემი უნდა იყოს შევსებული'
  }

  const regex = /\w{2,}/i
  if (!regex.test(value)) {
    return 'გვარი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან'
  }

  return true
}
function validateEmail(value) {
  if (!value) {
    return 'მონაცემი უნდა იყოს შევსებული'
  }

  const regex = /^\w+@redberry.ge$/i
  if (!regex.test(value)) {
    return 'მეილი უნდა იყოს @redberry.ge დაბოლოებით'
  }

  return true
}
</script>
