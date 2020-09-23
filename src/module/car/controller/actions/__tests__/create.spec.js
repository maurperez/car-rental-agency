const Joi = require('joi')
const {create} = require('../create.action')

const mockThisCarController = {
  ROUT_BASE: '/car',
  cleanSessionErrorsAndMessages: jest.fn(),
  validateAndParseCarRequest: jest.fn(),
  carService: {
    create: jest.fn(),
  },
}

const createMethod = create.bind(mockThisCarController)

describe('create method', () => {
  describe('GET', () => {
    const render = jest.fn()
    const req = {
      method: 'GET',
      session: {
        error: 'this is a an error',
        message: 'this is a message',
      },
    }

    beforeAll(() => {
      createMethod(req, {render})
    })

    it('renders the car-form', () => {
      expect(render).toBeCalledTimes(1)
      expect(render).toBeCalledWith('car/view/car-form', {
        data: {
          error: req.session.error,
          message: req.session.message,
        },
      })
    })

    it('clean the session', () => {
      expect(
        mockThisCarController.cleanSessionErrorsAndMessages
      ).toBeCalledTimes(1)
    })

    afterAll(jest.resetAllMocks)
  })

  describe('POST: creation succesfully', () => {
    const idOfNewCar = 1
    const bodyReqValidated = 'fake sucessfuly validation result'

    const redirect = jest.fn()
    const req = {
      method: 'POST',
      file: {path: 'fake/path'},
      body: {brand: 'fakeBrand'},
      session: {},
    }

    beforeAll(() => {
      mockThisCarController.validateAndParseCarRequest.mockReturnValue(
        bodyReqValidated
      )
      mockThisCarController.carService.create.mockReturnValue({id: idOfNewCar})

      createMethod(req, {redirect})
    })

    it('validates the request', () => {
      expect(mockThisCarController.validateAndParseCarRequest).toBeCalledWith(
        req.body
      )
    })

    it('calls create method of car service with the request body validated and image path', () => {
      expect(mockThisCarController.carService.create).toBeCalledWith(
        bodyReqValidated,
        req.file.path
      )
    })

    it('sets notification message', () => {
      expect(typeof req.session.message).toBe('string')
    })

    it('redirects to the car page', () => {
      expect(redirect).toBeCalledWith(
        `${mockThisCarController.ROUT_BASE}/${idOfNewCar}`
      )
    })

    afterAll(jest.resetAllMocks)
  })

  describe('POST: bad request', () => {
    const req = {
      method: 'POST',
      path: 'fake/url/path',
      file: {path: 'fake/image/path'},
      body: {brand: 'fakeBadBody'},
      session: {},
    }
    const res = {
      redirect: jest.fn(),
      status: jest.fn(),
    }
    const validationError = new Joi.ValidationError('', [
      new Error('oneValidationError'),
      new Error('anotherValidationError'),
    ])

    beforeAll(() => {
      mockThisCarController.validateAndParseCarRequest.mockImplementation(
        () => {
          throw validationError
        }
      )
    })

    beforeEach(() => {
      createMethod(req, res)
    })

    it('sets the status code to 400 and redirect to the url path', () => {
      expect(res.status).toBeCalledWith(400)
      expect(res.redirect).toBeCalledWith(req.path)
    })

    it('sets error notification', () => {
      expect(Array.isArray(req.session.error)).toBe(true)
      expect(req.session.error.includes('oneValidationError'))
      expect(req.session.error.includes('anotherValidationError'))
    })

    afterAll(jest.resetAllMocks)
  })

  describe('POST: internal server error', () => {
    const req = {
      method: 'POST',
      path: 'fake/url/path',
      file: {path: 'fake/image/path'},
      body: {brand: 'fakeBadBody'},
      session: {},
    }
    const res = {
      redirect: jest.fn(),
      status: jest.fn(),
    }

    beforeAll(() => {
      mockThisCarController.carService.create.mockImplementation(() => {
        throw new Error('unknown error')
      })

      createMethod(req, res)
    })

    it('sets the status code to 500 and redirect to the url path', () => {
      expect(res.status).toBeCalledWith(500)
      expect(res.redirect).toBeCalledWith(req.path)
    })

    it('sets the error notification', () => {
      expect(typeof req.session.error).toBe('string')
    })
  })
})
