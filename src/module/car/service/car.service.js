const {fromHttpRequestToEntity} = require('../mapper/car.mapper')
const {CarAlredyRented, CarInactive} = require('../error/general-errors')

module.exports = class CarService {
  /**
   * @param {import('./repository/abstract-repository')} carRepository
   */
  constructor(carRepository) {
    this.carRepository = carRepository
  }

  /**
   * @param {CarFromHttpRequestDto} carDto
   * @param {string} imagePath
   */
  async create(carDto, imagePath) {
    const car = fromHttpRequestToEntity(carDto, imagePath)
    return this.carRepository.create(car)
  }

  /**
   * @param {number} id
   * @param {CarFromHttpRequestDto} carDto
   * @param {string} imagePath
   */
  async update(id, carDto, imagePath) {
    const carUpdate = fromHttpRequestToEntity(carDto, imagePath, id)
    const carInstance = await this.getById(id)

    Object.keys(carUpdate).forEach(key => {
      carUpdate[key] && (carInstance[key] = carUpdate[key])
    })

    console.log(carUpdate)
    this.carRepository.update(carInstance)
  }

  /**
   * @param {Number} id
   */
  async delete(id) {
    this.carRepository.delete(id)
  }

  /**
   * @param {number} id
   * @param {number} daysToRent
   */
  async rent(id, daysToRent) {
    const carInstance = await this.carRepository.getById(id)

    if (carInstance.rented === 1) {
      throw new CarAlredyRented()
    } else if (carInstance.active === 0) {
      throw new CarInactive()
    }

    carInstance.rented = 1
    carInstance.returnDate = this.addDaysToDate(
      Date.now(),
      daysToRent
    ).toISOString()

    this.carRepository.update(carInstance)
  }

  /**
   * @param {Date | string | number} date
   * @param {number} days
   * @returns {Date}
   */
  addDaysToDate(date, days) {
    const resultDate = new Date(date)
    resultDate.setDate(resultDate.getDate() + days)
    return resultDate
  }

  /**
   * @param {Number} id
   */
  async getById(id) {
    return this.carRepository.getById(id)
  }

  /**
   * @description return all cars: availables, rented, and inactives
   * @returns {Car[]}
   */
  async getAll() {
    return this.carRepository.getAll()
  }

  /**
   * @returns {Car[]}
   */
  async getAllAvailableCars() {
    const allCars = await this.getAll()
    const allActiveCars = []

    allCars.forEach(car => {
      if (car.active === 1 && car.rented === 0) allActiveCars.push(car)
    })

    return allActiveCars
  }

  async getRentedCars() {
    const allCars = await this.getAll()
    const rentedCars = []

    allCars.forEach(car => {
      if (car.rented === 1) rentedCars.push(car)
    })

    return rentedCars
  }
}
