<template>
  <div class="flex flex-col gap-2 items-start max-w-lg w-full">
    <label :for="title" class="text-2xl">
      {{ labelTitle }}
    </label>
    <Field
      :name="title"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="changeValue($event.target.value)"
      :rules="validation"
      class="border-[0.8px] border-[#232323] py-3 px-5 outline-none w-full"
    />
    <ErrorMessage :name="title" class="text-[#F15524]" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps({
  title: {
    type: String,
    default: '1'
  },
  isImportant: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
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
  },
  validation: {
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const store = useStore()

const marked = computed(function () {
  return !!props.isImportant === true ? '*' : ''
})

function changeValue(value) {
  emits('update:modelValue', value)
  store.commit('changeValue', { value, stateKey: props.stateKey })
}

const labelTitle = props.title + '' + marked.value
</script>

<style scoped></style>
