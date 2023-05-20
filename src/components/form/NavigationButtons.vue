<template>
  <div class="flex gap-14 mx-auto col-span-2">
    <router-link :to="previousRoute" class="cursor-pointer">
      <arrowLeft />
    </router-link>
    <button v-if="hasNextPage" :class="cursorOnButton" :disabled="!isAvailable">
      <arrowRight v-if="!isAvailable" :stroke="strokeColor" />
      <router-link v-else :to="nextRoute">
        <arrowRight :stroke="strokeColor" />
      </router-link>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import arrowLeft from '@/assets/icons/arrowLeft.vue'
import arrowRight from '@/assets/icons/arrowRight.vue'
const props = defineProps({
  isAvailable: {
    required: true,
    type: Boolean
  },
  previousRoute: {
    required: false,
    type: String,
    default: '/'
  },
  nextRoute: {
    required: false,
    type: String || Boolean,
    default: '/'
  },
  hasNextPage: {
    required: false,
    type: Boolean,
    default: true
  }
})

const strokeColor = computed(() => (props.isAvailable ? '#232323' : '#8D8D8D'))
const cursorOnButton = computed(() =>
  props.isAvailable.show ? 'cursor-pointer' : 'cursor-default'
)
</script>
