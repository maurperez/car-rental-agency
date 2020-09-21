const Car = require('../car.entity')
const { fromDbToEntity, fromHttpRequestToEntity} = require('../car.mapper')

describe('Car mappers', () => {
  describe('fromDbToEntity', () => {
    const { carFromDbDto } = require('./fixtures')
    const carInstance = fromDbToEntity(carFromDbDto)

    it('return an instance of Car', () => {
      expect(carInstance).toBeInstanceOf(Car)
    })

    it('throw an error if pass falsy argument', () => {
      expect(fromDbToEntity).toThrow()
    })
  })

  describe('fromHttpRequestToEntity', () => {
    const { carDto } = require('./fixtures')
    const carId = 3
    const imagePath = 'fake/image/path'

    const carInstance = fromHttpRequestToEntity(carDto, imagePath, carId)

    it('return an instance of Car', () => {
      expect(carInstance).toBeInstanceOf(Car)
    })

    it('throw an error if pass falsy argument', () => {
      expect(fromHttpRequestToEntity).toThrow()
    })
  })
})