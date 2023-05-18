<template>
  <div class="relative">
    <img class="w-full" :src="mainSrcFixed" :alt="mainAlt" />
    <img :class="styles" :src="hoverSrcFixed" :alt="hoverAlt" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
  mainSrc: {
    required: true,
    type: String
  },
  hoverSrc: {
    required: true,
    type: String
  }
})

const styles = ref('absolute -z-10')
const mainSrcFixed = ref(props.mainSrc)
const hoverSrcFixed = ref(props.hoverSrc)

styles.value = styles.value + ' ' + props.styles
mainSrcFixed.value = mainSrcFixed.value.replace('@', '/src')
hoverSrcFixed.value = hoverSrcFixed.value.replace('@', '/src')
</script>
