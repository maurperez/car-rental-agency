const Car = require('../car.entity')

/**
 * @returns {Car}
 * @param {CarFromDbDto} carDto
 */
function fromModelToEntity(carDto) {
  if (!carDto) {
    throw new Error('empty car data')
  }

  return new Car(
    carDto.id,
    carDto.brand,
    carDto.model,
    carDto.yearOfModel,
    carDto.imageUrl,
    carDto.mileage,
    carDto.color,
    carDto.airConditioning,
    carDto.numberOfPassengers,
    carDto.automatic,
    carDto.active,
    carDto.rented,
    carDto.returnDate,
    carDto.pricePerWeekInCents,
    carDto.pricePerDayInCents,
    carDto.createdAt,
    carDto.updatedAt
  )
}

/**
 * @param {CarFromHttpRequestDto} carDto
 * @param {String} imageUrl
 * @param {number} [id]
 * @returns {Car}
 */
function fromHttpRequestToEntity(carDto, imageUrl, id) {
  if (!carDto) {
    throw new Error('empty car data')
  }

  return new Car(
    id,
    carDto.brand,
    carDto.model,
    carDto.model_year,
    imageUrl,
    carDto.mileage,
    carDto.color,
    carDto.air_conditioning,
    carDto.number_passengers,
    carDto.automatic,
    undefined,
    undefined,
    undefined,
    carDto.price_per_week_in_dollars * 100,
    carDto.price_per_day_in_dollars * 100
  )
}

module.exports = {
  fromHttpRequestToEntity,
  fromModelToEntity,
}
