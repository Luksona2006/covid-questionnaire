<template>
  <TheContainer>
    <TheHeader pageNum="1" />
    <Form @submit.prevent class="grid grid-cols-2 gap-3 mt-12" v-slot="{ meta }">
      <div class="flex flex-col gap-12 pr-36">
        <TheInput
          title="სახელი"
          :isImportant="true"
          placeholder="იოსებ"
          stateKey="first_name"
          validation="required|minLength:3,სახელი|georgian"
        />
        <TheInput
          title="გვარი"
          :isImportant="true"
          placeholder="ჯუღაშვილი"
          stateKey="last_name"
          validation="required|minLength:3,გვარი|georgian"
        />
        <TheInput
          title="მეილი"
          type="email"
          :isImportant="true"
          placeholder="fbi@redberry.ge"
          stateKey="email"
          validation="required|email"
        />
        <TheHint class="mt-18" />
      </div>
      <TheImageContainer
        mainSrc="@/assets/images/Scan.png"
        hoverSrc="@/assets/images/YellowRectangle.png"
        mainAlt="standing-people-with-star-eyes"
        hover-alt="yellow-rectangle"
        styles="left-20 top-44 h-[72px] w-[622px]"
      />
      <Buttons :previousRoute="previousRoute" :nextRoute="nextRoute" :isAvailable="meta.valid" />
    </Form>
  </TheContainer>
</template>

<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'

import TheHeader from '@/components/TheHeader.vue'
import TheContainer from '@/components/TheContainer.vue'
import TheInput from '@/components/form/TheInput.vue'
import TheHint from '@/components/TheHint.vue'
import Buttons from '@/components/form/Buttons.vue'
import TheImageContainer from '../components/TheImageContainer.vue'

const previousRoute = ref('/')
const nextRoute = ref('second-questionaire')
</script>
