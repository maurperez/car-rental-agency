require('./types/car.dto')
const Car = require('./car.entity')

/**
 * @returns {Car}
 * @param {CarFromDbDto} carDto
 */
function fromDbToEntity (carDto) {
  if (!carDto) { throw new Error('empty car data') }

  return new Car(
    carDto.id,
    carDto.brand,
    carDto.model,
    carDto.model_year,
    carDto.image_url,
    carDto.mileage,
    carDto.color,
    carDto.air_conditioning,
    carDto.number_passengers,
    carDto.autoamtic,
    carDto.active,
    carDto.rented,
    carDto.return_date,
    carDto.price_per_week_in_cents,
    carDto.price_per_day_in_cents,
    carDto.created_at,
    carDto.updated_at
  )
}

/**
 * @param {CarFromHttpDto} carDto
 * @param {String} imageUrl
 * @param {number} [id]
 * @returns {Car}
 */
function fromRequestToEntity (carDto, imageUrl, id) {
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
  fromRequestToEntity,
  fromDbToEntity
}
