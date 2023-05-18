import { defineRule } from 'vee-validate'

defineRule('required', (value) => {
  if (value === '') {
    return 'მონაცემი უნდა იყოს შევსებული'
  }

  return true
})

defineRule('minLength', (value, [limit, input]) => {
  if (value.length < limit) {
    return `${input} უნდა შედგებოდეს მინიმუმ ${limit} ასოსაგან`
  }

  return true
})

defineRule('georgian', (value) => {
  const regex = /^[ა-ჰ]{3,}$/i
  if (!regex.test(value)) {
    return `სავალდებულოა ქართული ასოები`
  }
  return true
})

defineRule('email', (value) => {
  const regex = /\w+@redberry.ge$/i
  if (!regex.test(value)) {
    return 'მეილი უნდა იყოს @redberry.ge დაბოლოებით'
  }

  return true
})
