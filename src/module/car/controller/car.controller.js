const AbstractController = require("../../abstract-controller")
const  { NonExistentCar } = require('../error/general-errors')
const Joi = require('joi')
const { create } = require('./actions/create.action')
const { index, getById, getRented, getAvailable } = require('./actions/get.action')
const { update } = require('./actions/update.action')
const { deleteCar } = require('./actions/delete.action')
const { rent } = require('./actions/rent.action')

module.exports = class CarController extends AbstractController {
  constructor(uploadMultipartMiddleware, urlencodedParser, carService) {
    super()
    this.uploadMultipartMiddleware = uploadMultipartMiddleware
    this.urlencodedParser = urlencodedParser
    this.carService = carService
    this.ROUT_BASE = '/car'

    this.index = index.bind(this)
    this.create = create.bind(this)
    this.getById = getById.bind(this)
    this.getRented = getRented.bind(this)
    this.getAvailable = getAvailable.bind(this)
    this.update = update.bind(this)
    this.delete = deleteCar.bind(this)
    this.rent = rent.bind(this)
  }

  /**
   * @param {import('express').Application} app 
   */
  configureRoutes(app){
    app.get(this.ROUT_BASE, this.index)
    app.get(`${this.ROUT_BASE}/rented`, this.getRented)
    app.get(`${this.ROUT_BASE}/available`, this.getAvailable)
    app.get(`${this.ROUT_BASE}/create`, this.create)
    app.post(
      `${this.ROUT_BASE}/create`,
      this.uploadMultipartMiddleware.single('image-url'),
      this.create
    )
    app.get(
      `${this.ROUT_BASE}/:id`,
      this.validateExistentClub.bind(this),
      this.getById
    )
    app.get(
      `${this.ROUT_BASE}/:id/update`,
      this.validateExistentClub.bind(this),
      this.update
    )
    app.post(
      `${this.ROUT_BASE}/:id/update`,
      this.validateExistentClub.bind(this),
      this.uploadMultipartMiddleware.single('image-url'),
      this.update
    )
    app.post(
      `${this.ROUT_BASE}/:id/delete`,
      this.validateExistentClub.bind(this),
      this.delete
    )
    app.post(
      `${this.ROUT_BASE}/:id/rent`,
      this.validateExistentClub.bind(this),
      this.urlencodedParser,
      this.rent
    )

  }

  validateExistentClub(req, res, next) {
    const id = req.params.id

    try {
      this.carService.getById(id)
      next()
    } catch (error) {
      if (error instanceof NonExistentCar) {
        res.status(404).render('car/view/not-found-404')
      }
    }
  }

  /** @returns {CarFromHttpRequestDto} */
  validateCarRequest(bodyRequest) {
    const actualYear = new Date().getFullYear()

    const errorsDescriptions = {
      brand: 'the brand cannot have more than 100 characters',
      model: 'the model cannot have more than 100 characters',
      model_year: `The model year cannot be less than 1886, nor greater than ${actualYear}`,
      mileage: 'The milleage cant be less than zero',
      color: 'the color cannot have more than 100 characters',
      number_passengers: 'the number of passengers cannot be greater than 20',
      price_per_week_in_dollars:
        'the price per week must be greater than or equal to 1',
      price_per_day_in_dollars:
        'the price per day must be greater than or equal to 1',
    }

    const carSchema = Joi.object({
      brand: Joi.string().max(100).message(errorsDescriptions.brand),
      model: Joi.string().max(100).message(errorsDescriptions.model),
      model_year: Joi.number()
        .min(1886)
        .message(errorsDescriptions.model_year)
        .max(actualYear)
        .message(errorsDescriptions.model_year),
      mileage: Joi.number().min(0).message(errorsDescriptions.mileage),
      color: Joi.string().max(100).message(errorsDescriptions.color),
      air_conditioning: Joi.number().max(1).min(0),
      number_passengers: Joi.number()
        .min(1)
        .message(errorsDescriptions.number_passengers)
        .max(20)
        .message(errorsDescriptions.number_passengers),
      automatic: Joi.number().max(1).min(0),
      price_per_week_in_dollars: Joi.number()
        .min(1)
        .message(errorsDescriptions.price_per_week_in_dollars),
      price_per_day_in_dollars: Joi.number()
        .min(1)
        .message(errorsDescriptions.price_per_day_in_dollars),
    })

    const {value, error} = carSchema.validate(bodyRequest, {
      abortEarly: false,
      convert: true,
      presence: 'required',
    })

    if (error) {
      throw error
    } else {
      return value
    }
  }

  cleanSessionErrorsAndMessages(session) {
    session.error = null
    session.message = null
  }

}