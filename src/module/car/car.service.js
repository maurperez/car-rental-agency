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

  create (car) {
    if (!(car instanceof Car)) { throw new Error() }

    return this.carRepository.create(car)
  }

  update (car) {
    if (!(car instanceof Car)) { throw new Error() }

    return this.carRepository.update(car)
  }

  delete (id) {
    if (typeof id !== 'number') { throw new Error() }

    this.carRepository.delete(id)
  }

  getById (id) {
    if (typeof id !== 'number') { throw new Error() }

    return this.carRepository.getById(id)
  }

  getAll () {
    return this.carRepository.getAll()
  }
}
