const fs = require('fs')
const CarRepository = require('../car.repository')
const {NonExistentCar} = require('../../../error/general-errors')
const Sqlite3Database = require('better-sqlite3')
const migration = fs.readFileSync('./src/config/setup.tests.sqlite', 'utf-8')
const {carCreation} = require('../../../__tests__/general-fixtures')
const Car = require('../../../car.entity')

let mockDb = new Sqlite3Database(':memory:')

const carRepository = new CarRepository(mockDb)

describe('CarRepository', () => {
  describe('constructor', () => {
    it('sets the database adapter', () => {
      expect(carRepository.databaseAdapter).toBe(mockDb)
    })
  })

  describe('create', () => {
    let car
    beforeAll(() => {
      mockDb.exec(migration)
      car = carRepository.create(carCreation)
    })

    it('applies the id and timestamps to the new club', () => {
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

    it('updates the model year of the car', () => {
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

    it('deletes the created car', () => {
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

    it('gets the created car', () => {
      const carCreated = carRepository.getById(car.id)
      expect(carCreated.id).toBe(car.id)
    })

    it('returns a instance of Car class', () => {
      const carCreated = carRepository.getById(car.id)
      expect(carCreated).toBeInstanceOf(Car)
    })

    it('tries to get non-exsitent car throw an error', () => {
      try {
        carRepository.getById(-500)
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

    it('every element in the returned array it is an instance of Car class', () => {
      expect(carsCreated.every(car => car instanceof Car)).toBe(true)
    })
  })

  afterAll(mockDb.close)
})
