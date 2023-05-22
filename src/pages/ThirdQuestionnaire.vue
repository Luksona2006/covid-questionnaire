<template>
  <the-container>
    <the-header pageNum="3" />
    <Form @submit.prevent class="grid grid-cols-2 gap-3 mt-10" v-slot="{ meta }">
      <div class="flex flex-col gap-12 pr-36">
        <input-with-options
          title="უკვე აცრილი ხარ?"
          type="radio"
          :is-important="true"
          state-key="had_vaccine"
          validation="required"
          :options="hadVaccine"
        />
        <input-with-options
          v-if="store.state['had_vaccine'] === true"
          title="აირჩიე რა ეტაპზე ხარ"
          type="radio"
          :is-important="true"
          state-key="vaccination_stage"
          validation="required"
          :options="vaccinationStage"
        />
        <input-with-options
          v-if="store.state['had_vaccine'] === false"
          title="რას ელოდები?"
          type="radio"
          :is-important="true"
          state-key="i_am_waiting"
          validation="required"
          :options="iAmWaiting"
        />
        <div v-if="store.state['vaccination_stage'] !== '' || store.state['i_am_waiting'] !== ''">
          <p>
            <span v-show="store.state['vaccination_stage'] === vaccinationStage[2].storeData">
              რომ არ გადადო, <br />
              ბარემ ახლავე დარეგისტრირდი <br />
              <br />
            </span>
            <span v-show="store.state['i_am_waiting'] === iAmWaiting[2].storeData">
              ახალი პროტოკოლით კოვიდის გადატანიდან 1 <br />
              თვის შემდეგ შეგიძლიათ ვაქცინის გაკეთება. 👉 <br />
              <br />
            </span>

            👉 რეგისტრაციის ბმული <br />
            <a href="https://booking.moh.gov.ge/">https://booking.moh.gov.ge/</a>
          </p>
        </div>
      </div>
      <div class="relative">
        <img class="w-full" src="@/assets/images/DoctorImage.png" alt="doctor" />
        <transition name="image3">
          <img
            v-if="animation"
            class="left-5 -top-7 absolute -z-10"
            src="@/assets/images/YellowStarImage.png"
            alt="yellow-star"
          />
        </transition>
      </div>
      <navigation-buttons
        :previous-route="previousRoute"
        :next-route="nextRoute"
        :is-available="meta.valid"
      />
    </Form>
  </the-container>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { Form } from 'vee-validate'
import { useStore } from 'vuex'
import { hadVaccine, vaccinationStage, iAmWaiting } from '@/config/questionnaires/vaccine/index.js'

import InputWithOptions from '@/components/form/InputWithOptions.vue'
const previousRoute = ref('second-questionaire')
const nextRoute = ref('fourth-questionaire')

const animation = ref(false)
onMounted(() => (animation.value = true))

const store = useStore()

watch(
  () => [store.state['had_vaccine'], store.state['vaccination_stage'], store.state['i_am_waiting']],
  () => {
    if (store.state['had_vaccine'] === false) {
      store.commit('changeValue', { value: '', stateKey: 'vaccination_stage' })
    }

    if (store.state['had_vaccine'] === true) {
      store.commit('changeValue', { value: '', stateKey: 'i_am_waiting' })
    }
  }
)
</script>

<style scoped>
.image3-enter-from {
  width: 0;
  transform: translate(-10px, 55px) scale(1.2);
  opacity: 0;
}

.image3-enter-to {
  width: 622px;
  transform: translate(0) scale(1);
  opacity: 1;
}

.image3-enter-active {
  transition: 0.3s all ease-out;
}
.image3-leave-active {
  transition: 0.5s all ease-out;
}

.image3-leave-from {
  transform: translate(0) scale(1);
  opacity: 1;
}

.image3-leave-to {
  transform: translate(4px, -260px) scale(0.8);
  opacity: 0;
}
</style>
