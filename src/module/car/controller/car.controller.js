require('../types/car.dto')
const AbstractController = require('../../abstractController')
const Joi = require('joi')
const InvalidId = require('./error/InvalidId')

module.exports = class CarController extends AbstractController {
  /**
   * @param {import('../car.service')} carService
   */
  constructor(uploadMiddleware, carService) {
    super()
    this.uploadMiddleware = uploadMiddleware
    this.carService = carService
    this.ROUT_BASE = '/car'
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    app.get(this.ROUT_BASE, this.getAllAvailableCars.bind(this))
    app.get(`${this.ROUT_BASE}/create`, this.create.bind(this))
    app.post(
      `${this.ROUT_BASE}/create`,
      this.uploadMiddleware.single('image-url'),
      this.create.bind(this)
    )
    app.get(`${this.ROUT_BASE}/rented`, this.getRentedCars.bind(this))
    app.get(`${this.ROUT_BASE}/:id`, this.getById.bind(this))
    app.get(
      `${this.ROUT_BASE}/:id/update`,
      this.validateExistentClub.bind(this),
      this.update.bind(this)
    )
    app.post(
      `${this.ROUT_BASE}/:id/update`,
      this.validateExistentClub.bind(this),
      this.uploadMiddleware.single('image-url'),
      this.update.bind(this)
    )
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  create(req, res) {
    const method = req.method

    if (method === 'GET') {
      res.render('car/view/car-form')
    } else if (method === 'POST') {
      const carDto = this.validateCarRequest(req.body)
      const imagePath = req.file.path
      const carInstance = this.carService.create(carDto, imagePath)

      res.redirect(`/car/${carInstance.id}`)
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  update(req, res) {
    const id = Number(req.params.id)

    if (req.method === 'GET') {
      const car = this.carService.getById(id)

      res.render('car/view/car-form', {
        data: {car},
      })
    } else if (req.method === 'POST') {
      const carDto = this.validateCarRequest(req.body)
      const carImagePath = req.file?.path
      this.carService.update(id, carDto, carImagePath)
      res.redirect(`/car/${id}`)
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getAllAvailableCars(req, res) {
    const cars = this.carService.getAllAvailableCars()

    res.render('car/view/car-list', {
      data: {cars},
    })
  }

  getRentedCars(req, res) {
    const cars = this.carService.getRentedCars()

    res.render('car/view/car-list', {
      data: {cars},
    })
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getById(req, res) {
    const id = Number(req.params.id)
    const car = this.carService.getById(id)

    res.render('car/view/view-one-car', {
      data: {car},
    })
  }

  validateExistentClub(req, res, next) {
    const id = Number(req.params.id)
    console.log(id)

    try {
      this.carService.getById(id)
      next()
    } catch (error) {
      if (error instanceof InvalidId) res.redirect('/car')
    }
  }

  /**
   * @returns {CarFromHttpDto}
   */
  validateCarRequest(bodyRequest) {
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
      price_per_day_in_dollars: Joi.number().min(1),
    })

    const {value, errors} = carSchema.validate(bodyRequest, {
      abortEarly: false,
      convert: true,
      presence: 'required',
    })

    if (errors) {
      throw errors
    } else {
      return value
    }
  }
}
