const Joi = require('joi');
const { NonExistentCustomer } = require('../../error/general-errors');
const CustomerController = require('../customer.controller')

const mockCustomerService = {
  getById: jest.fn()
}
const mockUrlEncodedParser = jest.fn()

const customerController = new CustomerController(mockUrlEncodedParser, mockCustomerService)

describe('CustmerController', () => {
  describe('constructor', () => {
    it('sets the the custemerService, the urlEncodedParser and the route base in the contructor', () => {
      expect(customerController.customerService).toBe(mockCustomerService)
      expect(customerController.urlencodedParser).toBe(mockUrlEncodedParser)
      expect(typeof customerController.ROUTE_BASE).toBe('string')
    });
  });

  describe('validateAndParseCustomerRequest', () => {
    const joiObjectSpy = jest.spyOn(Joi, 'object')
    const { validCreationHttpReq } = require('../../__tests__/general-fixtures')
    
    afterEach(joiObjectSpy.mockClear)
    
    describe('general operation', () => {
      let reqValidated
      beforeAll(() => {
        reqValidated = customerController.validateAndParseCustomerRequest(validCreationHttpReq)
      })

      it('parses the birthdate field to ISO format', () => {
        expect(reqValidated.birthdate).toMatch(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
      })
    })

    describe('pass the validation with a correct values', () => {
      let reqValidated
      beforeAll(() => {
        reqValidated = customerController.validateAndParseCustomerRequest(validCreationHttpReq)
      })

      it('returns the parsed req', () => {
        expect(reqValidated.name).toBeDefined()
        expect(reqValidated.lastname).toBeDefined()
        expect(reqValidated.documentType).toBeDefined()
        expect(reqValidated.documentNumber).toBeDefined()
        expect(reqValidated.nationality).toBeDefined()
        expect(reqValidated.address).toBeDefined()
        expect(reqValidated.phoneNumber).toBeDefined()
        expect(reqValidated.email).toBeDefined()
        expect(reqValidated.birthdate).toBeDefined()
      })
    })

    describe('fails the validation with incorrect values', () => {
      const { invalidCreationHttpReq } = require('../../__tests__/general-fixtures')
      let errorThrowed

      beforeAll(() => {
        try {
          customerController.validateAndParseCustomerRequest(invalidCreationHttpReq)
        } catch (validationError) {
          errorThrowed = validationError
        }
      });

      it('throws an Joi.ValidationError instance', () => {
        expect(errorThrowed).toBeInstanceOf(Joi.ValidationError)
      })
    })
  })

  describe('validateExistentCustomer', () => {
    const req = {params: {id: 1}}
    const next = jest.fn()
    const res = {
      render: jest.fn(),
      status: jest.fn()
    }

    describe('validation of a existent customer', () => {
      beforeAll(() => {
        mockCustomerService.getById.mockResolvedValue(true)
        customerController.validateExistentCustomer(req, res, next)
      })

      it('calls the get by id method of the customer service with the corresponding id', () => {
        expect(mockCustomerService.getById.mock.calls[0][0]).toBe(req.params.id)
      })

      it('calls next function', () => {
        expect(next).toBeCalledTimes(1)
      })

      it('doesnt call the render or status method', () => {
        expect(res.render).toBeCalledTimes(0)
        expect(res.status).toBeCalledTimes(0)
      })

      afterAll(jest.resetAllMocks)
    })

    describe('validation of a non existent customer', () => {
      beforeAll(() => {
        global.console.error = jest.fn()
        mockCustomerService.getById.mockRejectedValue(new NonExistentCustomer())
        customerController.validateExistentCustomer(req, res, next)
      })

      it('calls the get by id method of the customer service with the corresponding id', () => {
        expect(mockCustomerService.getById.mock.calls[0][0]).toBe(req.params.id)
      })

      it('calls the status method with 404 code', () => {
        expect(res.status).toBeCalledWith(404)
      })

      afterAll(jest.resetAllMocks)
    })

    describe('in case an unexpected error occurs', () => {
      beforeAll(() => {
        mockCustomerService.getById.mockRejectedValue(new Error('unexpected error'))
        customerController.validateExistentCustomer(req, res, next)
      })

      it('calls the status method with a 500 code', () => {
        expect(res.status).toBeCalledWith(500)
      })

      it('prints in the console the error', () => {
        expect(global.console.error).toBeCalledTimes(1)
      })


      afterAll(() => {
        jest.resetAllMocks()
        global.console.error.mockRestore()
      })

    })



  })
})






