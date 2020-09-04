const Car = require('./car.entity')
const Joi = require('joi')

/**
 @returns {Car}
 */
function fromDbToEntity (carDto) {
  if (!carDto) { throw new Error('empty car data') }

  return new Car(
    carDto.id,
    carDto.brand,
    carDto.model,
    carDto.year_model,
    carDto.mileage,
    carDto.color,
    carDto.air_conditioning,
    carDto.number_passengers,
    carDto.autoamtic,
    carDto.active,
    carDto.price_per_week_in_cents,
    carDto.price_per_day_in_cents,
    carDto.created_at,
    carDto.updated_at
  )
}

/**
 * @returns {Car}
 */
function fromRequestToEntity (carDto) {
  const carSchema = Joi.object({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    year_model: Joi.number().min(1886).max(new Date().getFullYear()).required(),
    mileage: Joi.number().min(0).required(),
    color: Joi.string().required(),
    air_conditioning: Joi.number().max(1).min(0).required(),
    number_passengers: Joi.number().min(0).required(),
    autoamtic: Joi.number().max(1).min(0).required(),
    active: Joi.number().max(1).min(0).required(),
    price_per_week_in_dollars: Joi.number().min(1).required(),
    price_per_day_in_dollars: Joi.number().min(1).required()
  })

  const { error } = carSchema.validate(carDto, {
    stripUnknown: true,
    skipFunctions: true
  })

  if (error) { throw error } else {
    return new Car(
      null,
      carDto.brand,
      carDto.model,
      carDto.year_model,
      carDto.mileage,
      carDto.color,
      carDto.air_conditioning,
      carDto.number_passengers,
      carDto.autoamtic,
      carDto.active,
      Math.trunc(carDto.price_per_week_in_dollars * 100),
      Math.trunc(carDto.price_per_day_in_dollars * 100)
    )
  }
}

module.exports = {
  fromRequestToEntity,
  fromDbToEntity
}
