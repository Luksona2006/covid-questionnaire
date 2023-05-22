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
      <div class="relative">
        <img
          class="w-full"
          src="@/assets/images/ScanImage.png"
          alt="standing-people-with-star-eyes"
        />
        <transition name="image">
          <img
            v-if="animation"
            class="left-20 top-44 h-[72px] w-[622px] absolute -z-10"
            src="@/assets/images/YellowRectangleImage.png"
            alt="yellow-rectangle"
          />
        </transition>
      </div>
      <navigation-buttons
        :previous-route="previousRoute"
        :next-route="nextRoute"
        :is-available="meta.valid"
      />
    </Form>
  </the-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate'

import TheInput from '@/components/form/TheInput.vue'
import TheHint from '@/components/TheHint.vue'

const previousRoute = ref('/')
const nextRoute = ref('second-questionaire')

const animation = ref(false)
onMounted(() => (animation.value = true))
</script>

<style scoped>
.image-enter-from {
  width: 0;
  transform: translate(-20px, -5px);
  opacity: 0;
}

.image-enter-to {
  width: 622px;
  transform: translate(0);
  opacity: 1;
}

.image-enter-active {
  transition: 0.3s all ease-out;
}
.image-leave-active {
  transition: 0.5s all ease-out;
}

.image-leave-from {
  transform: translate(0);
  opacity: 1;
}

.image-leave-to {
  transform: translate(-150px, 25px) scaleX(0.6) scaleY(1.2);
  opacity: 0;
}
</style>
