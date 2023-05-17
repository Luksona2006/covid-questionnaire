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
    storeData: 'first_dosage_and_not_registered_yet'
  }
]

const iAmWaiting = [
  {
    id: 6,
    title: 'დარეგისტრირებული ვარ და ველოდები რიცხვს',
    storeData: 'registered_and_waiting'
  },
  {
    id: 7,
    title: 'არ ვგეგმავ',
    storeData: 'not_planning'
  },
  {
    id: 8,
    title: 'გადატანილი მაქვს და ვგეგმავ აცრას',
    storeData: 'had_covid_and_planning_to_be_vaccinated'
  }
]

export { hadVaccine, vaccinationStage, iAmWaiting }
