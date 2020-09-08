require('../types/car.dto')
const AbstractController = require('../../abstractController')
const { fromRequestToEntity } = require('../car.mapper')
const Joi = require('joi')
const InvalidId = require('./error/InvalidId')

module.exports = class CarController extends AbstractController {
  /**
   * @param {import('../car.service')} carService
   */
  constructor (uploadMiddleware, carService) {
    super()
    this.uploadMiddleware = uploadMiddleware
    this.carService = carService
    this.ROUT_BASE = '/car'
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes (app) {
    app.post(`${this.ROUT_BASE}/create`, this.uploadMiddleware.single('image-url'), this.create.bind(this))
    app.get(this.ROUT_BASE, this.getAllAvailableCars.bind(this))
    app.get(`${this.ROUT_BASE}/rented`, this.getRentedCars.bind(this))
    app.get(`${this.ROUT_BASE}/create`, this.renderForm.bind(this))
    app.get(`${this.ROUT_BASE}/:id`, this.getById.bind(this))
  }

  create (req, res) {
    try {
      const carDto = this.validateCarRequest(req.body)
      const carImagePath = req.file.path
      console.log(fromRequestToEntity(carDto, carImagePath))
      const carInstanceCreated = this.carService.create(
        fromRequestToEntity(carDto, carImagePath)
      )
      res.json(carInstanceCreated)
      res.end()
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        res.json(error)
        res.end()
      } else {
        res.end()
      }
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
  */
  getAllAvailableCars (req, res) {
    const cars = this.carService.getAllAvailableCars()

    res.render('car/view/car-list', {
      data: { cars }
    })
  }

  getRentedCars (req, res) {
    const cars = this.carService.getRentedCars()

    res.render('car/view/car-list', {
      data: { cars }
    })
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
  */
  getById (req, res) {
    const id = Number(req.params.id)
    const car = this.carService.getById(id)

    res.render('car/view/view-one-car', {
      data: { car }
    })
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  renderForm (req, res) {
    const id = req.params.id

    if (id) {
      const car = this.carService.getById(id)
      res.render('car/view/car-form', {
        data: { car }
      })
    } else {
      res.render('car/view/car-form')
    }
  }

  /**
   * @returns {CarFromHttpDto}
   */
  validateCarRequest (bodyRequest) {
    const carSchema = Joi.object({
      brand: Joi.string().max(100),
      model: Joi.string().max(100),
      model_year: Joi.number().min(1886).max(new Date().getFullYear()),
      mileage: Joi.number().min(0),
      color: Joi.string().max(100),
      air_conditioning: Joi.number().max(1).min(0),
      number_passengers: Joi.number().min(1).max(20),
      automatic: Joi.number().max(1).min(0),
      price_per_week_in_dollars: Joi.number().min(1),
      price_per_day_in_dollars: Joi.number().min(1)
    })

    const { value, errors } = carSchema.validate(bodyRequest, {
      abortEarly: false,
      convert: true,
      presence: 'required'
    })

    if (errors) {
      throw errors
    } else {
      return value
    }
  }
}
