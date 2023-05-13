function isAvailableValidation(objects) {
  let isAnyEmpty = false
  let isValid = true
  objects.forEach((object) => {
    if (object.value === '') isAnyEmpty = true
    if (object.hasOwnProperty('validation') && object.validation !== '') {
      if (object.validation(object.value) !== true) isValid = false
    }
  })

  return {
    isAnyEmpty,
    isValid
  }
}

export default isAvailableValidation
