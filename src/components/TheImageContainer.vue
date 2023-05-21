<template>
  <div class="relative">
    <img class="w-full" :src="getImage(mainImageName)" :alt="mainAlt" />
    <transition name="image">
      <img v-if="animation" :class="styles" :src="getImage(hoverImageName)" :alt="hoverAlt" />
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref, Transition } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const props = defineProps({
  styles: {
    required: true,
    type: String
  },
  mainAlt: {
    required: false,
    type: String,
    default: 'image'
  },
  hoverAlt: {
    required: false,
    type: String,
    default: 'image'
  },
  mainImageName: {
    required: true,
    type: String
  },
  hoverImageName: {
    required: true,
    type: String
  },
  imageEnterFrom: {
    required: false,
    type: Array
  },
  imageEnterTo: {
    required: false,
    type: Array
  },
  imageLeaveFrom: {
    required: false,
    type: Array
  },
  imageLeaveTo: {
    required: false,
    type: Array
  }
})

const animation = ref(false)
onMounted(() => (animation.value = true))
onBeforeRouteLeave(() => {
  animation.value = false
})

const styleSheetIndex = [...document.styleSheets]
  .map((styleSheet) =>
    [...styleSheet.cssRules].filter((el) => el.cssText.split('[')[0] === '.image-enter-from')
  )
  .findIndex((el) => el.length > 0)
const styleSheetNames = () => {
  ;[...document.styleSheets[styleSheetIndex].cssRules].map((rule) => {
    if (rule.selectorText.split('[')[0] === '.image-enter-from') {
      props.imageEnterFrom.map((style) => rule.style.setProperty(style.key, style.value))
    }

    if (rule.selectorText.split('[')[0] === '.image-enter-to') {
      props.imageEnterTo.map((style) => rule.style.setProperty(style.key, style.value))
    }

    if (rule.selectorText.split('[')[0] === '.image-leave-from') {
      props.imageLeaveFrom.map((style) => rule.style.setProperty(style.key, style.value))
    }

    if (rule.selectorText.split('[')[0] === '.image-leave-to') {
      props.imageLeaveTo.map((style) => rule.style.setProperty(style.key, style.value))
    }
  })
}

styleSheetNames()

const styles = ref('absolute -z-10')

styles.value = styles.value + ' ' + props.styles

function getImage(name) {
  const url = new URL(`../assets/images/${name}.png`, import.meta.url).href
  return url
}
</script>

<style scoped>
.image-enter-from {
  opacity: 0;
}

.image-enter-to {
  opacity: 1;
}
.image-enter-active {
  transition: 0.3s all ease-out;
}
.image-leave-active {
  transition: 0.5s all ease-out;
}

.image-leave-from {
  opacity: 1;
}

.image-leave-to {
  opacity: 0;
}
</style>
