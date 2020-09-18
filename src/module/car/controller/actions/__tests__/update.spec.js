const { update } = require('../update.action')
const Joi = require('joi')

const mockThisCarController = {
  ROUT_BASE: '/car',
  cleanSessionErrorsAndMessages : jest.fn(),
  validateCarRequest: jest.fn(),
  carService: {
    getById: jest.fn(),
    update: jest.fn()
  }
}

const updateMethod = update.bind(mockThisCarController)

describe('update method', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('GET: get the update form', () => {
    const carID = 1
    const req = {
      params: {
        id: carID
      },
      path: '/url/path',
      method: 'GET',
      session: {
        error: 'someone error',
        message: 'someone message'
      }
    }
    const res = { render: jest.fn() }
    const oneCarResult = 'car'

    beforeEach(() => {
      mockThisCarController.carService.getById.mockReturnValue(oneCarResult)

      return updateMethod(req, res)
    })

    it('call getById method of car service with the id', () => {
      expect(mockThisCarController.carService.getById).toBeCalledWith(carID)
    })

    it('render the car-form with notifications', () => {
      expect(res.render).toBeCalledWith('car/view/car-form', {
        data: {
          car: oneCarResult,
          error: req.session.error,
          message: req.session.message
        }
      })
    })

    it('clean the session after the render', () => {
      expect(mockThisCarController.cleanSessionErrorsAndMessages).toBeCalledWith(req.session)
    })
  })

  describe('POST: update sucessfully', () => {
    const carID = 1
    const req = {
      params: {
        id: carID
      },
      method: 'POST',
      path: '/url/path',
      session: {},
      file: {
        path: 'image/path'
      },
      body: {
        brand: 'updateBrand'
      }
    }
    const res = { redirect: jest.fn() }

    beforeEach(() => {
      mockThisCarController.validateCarRequest.mockImplementation(req => req)

      return updateMethod(req, res)
    })

    it('validate the request', () => {
      expect(mockThisCarController.validateCarRequest).toBeCalledWith(req.body)
    })

    it('call the update method of car service with the correct parameters', () => {
      expect(mockThisCarController.carService.update).toBeCalledWith(carID, req.body, req.file.path)
    })

    it('set the message notification', () => {
      expect(typeof req.session.message).toBe('string')
    })

    it('after update redirect to the car page', () => {
      expect(res.redirect).toBeCalledWith(req.path)
    })
  })

  describe('POST: bad request update', () => {
    const carID = 1
    const req = {
      params: {
        id: carID
      },
      path: '/url/path',
      method: 'POST',
      session: {},
      file: {
        path: 'image/path'
      },
      body: {
        mileage: -100
      }
    }
    const res = { redirect: jest.fn() }
    const validationError = new Joi.ValidationError('', [
      new Error('mileage invalid')
    ])

    beforeEach(() => {
      mockThisCarController.validateCarRequest.mockImplementation(() => {
        throw validationError
      })

      return updateMethod(req, res)
    })

    it('sets the error notification correctly', () => {
      expect(Array.isArray(req.session.error)).toBe(true)
      expect(req.session.error.includes('mileage invalid')).toBe(true)
    })

    it('redirect to the car page', () => {
      expect(res.redirect).toBeCalledWith(req.path)
    })
  })

  describe('POST: internal server error', () => {
    const carID = 1
    const req = {
      params: {
        id: carID
      },
      method: 'POST',
      session: {},
      file: {
        path: 'image/path'
      },
      path: '/url/path',
      body: {
        mileage: -100
      }
    }
    const res = { redirect: jest.fn() }

    beforeEach(() => {
      mockThisCarController.validateCarRequest.mockImplementation(() => {
        throw new Error('unkown error')
      })

      return updateMethod(req, res)
    })

    it('set the error notification correctly', () => {
      expect(typeof req.session.error).toBe('string')
    })

    it('redirect to the car page', () => {
      expect(res.redirect).toBeCalledWith(req.path)
    })
  })
})