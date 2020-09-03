const Car = require('./car.entity')

/**
 @returns {import('./car.entity')}
 */
module.exports = function fromDbToEntity (carData) {
  if (!carData) { throw new Error('empty car data') }

  return new Car(
    carData.id,
    carData.brand,
    carData.model,
    carData.year_model,
    carData.mileage,
    carData.color,
    carData.air_conditioning,
    carData.number_passengers,
    carData.autoamtic,
    carData.created_at,
    carData.updated_at
  )
}
