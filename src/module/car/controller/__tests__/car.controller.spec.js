
const CarController = require('../car.controller')
const { NonExistentCar } = require('../../error/general-errors')
const Joi = require('joi')


const mockUploadMultipartMiddleware = {single: jest.fn()}
const mockUrlEncodedParser = jest.fn()
const mockCarService = {
  getById: jest.fn()
}

const carController = new CarController(
  mockUploadMultipartMiddleware,
  mockUrlEncodedParser,
  mockCarService
)

const mockExpressApp = {
  get: jest.fn(),
  post: jest.fn()
}

describe('car controller', () => {

  describe('constructor', () => {

    it('sets the necessary dependencies correctly', () => {
      expect(carController.uploadMultipartMiddleware).toBe(mockUploadMultipartMiddleware)
      expect(carController.urlencodedParser).toBe(mockUrlEncodedParser)
      expect(carController.carService).toBe(mockCarService)
    })

    it('sets the action methods and bind them', () => {
      expect(carController.create.name).toBe('bound create')
      expect(carController.delete.name).toBe('bound deleteCar')
      expect(carController.getAvailable.name).toBe('bound getAvailable')
      expect(carController.getById.name).toBe('bound getById')
      expect(carController.getRented.name).toBe('bound getRented')
      expect(carController.index.name).toBe('bound index')
      expect(carController.update.name).toBe('bound update')
      expect(carController.rent.name).toBe('bound rent')
    })
  })

  describe('configureRoutes', () => {
    beforeAll(() => {
      return carController.configureRoutes(mockExpressApp)
    })

    it('set the index route', () => {
      expect(mockExpressApp.get).nthCalledWith(1, carController.ROUT_BASE, carController.index)
    })

    it('set the rented cars route', () => {
      expect(mockExpressApp.get).nthCalledWith(
        2,
        `${carController.ROUT_BASE}/rented`,
        carController.getRented
      )
    })

    it('set the available cars route', () => {
      expect(mockExpressApp.get).nthCalledWith(
        3,
        `${carController.ROUT_BASE}/available`,
        carController.getAvailable
      )
    })

    it('set the create car route', () => {
      expect(mockExpressApp.get).nthCalledWith(
        4,
        `${carController.ROUT_BASE}/create`,
        carController.create
      )

      expect(mockExpressApp.post).nthCalledWith(
        1,
        `${carController.ROUT_BASE}/create`,
        carController.uploadMultipartMiddleware.single('image-url'),
        carController.create
      )
    })

    it('set the unique car page', () => {
      expect(mockExpressApp.get).nthCalledWith(
        5,
        `${carController.ROUT_BASE}/:id`,
        expect.any(Function),
        carController.getById
      )

      expect(mockExpressApp.get.mock.calls[4][1].name).toBe('bound validateExistentClub')
    })

    it('set the update car route', () => {
      expect(mockExpressApp.get).nthCalledWith(
        6,
        `${carController.ROUT_BASE}/:id/update`,
        expect.any(Function),
        carController.update
      )

      expect(mockExpressApp.post).nthCalledWith(
        2,
        `${carController.ROUT_BASE}/:id/update`,
        expect.any(Function),
        carController.uploadMultipartMiddleware.single('image-url'),
        carController.update
      )

      expect(mockExpressApp.post.mock.calls[2][1].name).toBe('bound validateExistentClub')
      expect(mockExpressApp.get.mock.calls[5][1].name).toBe('bound validateExistentClub')
    })

    it('set the delete route', () => {
      expect(mockExpressApp.post).nthCalledWith(
        3,
        `${carController.ROUT_BASE}/:id/delete`,
        expect.any(Function),
        carController.delete
      )
      expect(mockExpressApp.post.mock.calls[2][1].name).toBe('bound validateExistentClub')
    })

    it('set the rent route', () => {
      expect(mockExpressApp.post).nthCalledWith(
        4,
        `${carController.ROUT_BASE}/:id/rent`,
        expect.any(Function),
        carController.urlencodedParser,
        carController.rent
      )
      expect(mockExpressApp.post.mock.calls[3][1].name).toBe('bound validateExistentClub')
    })

  })

  describe('validateExistentClub', () => {

    describe('gets a club that exists', () => {
      const carID = 1
      const req = {
        params: {
          id: carID
        }
      }
      const res = {}
      const next = jest.fn()

      beforeAll(() => {
        return carController.validateExistentClub(req, res, next)
      })

      it('call the getById method of car service', () => {
        expect(mockCarService.getById).toBeCalledWith(carID)
      })

      it('call next function', () => {
        expect(next).toBeCalledTimes(1)
      })
    })

    describe('get non-existent car', () => {
      const carID = 1
      const req = {
        params: {
          id: carID
        }
      }
      const res = {
        status: jest.fn(),
        render: jest.fn()
      }
      const next = jest.fn()

      beforeAll(() => {
        mockCarService.getById.mockImplementation(() => {
          throw new NonExistentCar()
        })

        return carController.validateExistentClub(req, res, next)
      })

      it('render not-found-404 and set status code to 404',() => {
        expect(res.status).toBeCalledWith(404)
        expect(res.render).toBeCalledWith('car/view/not-found-404')
      })

      it('dont call next function', () => {
        expect(next).not.toBeCalled()
      })

    })
    
  })

  describe('validateAndParseCarRequest', () => {
    const joiObjectSpy = jest.spyOn(Joi, 'object')
    const { validCarHttpReq, invalidCarHttpReq } = require('./car-http-request.fixture')

    afterEach(() => {joiObjectSpy.mockClear()})

    describe('general operation', () => {
      beforeAll(() => {
        carController.validateAndParseCarRequest(validCarHttpReq)
      })

      it('call Joi.object method with the correct properties',()=>{
        const objectToValidate = joiObjectSpy.mock.calls[0][0]
        expect(joiObjectSpy).toBeCalledTimes(1)

        expect('brand' in objectToValidate).toBe(true)
        expect('model' in objectToValidate).toBe(true)
        expect('model_year' in objectToValidate).toBe(true)
        expect('mileage' in objectToValidate).toBe(true)
        expect('color' in objectToValidate).toBe(true)
        expect('air_conditioning' in objectToValidate).toBe(true)
        expect('number_passengers' in objectToValidate).toBe(true)
        expect('automatic' in objectToValidate).toBe(true)
        expect('price_per_week_in_dollars' in objectToValidate).toBe(true)
        expect('price_per_day_in_dollars' in objectToValidate).toBe(true)
      })
    })

    describe('pass the validation with valid car request', () => {
      let validatedCarReq

      beforeEach(() => {
        validatedCarReq = carController.validateAndParseCarRequest(validCarHttpReq)
      })

      it('returns the parsed request', () => {
        expect(validatedCarReq).toBeDefined()
      })

      it('parse the numeric fields to number', () => {
        expect(typeof validatedCarReq.model_year).toBe('number')
        expect(typeof validatedCarReq.mileage).toBe('number')
        expect(typeof validatedCarReq.air_conditioning).toBe('number')
        expect(typeof validatedCarReq.number_passengers).toBe('number')
        expect(typeof validatedCarReq.automatic).toBe('number')
        expect(typeof validatedCarReq.price_per_week_in_dollars).toBe('number')
        expect(typeof validatedCarReq.price_per_day_in_dollars).toBe('number')
      })
    })

    describe('dont pass the validation with invalid car request', () => {
      let errorThrowed
      beforeAll(() => {
        try{
          carController.validateAndParseCarRequest(invalidCarHttpReq)
        }catch(error){
          errorThrowed = error
        }
      })

      it('throw an Joi.ValidationError instance', () => {
        expect(errorThrowed).toBeInstanceOf(Joi.ValidationError)
      })
    })
  })

  describe('cleanSessionErrorsAndMessages', () => {
    const someSession = {
      error: 'someone error',
      message: 'someone message'
    }

    beforeAll(() => {
      return carController.cleanSessionErrorsAndMessages(someSession)
    })

    it('sets error and messages to null', () => {
      expect(someSession.error).toBeNull()
      expect(someSession.message).toBeNull()
    })
  })


})