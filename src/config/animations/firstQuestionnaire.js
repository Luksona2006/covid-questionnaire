const imageEnterFrom = [
  {
    key: 'width',
    value: 0
  },
  {
    key: 'transform',
    value: 'translate(-20px, -5px)'
  }
]

const imageEnterTo = [
  {
    key: 'width',
    value: '622px'
  },
  {
    key: 'transform',
    value: 'translate(0)'
  }
]

const imageLeaveFrom = [
  {
    key: 'transform',
    value: 'translate(0)'
  }
]

const imageLeaveTo = [
  {
    key: 'transform',
    value: 'translate(-150px, 25px) scaleX(0.6) scaleY(1.2)'
  }
]

export { imageEnterFrom, imageEnterTo, imageLeaveFrom, imageLeaveTo }
