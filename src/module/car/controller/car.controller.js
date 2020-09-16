require('../types/car.dto')
const AbstractController = require('../../abstract-controller')
const Joi = require('joi')
const {
  NonExistentCar,
  CarAlredyRented,
  CarInactive,
} = require('../error/general-errors')

module.exports = class CarController extends AbstractController {
  /**
   * @param {import('../car.service')} carService
   */
  constructor(uploadMultipartMiddleware, urlencodedParser, carService) {
    super()
    this.uploadMultipartMiddleware = uploadMultipartMiddleware
    this.urlencodedParser = urlencodedParser
    this.carService = carService
    this.ROUT_BASE = '/car'
  }

  /** @param {import('express').Application} app */
  configureRoutes(app) {
    app.get(`${this.ROUT_BASE}`, this.renderHome.bind(this))
    app.get(`${this.ROUT_BASE}/create`, this.create.bind(this))
    app.post(
      `${this.ROUT_BASE}/create`,
      this.uploadMultipartMiddleware.single('image-url'),
      this.create.bind(this)
    )
    app.get(`${this.ROUT_BASE}/rented`, this.getRentedCars.bind(this))
    app.get(`${this.ROUT_BASE}/available`, this.getAvailableCars.bind(this))
    app.get(
      `${this.ROUT_BASE}/:id`,
      this.validateExistentClub.bind(this),
      this.getById.bind(this)
    )
    app.get(
      `${this.ROUT_BASE}/:id/update`,
      this.validateExistentClub.bind(this),
      this.update.bind(this)
    )
    app.post(
      `${this.ROUT_BASE}/:id/update`,
      this.validateExistentClub.bind(this),
      this.uploadMultipartMiddleware.single('image-url'),
      this.update.bind(this)
    )
    app.post(
      `${this.ROUT_BASE}/:id/delete`,
      this.validateExistentClub.bind(this),
      this.delete.bind(this)
    )
    app.post(
      `${this.ROUT_BASE}/:id/rent`,
      this.validateExistentClub.bind(this),
      this.urlencodedParser,
      this.rent.bind(this)
    )
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  create(req, res) {
    const path = req.path
    const method = req.method
    const session = req.session

    if (method === 'GET') {
      res.render('car/view/car-form', {
        data: {
          error: session.error,
          message: session.message,
        },
      })

      this.cleanSessionErrorsAndMessages(session)
    } else if (method === 'POST') {
      try {
        const carDto = this.validateCarRequest(req.body)
        const imagePath = req.file.path
        const carInstance = this.carService.create(carDto, imagePath)
        session.message = 'Car created sucessfully'
        res.redirect(`${this.ROUT_BASE}/${carInstance.id}`)
      } catch (error) {
        if (error instanceof Joi.ValidationError) {
          session.error = error.details.map(error => error.message)
        } else {
          session.error = 'Internal Server Error, please try later'
        }
        res.redirect(path)
      }
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  update(req, res) {
    const id = req.params.id
    const path = req.path
    const method = req.method
    const session = req.session

    if (method === 'GET') {
      const car = this.carService.getById(id)

      res.render('car/view/car-form', {
        data: {
          car,
          error: session.error,
          message: session.message,
        },
      })

      this.cleanSessionErrorsAndMessages(session)
    } else if (method === 'POST') {
      try {
        const carDto = this.validateCarRequest(req.body)
        const carImagePath = req.file?.path
        this.carService.update(id, carDto, carImagePath)
        session.message = 'Car updated sucessfully'
        res.redirect(`${this.ROUT_BASE}/${id}`)
      } catch (error) {
        if (error instanceof Joi.ValidationError) {
          session.error = error.details.map(error => error.message)
        } else {
          session.error = 'Internal Server Error, please try later'
        }
        res.redirect(path)
      }
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  delete(req, res) {
    const id = req.params.id
    const session = req.session

    this.carService.delete(id)

    session.message = `car with id ${id} deleted sucessfully`
    res.status(202)
    res.redirect(`${this.ROUT_BASE}/available`)
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  rent(req, res) {
    const session = req.session
    const id = req.params.id
    const daysToRent = Number(req.body['rent-days'])

    try {
      this.carService.rent(id, daysToRent)
      session.message = 'car rented sucessfully'
      res.redirect(`${this.ROUT_BASE}/${id}`)
    } catch (error) {
      if (error instanceof CarAlredyRented) {
        session.error = error.message
      } else if (error instanceof CarInactive) {
        session.error = error.message
      } else {
        session.error = 'Internal Server Error, please try later'
      }

      res.redirect(`${this.ROUT_BASE}/${id}`)
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  renderHome(req, res) {
    const session = req.session
    const cars = this.carService.getAll()

    res.render('car/view/home', {
      data: {
        cars,
        error: session.error,
        message: session.message,
      },
    })

    this.cleanSessionErrorsAndMessages(session)
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getAvailableCars(req, res) {
    const session = req.session
    const cars = this.carService.getAllAvailableCars()

    res.render('car/view/car-list', {
      data: {
        cars,
        error: session.error,
        message: session.message,
      },
    })

    this.cleanSessionErrorsAndMessages(session)
  }

  getRentedCars(req, res) {
    const session = req.session
    const cars = this.carService.getRentedCars()

    res.render('car/view/car-list', {
      data: {
        cars,
        error: session.error,
        message: session.message,
      },
    })

    this.cleanSessionErrorsAndMessages(session)
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getById(req, res) {
    const id = req.params.id
    const session = req.session
    const car = this.carService.getById(id)

    res.render('car/view/view-one-car', {
      data: {
        car,
        error: session.error,
        message: session.message,
      },
    })

    this.cleanSessionErrorsAndMessages(session)
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
