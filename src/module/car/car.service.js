/**
 * @typedef {import('./repository/abstractCarRepository')} AbstractCarRepository
 */
const Car = require('./car.entity')

module.exports = class CarService {
  /**
   * @param {AbstractCarRepository} carRepository
   */
  constructor (carRepository) {
    this.carRepository = carRepository
  }

  /**
   * @param {Car} car
   */
  create (car) {
    if (!(car instanceof Car)) { throw new Error() }

    return this.carRepository.create(car)
  }

  /**
   * @param {number} id
   * @param {CarFromHttpDto} carDto
   * @param {string} imagePath
   */
  update (id, carDto, imagePath) {
    const car = this.getById(id)

    Object.keys(carDto).forEach(key => {
      car[key] = carDto[key]
    })
    imagePath && (car.imageUrl = imagePath)

    this.carRepository.update(car)
  }

  /**
   * @param {Number} id
   */
  delete (id) {
    if (typeof id !== 'number') { throw new Error() }

    this.carRepository.delete(id)
  }

  /**
   * @param {Number} id
   */
  getById (id) {
    if (typeof id !== 'number') { throw new Error('id isnt number') }

    return this.carRepository.getById(id)
  }

  getAll () {
    return this.carRepository.getAll()
  }

  /**
   * @returns {Car[]}
   */
  getAllAvailableCars () {
    const allCars = this.getAll()
    const allActiveCars = []

    allCars.forEach(car => {
      if (car.active === 1 && car.rented === 0) allActiveCars.push(car)
    })

    return allActiveCars
  }

  getRentedCars () {
    const allCars = this.getAll()
    const rentedCars = []

    allCars.forEach(car => {
      if (car.rented === 1) rentedCars.push(car)
    })

    return rentedCars
  }
}
