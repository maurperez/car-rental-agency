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
    app.post(`${this.ROUT_BASE}/:id/update`, this.uploadMiddleware.single('image-url'), this.update.bind(this))
    app.get(this.ROUT_BASE, this.getAllCars.bind(this))
    app.get(`${this.ROUT_BASE}/:id/update`, this.validateId, this.renderForm.bind(this))
    app.get(`${this.ROUT_BASE}/create`, this.renderForm.bind(this))
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
      console.log(fromRequestToEntity(carDto, carImagePath))
      const carInstanceCreated = this.carService.create(
        fromRequestToEntity(carDto, carImagePath)
      )
      res.json(carInstanceCreated)
      res.end()
    } catch (error) {
      console.log(error)
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
  getAllCars (req, res) {
    const cars = this.carService.getAll()

    res.render('car/view/car-list', {
      data: { cars }
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
      res.render('car/view/add-car-form', {
        data: { car }
      })
    } else {
      res.render('car/view/add-car-form')
    }
  }

  validateId (req, res, next) {
    const id = req.params.id
    const idType = Joi.number().integer().required()

    const { error } = idType.validate(id)

    if (error) {
      res.send(400)
      res.redirect('/car')
    } else {
      next()
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
