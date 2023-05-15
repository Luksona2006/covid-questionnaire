<template>
  <TheContainer>
    <TheHeader pageNum="1" />
    <Form @submit.prevent class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-12 mt-12 pr-36">
        <TheInput
          title="სახელი"
          :isImportant="true"
          placeholder="იოსებ"
          stateKey="first_name"
          :validation="validateFirstName"
        />
        <TheInput
          title="გვარი"
          :isImportant="true"
          placeholder="ჯუღაშვილი"
          stateKey="last_name"
          :validation="validateLastName"
        />
        <TheInput
          title="მეილი"
          type="email"
          :isImportant="true"
          placeholder="fbi@redberry.ge"
          stateKey="email"
          :validation="validateEmail"
        />
        <TheHint class="mt-18" />
      </div>
      <div>
        <img class="w-full" src="@/assets/images/Scan.png" alt="standing-people-with-star-eyes" />
      </div>
      <Buttons :previousRoute="previousRoute" :nextRoute="nextRoute" :isAvailable="isAvailable" />
    </Form>
  </TheContainer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Form } from 'vee-validate'
import { useStore } from 'vuex'
import isAvailableValidation from '@/store/isAvailableValidation.js'
import { validateFirstName, validateLastName, validateEmail } from '../config/vee-validate/rules.js'

import TheHeader from '@/components/TheHeader.vue'
import TheContainer from '@/components/TheContainer.vue'
import TheInput from '@/components/form/TheInput.vue'
import TheHint from '@/components/TheHint.vue'
import Buttons from '@/components/form/Buttons.vue'

const previousRoute = ref('/')
const nextRoute = ref('second-questionaire')

const isAvailable = ref({
  show: false,
  next: false
})

const store = useStore()

const stateWithValidations = [
  {
    value: store.state['first_name'],
    validation: validateFirstName
  },
  {
    value: store.state['last_name'],
    validation: validateLastName
  },
  {
    value: store.state.email,
    validation: validateEmail
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
  () => [store.state['first_name'], store.state['last_name'], store.state.email],
  () => {
    const stateWithValidations = [
      {
        value: store.state['first_name'],
        validation: validateFirstName
      },
      {
        value: store.state['last_name'],
        validation: validateLastName
      },
      {
        value: store.state.email,
        validation: validateEmail
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
  }
)
</script>
