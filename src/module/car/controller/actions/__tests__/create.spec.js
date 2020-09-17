const Joi = require('joi')
const  {create} = require('../create.action')

const mockThisCarController = {
  ROUT_BASE: '/car',
  cleanSessionErrorsAndMessages : jest.fn(),
  validateCarRequest: jest.fn(),
  carService: {
    create: jest.fn()
  }
}

const createMethod = create.bind(mockThisCarController)

describe('create method', () => {

  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('GET: suceesfully request', () => {
    const render = jest.fn()
    const req = {
      method: 'GET',
      session: {
        error:  'this is a an error',
        message: 'this is a message'
      }
    }
    
    beforeEach(() => {
      return createMethod(req, {render})
    })

    it('render the car-form', () => {
      expect(render).toBeCalledTimes(1)
      expect(render).toBeCalledWith('car/view/car-form', {
        data: {
          error: req.session.error,
          message: req.session.message
        }
      })
    }) 
    
    it('clean the session', () => {
      expect(mockThisCarController.cleanSessionErrorsAndMessages).toBeCalledTimes(1)
    })
  })

  describe('POST: creation succesfully', () => {
    const idOfNewCar = 1
    const validationResult = 'FAKE CORRECT VALIDATION RESULT'

    const redirect = jest.fn()
    const req = {
      method: 'POST',
      file: {path: 'fake/path'},
      body: {brand: 'fakeBrand'},
      session: {}
    }

    beforeEach(() => {
      mockThisCarController.validateCarRequest.mockReturnValue(validationResult)
      mockThisCarController.carService.create.mockReturnValue({id: idOfNewCar})

      return createMethod(req, {redirect})
    })

    it('validates the request', () => {
      expect(mockThisCarController.validateCarRequest).toBeCalledWith(req.body)
    })

    it('call car service to create', () => {
      expect(mockThisCarController.carService.create).toBeCalledWith(validationResult, req.file.path)
    })

    it('redirect to the car page', () => {
      expect(redirect).toBeCalledWith(`${mockThisCarController.ROUT_BASE}/${idOfNewCar}`)
    })
  })

  describe('POST: bad request', () => {
    const req = {
      method: 'POST',
      path: 'fake/url/path',
      file: {path: 'fake/image/path'},
      body: {brand: 'fakeBadBody'},
      session: {}
    }
    const res = {
      redirect: jest.fn(),
      status: jest.fn()
    }

    beforeEach(() => {
      mockThisCarController.validateCarRequest.mockImplementation(() => {
        throw new Joi.ValidationError('', [])
      })

      return createMethod(req, res)
    })

    it('set status code to 400 and redirect to the url path', () => {
      expect(res.status).toBeCalledWith(400)
      expect(res.redirect).toBeCalledWith(req.path)
    })
  })

  describe('POST: internal server error',() => {
    const req = {
      method: 'POST',
      path: 'fake/url/path',
      file: {path: 'fake/image/path'},
      body: {brand: 'fakeBadBody'},
      session: {}
    }
    const res = {
      redirect: jest.fn(),
      status: jest.fn()
    }

    beforeEach(() => {
      mockThisCarController.carService.create.mockImplementation(() => {
        throw new Error('unknown error')
      })

      return createMethod(req, res)
    })

    it('set status code to 500 and redirect to the url path', () => {
      expect(res.status).toBeCalledWith(500)
      expect(res.redirect).toBeCalledWith(req.path)
    })
  })

})