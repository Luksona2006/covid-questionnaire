<template>
  <div class="w-full h-screen bg-[#232323]">
    <div class="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit py-2">
      <transition name="big-star">
        <img
          v-if="showStars"
          src="@/assets/images/StarImage.png"
          alt="white-star"
          class="absolute left-6 -top-16"
        />
      </transition>
      <transition name="small-star">
        <img
          v-if="showStars"
          src="@/assets/images/StarImage.png"
          alt="white-star"
          class="absolute right-9 -bottom-9 w-8"
        />
      </transition>
      <transition name="text" @after-enter="animateStars" appear>
        <h2 class="text-white text-6xl tracking-[0.24em]">მადლობა</h2>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showStars = ref(false)

function animateStars() {
  showStars.value = true
}
</script>

<style scoped>
.big-star-enter-from {
  transform: translate(40px, 50px);
}
.big-star-enter-to {
  transform: translate(0);
}
.big-star-enter-active {
  transition: 0.15s all ease-out;
}

.small-star-enter-from {
  transform: translate(-40px, -40px);
}
.small-star-enter-to {
  transform: translate(0);
}
.small-star-enter-active {
  transition: 0.15s all ease-out;
}

.text-enter-from {
  opacity: 0;
}
.text-enter-to {
  opacity: 1;
}
.text-enter-active {
  transition: 0.9s all;
}
</style>
