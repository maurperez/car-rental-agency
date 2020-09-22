const fs = require('fs')
const CarRepository = require('../car.repository')
const {NonExistentCar} = require('../../../error/general-errors')
const Sqlite3Database = require('better-sqlite3')
const migration = fs.readFileSync('./src/config/setup.sqlite', 'utf-8')
const { carCreation } = require('../../../__tests__/fixtures')
const Car = require('../../../car.entity')


let mockDb = new Sqlite3Database(':memory:')

const carRepository = new CarRepository(mockDb)

describe('CarRepository', () => {
  describe('constructor', () => {
    it('set the database adapter', () => {
      expect(carRepository.databaseAdapter).toBe(mockDb)
    })
  })

  describe('create', () => {
    let car
    beforeAll(() => {
      mockDb.exec(migration)
      car = carRepository.create(carCreation)
    })

    it('apply the id and timestamps to new club', () => {
      expect(car.id).toBe(1)
      expect(typeof car.createdAt).toBe('string')
      expect(typeof car.updatedAt).toBe('string')
    })
  })

  describe('update', () => {
    let car
    beforeAll(() => {
      mockDb.exec(migration)
      car = carRepository.create(carCreation)
    })

    it('update the model year of the car', () => {
      car.yearOfModel = 2015
      carRepository.update(car)
      const carUpdated = carRepository.getById(car.id)

      expect(carUpdated.yearOfModel).toBe(2015)
    })
  })

  describe('delete', () => {
    let car
    beforeAll(() => {
      mockDb.exec(migration)
      car = carRepository.create(carCreation)
    })

    it('delete the created car', () => {
      carRepository.delete(car.id)
      
      try {
        carRepository.getById(car.id)
      } catch (error) {
        expect(error).toBeInstanceOf(NonExistentCar)
      }
    })
  })

  describe('getById', () => {
    let car
    beforeAll(() => {
      mockDb.exec(migration)
      car = carRepository.create(carCreation)
    })

    it('get the created car', () => {
      const carCreated = carRepository.getById(car.id)
      expect(carCreated.id).toBe(car.id)
    })

    it('return a instance of Car class', () => {
      const carCreated = carRepository.getById(car.id)
      expect(carCreated).toBeInstanceOf(Car)
    })

    it('try to get non-exsitent car throw an error', () => {
      try {
        carRepository.getById(500)
      } catch (error) {
        expect(error).toBeInstanceOf(NonExistentCar)
      }
    })
  })

  describe('getAll', () => {
    const carsToCreate = 5
    let carsCreated
    beforeAll(() => {
      mockDb.exec(migration)
      
      for (let idx = 0; idx < carsToCreate; idx++) {
        carRepository.create(carCreation)
      }

      carsCreated = carRepository.getAll()
    })

    it('returns an array with all cars', () => {
      expect(Array.isArray(carsCreated)).toBe(true)
      expect(carsCreated.length).toBe(carsToCreate)
    })
 
    it('every element in the returnded array should be an instance of Car class', () => {
      expect(carsCreated.every(car => car instanceof Car)).toBe(true)
    })
  })
})
