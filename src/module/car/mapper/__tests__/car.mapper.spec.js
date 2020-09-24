const Car = require('../../car.entity')
const {fromDbToEntity, fromHttpRequestToEntity} = require('../car.mapper')

describe('Car mappers', () => {
  describe('fromDbToEntity', () => {
    const {carFromDbDto} = require('../../__tests__/general-fixtures')
    const carInstance = fromDbToEntity(carFromDbDto)

    it('returns an instance of Car', () => {
      expect(carInstance).toBeInstanceOf(Car)
    })

    it('throw an error if pass falsy argument', () => {
      expect(fromDbToEntity).toThrow()
    })
  })

  describe('fromHttpRequestToEntity', () => {
    const {carFromHttpDto} = require('../../__tests__/general-fixtures')
    const carId = 3
    const imagePath = 'fake/image/path'

    const carInstance = fromHttpRequestToEntity(carFromHttpDto, imagePath, carId)

    it('returns an instance of Car', () => {
      expect(carInstance).toBeInstanceOf(Car)
    })

    it('throw an error if pass falsy argument', () => {
      expect(fromHttpRequestToEntity).toThrow()
    })
  })
})
