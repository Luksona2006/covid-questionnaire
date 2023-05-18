<template>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-24"
  >
    <div>
      <transition name="logo" @after-enter="animateText">
        <img v-if="logoAnimate" src="@/assets/images/MainLogo.png" alt="redberry-logo" />
      </transition>
    </div>
    <div class="relative w-fit min-h-[72px]">
      <transition name="text">
        <router-link
          to="first-questionaire"
          class="font-bold text-3xl text-center cursor-pointer flex flex-col items-center"
          @click="animateLogo"
          @mouseover="showText"
          @mouseleave="hideText"
          v-if="textAnimate"
        >
          <div>კითხვარის</div>
          <div>დაწყება</div>
        </router-link>
      </transition>

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
import { Transition, onMounted, ref } from 'vue'

const logoAnimate = ref(false)
const textAnimate = ref(false)

onMounted(() => {
  logoAnimate.value = true
})

function animateLogo() {
  logoAnimate.value = false
}

function animateText() {
  setTimeout(() => {
    textAnimate.value = true
  }, 300)
}

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

.logo-enter-from {
  transform: scale(22);
}

.logo-enter-to {
  transform: scale(1);
}
.logo-enter-active {
  transition: 0.5s all ease-in;
}

.text-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.text-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.text-enter-active {
  transition: 0.4s all ease-in;
}

.text-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.text-leave-to {
  opacity: 0;
  transform: translateY(0);
}
</style>
