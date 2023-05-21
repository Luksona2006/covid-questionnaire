<template>
  <the-container>
    <the-header page-num="1" />
    <Form @submit.prevent class="grid grid-cols-2 gap-3 mt-12" v-slot="{ meta }">
      <div class="flex flex-col gap-12 pr-36">
        <the-input
          title="სახელი"
          :is-important="true"
          placeholder="იოსებ"
          state-key="first_name"
          validation="required|minLength:3,სახელი|georgian"
        />
        <the-input
          title="გვარი"
          :is-important="true"
          placeholder="ჯუღაშვილი"
          state-key="last_name"
          validation="required|minLength:3,გვარი|georgian"
        />
        <the-input
          title="მეილი"
          type="email"
          :is-important="true"
          placeholder="fbi@redberry.ge"
          state-key="email"
          validation="required|email"
        />
        <the-hint class="mt-18" />
      </div>
      <the-image-container
        main-image-name="ScanImage"
        hover-image-name="YellowRectangleImage"
        main-alt="standing-people-with-star-eyes"
        hover-alt="yellow-rectangle"
        styles="left-20 top-44 h-[72px] w-[622px]"
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
import { ref } from 'vue'
import { Form } from 'vee-validate'

import TheInput from '@/components/form/TheInput.vue'
import TheHint from '@/components/TheHint.vue'
import {
  imageEnterFrom,
  imageEnterTo,
  imageLeaveFrom,
  imageLeaveTo
} from '@/config/animations/firstQuestionnaire.js'

const previousRoute = ref('/')
const nextRoute = ref('second-questionaire')
</script>
