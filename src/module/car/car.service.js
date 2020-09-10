/**
 * @typedef {import('./repository/abstractCarRepository')} AbstractCarRepository
 */
const { fromRequestToEntity } = require('./car.mapper')

module.exports = class CarService {
  /**
   * @param {AbstractCarRepository} carRepository
   */
  constructor (carRepository) {
    this.carRepository = carRepository
  }

  /**
   * @param {CarFromHttpDto} carDto
   * @param {string} imagePath
   */
  create (carDto, imagePath) {
    const car = fromRequestToEntity(carDto, imagePath)
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
    if (typeof id !== 'number') { throw new Error('id isnt number') }

    this.carRepository.delete(id)
  }
  
  /**
   * @param {number} id 
   * @param {number} daysToRent 
   */
  rent(id, daysToRent){
    if(typeof id !== 'number') { throw new Error('id isnt number')}

    const carInstance = this.carRepository.getById(id)

    carInstance.rented = 1
    carInstance.returnDate = this.addDaysToDate(Date.now(), daysToRent).toISOString()
    
    this.carRepository.update(carInstance)
  }

  /**
   * @param {Date | string | number} date 
   * @param {number} days 
   * @returns {Date}
   */
  addDaysToDate(date, days){
    const resultDate = new Date(date)
    resultDate.setDate(resultDate.getDate() + days)
    return resultDate
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
