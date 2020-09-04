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
   * @param {Number} id
   * @param {Car} car
   */
  update (id, car) {
    if (!(car instanceof Car)) { throw new Error() }

    return this.carRepository.update(car)
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
    if (typeof id !== 'number') { throw new Error() }

    return this.carRepository.getById(id)
  }

  getAll () {
    return this.carRepository.getAll()
  }

  /**
   * @returns {Car[]}
   */
  getActives () {
    const allCars = this.getAll()
    const allActiveCars = []

    allCars.forEach(car => {
      if (car.active === 1) allActiveCars.push(car)
    })

    return allActiveCars
  }
}
