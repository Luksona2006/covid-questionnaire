<template>
  <router-view v-slot="slotProps">
    <transition name="route">
      <component :is="slotProps.Component" />
    </transition>
  </router-view>
</template>

<style>
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}

@font-face {
  font-family: 'Bpg Arial';
  src: url(../public/fonts/bpg_arial_2009.ttf);
}

* {
  font-family: 'Bpg Arial';
  box-sizing: border-box;
  color: #232323;

  margin: 0;
  padding: 0;
  border: 0;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.2s;
}
</style>

<script setup>
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  const data = {
    first_name: '',
    last_name: '',
    email: '',
    had_covid: '',
    had_antibody_test: '',
    covid_sickness_date: '',
    test_date: '',
    number: '',
    had_vaccine: '',
    vaccination_stage: '',
    i_am_waiting: '',
    non_formal_meetings: '',
    number_of_days_from_office: '',
    what_about_meetings_in_live: '',
    tell_us_your_opinion_about_us: ''
  }
  if (!localStorage.getItem('data')) {
    localStorage.setItem('data', JSON.stringify(data))
  }
})
</script>
