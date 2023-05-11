<template>
  <div class="flex gap-14">
    <router-link :to="previousRoute" class="cursor-pointer">
      <svg
        width="18"
        height="23"
        viewBox="0 0 18 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17 1L3 11.3158L17 21.6316" stroke="#232323" stroke-width="2.4" />
      </svg>
    </router-link>

    <button :class="cursorOnButton" :disabled="!props.isAvailable.show">
      <router-link :to="nextRoute" :class="pointerEventsOnRouter">
        <svg
          width="18"
          height="23"
          viewBox="0 0 18 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L15 11.3158L1 21.6316" :stroke="strokeColor" stroke-width="2.4" />
        </svg>
      </router-link>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  isAvailable: {
    default: false,
    required: true
  },
  previousRoute: {
    type: String,
    default: '/',
    required: true
  },
  nextRoute: {
    type: String,
    default: '/',
    required: true
  }
})

const strokeColor = computed(() => (props.isAvailable.show ? '#232323' : '#8D8D8D'))
const pointerEventsOnRouter = computed(() => (!props.isAvailable.next ? 'pointer-events-none' : ''))
const cursorOnButton = computed(() =>
  props.isAvailable.show ? 'cursor-pointer' : 'cursor-default'
)
</script>
