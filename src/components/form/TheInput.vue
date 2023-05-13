<template>
  <div class="flex flex-col gap-2 items-start max-w-lg w-full">
    <label v-if="title" :for="stateKey" class="text-2xl mb-2">
      {{ labelTitle }}
    </label>

    <Field
      v-if="!hasOptions"
      :name="stateKey"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="changeValue($event.target.value)"
      :rules="validation"
      class="border-[0.8px] border-[#232323] py-3 px-5 outline-none w-full"
    />
    <ErrorMessage :name="stateKey" class="text-[#F15524]" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps({
  title: {
    type: String,
    default: ''
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
  },
  options: {
    type: Array,
    default: []
  }
})

const marked = computed(function () {
  return !!props.isImportant === true ? '*' : ''
})

const labelTitle = props.title + '' + marked.value

const hasOptions = computed(function () {
  return props.options.length > 0 ? true : false
})

const emits = defineEmits(['update:modelValue'])

const store = useStore()

function changeValue(value) {
  emits('update:modelValue', value)
  store.commit('changeValue', { value, stateKey: props.stateKey })
}
</script>
