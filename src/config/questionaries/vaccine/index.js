const hadVaccine = [
  {
    id: 1,
    title: 'კი',
    storeData: true
  },
  {
    id: 2,
    title: 'არა',
    storeData: false
  }
]

const vaccinationStage = [
  {
    id: 3,
    title: 'პირველი დოზა და დარეგისტრირებული ვარ მეორეზე',
    storeData: 'first_dosage_and_registered_on_the_second'
  },
  {
    id: 4,
    title: 'სრულად აცრილი ვარ',
    storeData: 'fully_vaccinated'
  },
  {
    id: 5,
    title: 'პირველი დოზა და არ დავრეგისტრირებულვარ მეორეზე',
    storeData: 'first_dosage_and_not_registered_on_the_second'
  }
]

const vaccinationStage2 = [
  {
    id: 6,
    title: 'დარეგისტრირებული ვარ და ველოდები რიცხვს',
    storeData: 'registered_and_waiting_for_a_date'
  },
  {
    id: 7,
    title: 'არ ვგეგმავ',
    storeData: 'did_not_plan_yet'
  },
  {
    id: 8,
    title: 'გადატანილი მაქვს და ვგეგმავ აცრას',
    storeData: 'i_have_been_infected_and_i_plan_to_get_vaccinated'
  }
]

export { hadVaccine, vaccinationStage, vaccinationStage2 }
