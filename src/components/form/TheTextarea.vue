<template>
  <div class="flex flex-col gap-2 items-start max-w-lg w-full">
    <label v-if="title" :for="stateKey" class="text-2xl mb-2">
      {{ labelTitle }}
    </label>

    <textarea
      :name="stateKey"
      :value="modelValue"
      @input="changeValue($event.target.value)"
      class="border-[0.8px] border-[#232323] py-3 px-5 outline-none w-full resize-none"
      rows="6"
    ></textarea>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String || Number,
    default: ''
  },
  stateKey: {
    type: String,
    required: true
  }
})

const marked = computed(function () {
  return !!props.isImportant === true ? '*' : ''
})

const labelTitle = props.title + '' + marked.value

const emits = defineEmits(['update:modelValue'])

const store = useStore()

function changeValue(value) {
  emits('update:modelValue', value)
  store.commit('changeValue', { value, stateKey: props.stateKey })
}
</script>
