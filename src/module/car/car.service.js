const { fromHttpRequestToEntity } = require('./car.mapper')
const { CarAlredyRented, CarInactive } = require('./error/general-errors')

module.exports = class CarService {
  /**
   * @param {import('./repository/abstract-repository')} carRepository
   */
  constructor (carRepository) {
    this.carRepository = carRepository
  }

  /**
   * @param {CarFromHttpRequestDto} carDto
   * @param {string} imagePath
   */
  create (carDto, imagePath) {
    const car = fromHttpRequestToEntity(carDto, imagePath)
    return this.carRepository.create(car)
  }

  /**
   * @param {number} id
   * @param {CarFromHttpRequestDto} carDto
   * @param {string} imagePath
   */
  update (id, carDto, imagePath) {
    const carUpdate = fromHttpRequestToEntity(carDto, imagePath, id)
    const carInstance = this.getById(id)
    
    Object.keys(carUpdate).forEach(key => {
      carUpdate[key] && (carInstance[key] = carUpdate[key])
    })

    this.carRepository.update(carInstance)
  }

  /**
   * @param {Number} id
   */
  delete (id) {
    this.carRepository.delete(id)
  }
  
  /**
   * @param {number} id 
   * @param {number} daysToRent 
   */
  rent(id, daysToRent){
    const carInstance = this.carRepository.getById(id)

    if(carInstance.rented === 1) {throw new CarAlredyRented()}
    else if(carInstance.active === 0) {throw new CarInactive()}

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
    return this.carRepository.getById(id)
  }

  /**
   * @description return all cars: availables, rented, and inactives
   * @returns {Car[]}
   */
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
