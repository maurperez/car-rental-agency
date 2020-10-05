const CarRepository = require('../car.repository')
const CarModel = require('../../../model/car.model')
const { Sequelize } = require('sequelize')
const {NonExistentCar} = require('../../../error/general-errors')
const {carCreation} = require('../../../__tests__/general-fixtures')
const Car = require('../../../car.entity')


describe('CarRepository', () => {
  let carRepository = new CarRepository(CarModel)

  beforeAll(async () => {
    const sequelize = new Sequelize('sqlite::memory', {logging: false})
    CarModel.setup(sequelize)
    await sequelize.sync()
  })

  describe('constructor', () => {
    it('sets the car model', () => {
      expect(carRepository.carModel).toBe(CarModel)
    })
  })

  describe('create', () => {
    let car
    beforeAll(async () => {
      car = await carRepository.create(carCreation)
    })

    it('returns an instance of the Car', async () => {
      expect(car).toBeInstanceOf(Car)
    })

    it('sets the id and timestamps', () => {
      expect(car.id).toBeDefined()
      expect(car.createdAt).toBeDefined()
      expect(car.updatedAt).toBeDefined()
    })

    it('exists in the database',async () => {
      expect(await CarModel.findByPk(car.id)).toBeTruthy()
    })

    afterAll(() => CarModel.destroy({where: {}}))
  }) 

  describe('update', () => {
    let carModelInstance
    beforeAll( async () => {
      carModelInstance = await CarModel.create(carCreation, {isNewRecord: true})
    })

    it('updates persist', async () => {
      const NEW_COLOR = 'red'
      await carRepository.update({...carCreation, id: carModelInstance.id, color: NEW_COLOR})

      const carUpdated = await CarModel.findByPk(carModelInstance.id)
      expect(carUpdated.color).toBe(NEW_COLOR)
    })

    afterAll(() => CarModel.destroy({where: {}}))
  })

  
  describe('delete', () => {
    let carModelInstance
    beforeAll(async () => {
      carModelInstance = await CarModel.create(carCreation, {isNewRecord: true})
    })

    it('deletes the created car', async () => {
      await carRepository.delete(carModelInstance.id)

      CarModel.findByPk(carModelInstance.id)
        .then(car => expect(car).toBeNull())
    })

    afterAll(() => CarModel.destroy({where: {}}))
  })

  
  describe('getById', () => {
    let carModelInstance
    beforeAll(async () => {
      carModelInstance = await CarModel.create(carCreation, {isNewRecord: true})
    })

    it('gets the created car', async () => {
      const carCreated = await carRepository.getById(carModelInstance.id)
      expect(carCreated).toBeTruthy()
    })

    it('returns a instance of Car class', async () => {
      const carCreated = await carRepository.getById(carModelInstance.id)
      expect(carCreated).toBeInstanceOf(Car)
    })

    it('tries to get non-exsitent car throw an error',async () => {
      try {
        await carRepository.getById(-500)
      } catch (error) {
        expect(error).toBeInstanceOf(NonExistentCar)
      }
    })

    afterAll(() => CarModel.destroy({where: {}}))
  })

  describe('getAll', () => {
    const carsToCreate = 5
    let carsCreated
    beforeAll(async () => {
      for (let idx = 0; idx < carsToCreate; idx++) {
        await CarModel.create(carCreation, {isNewRecord: true})
      }

      carsCreated = await carRepository.getAll()
    })

    it('returns an array with all cars', () => {
      expect(Array.isArray(carsCreated)).toBe(true)
      expect(carsCreated.length).toBe(carsToCreate)
    })

    it('every element in the returned array it is an instance of Car class', () => {
      expect(carsCreated.every(car => car instanceof Car)).toBe(true)
    })
  })

  afterAll(() => CarModel.destroy({where: {}}))
})
