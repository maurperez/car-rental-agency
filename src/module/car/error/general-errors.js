class NonExistentCar extends Error{
  constructor(){
    super()
    this.message = 'This car does not exist'
  }
}
class CarAlredyRented extends Error {
  constructor(){
    super()
    this.message = 'This car is already rented'
  }
}
class CarInactive extends Error {
  constructor(){
    super()
    this.message = 'This car is inactive at the moment'
  }
}

module.exports = {
  NonExistentCar,
  CarAlredyRented,
  CarInactive
}