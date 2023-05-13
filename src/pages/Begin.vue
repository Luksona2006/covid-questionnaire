<template>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-24"
  >
    <div>
      <img src="@/assets/images/MainLogo.png" alt="redberry-logo" />
    </div>
    <div class="relative w-fit">
      <router-link
        to="first-questionaire"
        class="font-bold text-3xl text-center cursor-pointer flex flex-col items-center"
        @mouseover="showText"
        @mouseleave="hideText"
      >
        <div>კითხვარის</div>
        <div>დაწყება</div>
      </router-link>
      <h2
        v-show="isVisisible"
        class="font-bold text-3xl text-center text-transparent text-outline absolute top-0 left-[3px] z-[-1]"
      >
        კითხვარის<br />დაწყება
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisisible = ref(false)

function showText() {
  isVisisible.value = true
}

function hideText() {
  isVisisible.value = false
}
</script>

<style scoped>
.text-outline {
  -webkit-text-stroke: 1px #232323;
}
</style>
