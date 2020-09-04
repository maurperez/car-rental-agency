const AbstractController = require('../abstractController')
const { fromRequestToEntity } = require('./car.mapper')
const Joi = require('joi')
const InvalidId = require('./controller/error/InvalidId')

module.exports = class CarController extends AbstractController {
  /**
   * @param {import('./car.service')} carService
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
  create (req, res) {
    try {
      const car = fromRequestToEntity(req.body)
      this.carService.create(car)
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        res.status(400)
      } else {
        res.status(500)
      }
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  update (req, res) {
    const id = Number(req.params.id)

    try {
      this.validateId()
      const car = fromRequestToEntity(req.body)
      const carUpdated = this.carService.update(1, car)
      res.status(200)
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        res.status(400)
      } else if (error instanceof InvalidId) {
        res.status(400)
      } else {
        res.status(500)
      }
    }
  }

  validateId (id) {
    const idType = Joi.number().integer().required()

    const { error } = idType.validate(id)

    if (error) {
      throw new InvalidId(id)
    } else { return true }
  }
}
