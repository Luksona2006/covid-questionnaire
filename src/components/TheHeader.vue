<template>
  <header class="flex justify-between items-center py-6 border-b-2 border-b-[#232323]">
    <div>
      <img src="images/second_logo.png" alt="redberry-logo" />
    </div>
    <div>
      <h2 class="text-[40px] font-bold font-anonymousBold">{{ pageNum }}/4</h2>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  pageNum: {
    type: String || Number,
    default: '1'
  }
})
</script>
