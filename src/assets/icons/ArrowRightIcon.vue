<template>
  <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L15 11.3158L1 21.6316" :stroke="stroke" stroke-width="2.4" />
  </svg>
</template>

<script setup>
const props = defineProps({
  stroke: {
    type: String,
    required: false,
    default: '#232323'
  }
})
</script>
