<template>
  <TheContainer>
    <TheHeader pageNum="1" />
    <Form @submit.prevent class="flex flex-col gap-12 mt-12">
      <TheInput
        title="სახელი"
        isImportant="true"
        placeholder="იოსებ"
        v-model="name"
        stateKey="name"
        :validation="validateName"
      />
      <TheInput
        title="გვარი"
        isImportant="true"
        placeholder="ჯუღაშვილი"
        v-model="surname"
        stateKey="surname"
        :validation="validateSurname"
      />
      <TheInput
        title="მეილი"
        type="email"
        isImportant="true"
        placeholder="fbi@redberry.ge"
        v-model="email"
        stateKey="email"
        :validation="validateEmail"
      />
      <TheHint class="mt-18" />
      <Buttons
        :previousRoute="previousRoute"
        :nextRoute="nextRoute"
        :isAvailable="isAvailable"
        class="mt-10 w-full flex justify-center"
      />
    </Form>
  </TheContainer>
</template>

<script setup>
import { ref, watch } from 'vue'

import TheHeader from '../components/TheHeader.vue'
import TheContainer from '../components/TheContainer.vue'
import TheInput from '../components/TheInput.vue'
import TheHint from '../components/TheHint.vue'
import Buttons from '../components/Buttons.vue'
import { Form } from 'vee-validate'

const name = ref('')
const surname = ref('')
const email = ref('')

const goBackRoute = ref('/')
const nextRoute = ref('second-questionarie')

const isAvailable = ref({
  show: false,
  next: false
})

watch(
  () => [name.value, surname.value, email.value],
  () => {
    if (name.value && surname.value && email.value) {
      isAvailable.value.show = true
      isAvailable.value.next = false
      if (
        validateName(name.value) === true &&
        validateSurname(surname.value) === true &&
        validateEmail(email.value) === true
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
