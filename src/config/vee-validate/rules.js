export function required(value) {
  if (value === '') {
    return 'მონაცემი უნდა იყოს შევსებული'
  }

  return true
}

export function validateFirstName(value) {
  if (value === '') {
    return 'მონაცემი უნდა იყოს შევსებული'
  }

  const regex = /^[ა-ჰ]{3,}$/i
  if (!regex.test(value)) {
    return 'სახელი უნდა შედგებოდეს მინიმუმ 3 ქართული ასოსაგან'
  }

  return true
}
export function validateLastName(value) {
  if (value === '') {
    return 'მონაცემი უნდა იყოს შევსებული'
  }

  const regex = /^[ა-ჰ]{3,}$/i
  if (!regex.test(value)) {
    return 'გვარი უნდა შედგებოდეს მინიმუმ 3 ქართული ასოსაგან'
  }

  return true
}
export function validateEmail(value) {
  if (value === '') {
    return 'მონაცემი უნდა იყოს შევსებული'
  }

  const regex = /\w+@redberry.ge$/i
  if (!regex.test(value)) {
    return 'მეილი უნდა იყოს @redberry.ge დაბოლოებით'
  }

  return true
}
