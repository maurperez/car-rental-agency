require('../types/car.dto')
const AbstractController = require('../../abstractController')
const { fromRequestToEntity } = require('../car.mapper')
const Joi = require('joi')
const InvalidId = require('./error/InvalidId')

module.exports = class CarController extends AbstractController {
  /**
   * @param {import('../car.service')} carService
   */
  constructor (carService) {
    super()
    this.carService = carService
    this.ROUT_BASE = '/car'
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  update (req, res) {
    const id = Number(req.params.id)

    try {
      this.validateId(id)
      const carDto = this.validateCarRequest(req.body)
      const carImagePath = req.file.path
      const carInstanceUpdated = this.carService.update(
        fromRequestToEntity(carDto, carImagePath, id)
      )
      res.json(carInstanceUpdated)
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        res.json(error.details)
      } else if (error instanceof InvalidId) {
        res.send(error)
      }
    }
  }

  create (req, res) {
    try {
      const carDto = this.validateCarRequest(req.body)
      const carImagePath = req.file.path
      const carInstanceCreated = this.carService.create(
        fromRequestToEntity(carDto, carImagePath)
      )
      res.json(carInstanceCreated)
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        res.json(error.details)
      }
    }
  }

  validateId (id) {
    const idType = Joi.number().integer().required()

    const { error } = idType.validate(id)

    if (error) {
      throw new InvalidId('the id will be a integer')
    }
  }

  /**
   * @returns {CarFromHttpDto}
   */
  validateCarRequest (bodyRequest) {
    const carSchema = Joi.object({
      brand: Joi.string().max(100),
      model: Joi.string().max(100),
      year_model: Joi.number().min(1886).max(new Date().getFullYear()).cast('number'),
      mileage: Joi.number().min(0).cast('number'),
      color: Joi.string().max(100),
      air_conditioning: Joi.number().max(1).min(0).cast('number'),
      number_passengers: Joi.number().min(1).max(20).cast('number'),
      autoamtic: Joi.number().max(1).min(0).cast('number'),
      active: Joi.number().max(1).min(0).cast('number'),
      price_per_week_in_dollars: Joi.number().min(1).cast('number'),
      price_per_day_in_dollars: Joi.number().min(1).cast('number')
    })

    const { value, error } = carSchema.validate(bodyRequest, {
      abortEarly: false,
      convert: true,
      presence: 'required'
    })

    if (error) {
      throw error
    } else {
      return value
    }
  }
}
