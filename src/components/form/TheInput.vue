<template>
  <div class="flex flex-col gap-2 items-start max-w-lg w-full">
    <label v-if="title" :for="stateKey" class="text-2xl mb-2">
      {{ labelTitle }}
    </label>

    <Field
      :name="stateKey"
      :type="type"
      :placeholder="placeholder"
      :value="store.state[stateKey]"
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
    default: 'text'
  },
  placeholder: {
    required: false,
    type: String,
    default: ''
  },
  stateKey: {
    required: true,
    type: String
  },
  validation: {
    required: false,
    type: String,
    default: ''
  }
})

const marked = computed(function () {
  return !!props.isImportant === true ? '*' : ''
})

const labelTitle = props.title + '' + marked.value

const store = useStore()

function changeValue(value) {
  store.commit('changeValue', { value, stateKey: props.stateKey })
}
</script>
