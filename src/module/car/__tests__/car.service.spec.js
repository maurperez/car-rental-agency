jest.mock('../car.mapper')
const CarService = require('../car.service')
const {CarAlredyRented, CarInactive} = require('../error/general-errors')
const { fromHttpRequestToEntity } = require('../car.mapper')
const Car = require('../car.entity')

const mockCarRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getAll: jest.fn()
}

const carService = new CarService(mockCarRepository)

describe('CarService', () => {

  describe('constructor', () => {
    it('sets the passed dependencies correctly', () => {
      expect(carService.carRepository).toBe(mockCarRepository)
    })
  })

  describe('create', () => {
    const carDto = {brand: 'someoneBrand'}
    const imagePath = 'test/image/path'
    const carInstace = new Car()

    beforeAll(() => {
      fromHttpRequestToEntity.mockReturnValue(carInstace)

      carService.create(carDto, imagePath)
    })

    it('transform to entity', () => {
      expect(fromHttpRequestToEntity).toBeCalledWith(carDto, imagePath)
    })

    it('call create method of car repository with car instance returned by fromHttpRequestToEntity', () => {
      expect(mockCarRepository.create).toBeCalledWith(carInstace)
    })

    afterAll(() => jest.resetAllMocks())
  })

  describe('update', () => {
    const { carExistentInstance } = require('./fixtures')
    
    const updatedInstance = carExistentInstance
    updatedInstance.mileage = 9000
    updatedInstance.numberOfPassengers = 5

    const carID = 1
    const imagePath = 'test/image/path'
    const carDto = 'someone car dto'

    beforeAll(() => {
      mockCarRepository.getById.mockReturnValue(carExistentInstance)
      fromHttpRequestToEntity.mockReturnValue(updatedInstance)

      carService.update(carID, carDto, imagePath)
    })

    it('transform to entity', () => {
      expect(fromHttpRequestToEntity).toBeCalledWith(carDto, imagePath, carID)
    })

    it('get the existent car instance', () => {
      expect(mockCarRepository.getById).toBeCalledWith(carID)
    })

    it('call to update method of car repository with updated information', () => {
      const carPassed = mockCarRepository.update.mock.calls[0][0]

      expect(carPassed).toBeDefined()
      expect(carPassed.mileage).toBe(updatedInstance.mileage)
      expect(carPassed.numberOfPassengers).toBe(updatedInstance.numberOfPassengers)
    })

    it('doesnt alter the id', () => {
      const carPassed = mockCarRepository.update.mock.calls[0][0]
      expect(carPassed.id).toBe(carExistentInstance.id)
    })

    afterAll(() => jest.resetAllMocks())
  })

  describe('delete', () => {
    const carId = 5
    beforeAll(() => carService.delete(carId))

    it('call the delete method of carRepository with the id passed', () => {
      expect(mockCarRepository.delete).toBeCalledWith(carId)
    })

    afterAll(() => jest.resetAllMocks())
  })

  describe('rent', () => {
    const carId = 1
    const { nonRentedCar, rentedCar, inactiveCar } = require('./fixtures')

    describe('rent sucessfully', () => {

      beforeAll(() => {
        mockCarRepository.getById.mockReturnValue(nonRentedCar)
        carService.rent(carId, 3)
      })

      it('get an instance of the car', () => {
        expect(mockCarRepository.getById).toBeCalledWith(carId)
      })

      it('calls the update method of car repository', () => {
        expect(mockCarRepository.update).toBeCalledTimes(1)
      })

      it('set the rented state to 1 and return date', () => {
        const dateISOformatRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
        const carPassedToUpdate = mockCarRepository.update.mock.calls[0][0]

        expect(carPassedToUpdate.rented).toBe(1)
        expect(carPassedToUpdate.returnDate).toMatch(dateISOformatRegex)
      })
      afterAll(jest.resetAllMocks)
    })

    describe('try to update alredy rented car', () => {
      beforeAll(() => {
        mockCarRepository.getById.mockReturnValue(rentedCar)
      })

      it('throw CarAlredyRented exception', () => {
        expect(carService.rent.bind(carService, carId, 5)).toThrow(CarAlredyRented)
      })

      afterAll(jest.resetAllMocks)
    })

    describe('try to update inactive car', () => {
      beforeAll(() => {
        mockCarRepository.getById.mockReturnValue(inactiveCar)
      })

      it('throw CarInactive exception', () => {
        expect(carService.rent.bind(carService, carId, 5)).toThrow(CarInactive)
      })

      afterAll(jest.resetAllMocks)
    })

  })

  describe('getById', () => {
    const carId = 5
    let carReturned
    beforeAll(() => {
      mockCarRepository.getById.mockReturnValue('someone car')
      carReturned = carService.getById(carId)
    })

    it('call the getById method of carRepository with the id', () => {
      expect(mockCarRepository.getById).toBeCalledWith(carId)
    })

    it('returns the car', () => {
      expect(carReturned).toBe(mockCarRepository.getById())
    })

    afterAll(jest.clearAllMocks)
  })

  describe('getAll', () => {
    let carsReturned
    beforeAll(() => {
      mockCarRepository.getAll.mockReturnValue(['someone car', 'another car'])
      carsReturned = carService.getAll()
    })

    it('call the getAll method of carRepository with the id', () => {
      expect(mockCarRepository.getAll).toBeCalled()
    })

    it('returns the cars', () => {
      expect(carsReturned).toBe(mockCarRepository.getAll())
    })

    afterAll(jest.clearAllMocks)
  })

  describe('getAllAvailableCars', () => {
    const { carExistentInstance, inactiveCar, rentedCar} = require('./fixtures')
    let carsReturned

    beforeAll(() => {
      mockCarRepository.getAll.mockReturnValue([carExistentInstance, inactiveCar, rentedCar])
      carsReturned = carService.getAllAvailableCars()
    })

    it('call the getAll method of carRepository with the id', () => {
      expect(mockCarRepository.getAll).toBeCalled()
    })

    it('return only the availables cars', () => {
      expect(carsReturned).toContain(carExistentInstance)
      expect(carsReturned).not.toContain(inactiveCar)
      expect(carsReturned).not.toContain(rentedCar)
    })

    afterAll(jest.resetAllMocks)
  })

  describe('getRentedCars', () => {
    const { carExistentInstance, rentedCar} = require('./fixtures')
    let carsReturned

    beforeAll(() => {
      mockCarRepository.getAll.mockReturnValue([carExistentInstance, rentedCar])
      carsReturned = carService.getRentedCars()
    })

    it('call the getAll method of carRepository with the id', () => {
      expect(mockCarRepository.getAll).toBeCalled()
    })

    it('return only the rented cars', () => {
      expect(carsReturned).not.toContain(carExistentInstance)
      expect(carsReturned).toContain(rentedCar)
    })

    afterAll(jest.resetAllMocks)
  })

})

