<template>
  <div class="flex flex-col gap-2 items-start max-w-lg w-full">
    <label :for="stateKey" class="text-2xl mb-2">
      {{ labelTitle }}
    </label>
    <Field :name="stateKey" :value="storeValue" :rules="inputValidation">
      <div v-for="option in options" class="flex gap-2 items-center ml-2">
        <input
          :type="type"
          :value="option.storeData"
          :name="stateKey"
          :key="option.id"
          :id="option.id"
          @input="changeValue($event.target.value)"
          class="border-[0.8px] border-[#232323] py-3 px-5 outline-none w-fit"
          :checked="option.storeData === store.state[stateKey] ? true : false"
        />
        <label :for="option.id" class="text-xl w-max">
          {{ option.title }}
        </label>
      </div>
    </Field>
    <ErrorMessage :name="stateKey" class="text-[#F15524]" />
  </div>
</template>

<script setup>
import { ErrorMessage, Field } from 'vee-validate'
import { computed, ref } from 'vue'
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
  stateKey: {
    required: true,
    type: String
  },
  validation: {
    required: false,
    type: String,
    default: ''
  },
  options: {
    required: true,
    type: Array
  }
})

const marked = computed(function () {
  return !!props.isImportant === true ? '*' : ''
})

const labelTitle = props.title + '' + marked.value

const store = useStore()

const storeValue = ref(store.state[props.stateKey])
const inputValidation = ref(props.validation)

function changeValue(value) {
  store.commit('changeValue', { value, stateKey: props.stateKey })
  storeValue.value = store.state[props.stateKey]
  inputValidation.value = ''
}
</script>
