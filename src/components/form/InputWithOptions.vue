<template>
  <div class="flex flex-col gap-2 items-start max-w-lg w-full">
    <label :for="stateKey" class="text-2xl mb-2">
      {{ labelTitle }}
    </label>
    <div v-for="option in options" class="flex gap-2 items-center ml-2">
      <Field
        :name="stateKey"
        :type="type"
        :key="option.id"
        :id="option.id"
        :value="option.title"
        :storeData="option.storeData"
        @input="changeValue($event.target.value, option.storeData)"
        :rules="validation"
        class="border-[0.8px] border-[#232323] py-3 px-5 outline-none w-fit"
      />
      <label :for="option.id" class="text-xl w-max">
        {{ option.title }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { Field } from 'vee-validate'
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  title: {
    required: false,
    type: String,
    default: ''
  },
  isImportant: {
    required: false,
    type: Boolean,
    default: false
  },
  type: {
    required: false,
    type: String,
    default: 'radio'
  },
  placeholder: {
    required: false,
    type: String,
    default: ''
  },
  modelValue: {
    required: true,
    type: String || Number,
    default: ''
  },
  stateKey: {
    required: true,
    type: String,
    required: true
  },
  validation: {
    required: true
  },
  options: {
    required: true,
    type: Array,
    default: []
  }
})

const marked = computed(function () {
  return !!props.isImportant === true ? '*' : ''
})

const labelTitle = props.title + '' + marked.value

const emits = defineEmits(['update:modelValue'])

const store = useStore()

function changeValue(value, storeData) {
  emits('update:modelValue', value)
  store.commit('changeValue', { value: storeData, stateKey: props.stateKey })
}
</script>
