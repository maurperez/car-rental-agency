const Joi = require('joi');
const { CustomerController } = require('../customer.controller')

const mockCustomerService = {}
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

      it('parses the birth_date field to Date object', () => {
        expect(reqValidated.birth_date).toBeInstanceOf(Date)
      })
    })

    describe('pass the validation with a correct values', () => {
      let reqValidated
      beforeAll(() => {
        reqValidated = customerController.validateAndParseCustomerRequest(validCreationHttpReq)
      })

      it('returns the parsed req', () => {
        expect(reqValidated.name).toBeDefined()
        expect(reqValidated.last_name).toBeDefined()
        expect(reqValidated.document_type).toBeDefined()
        expect(reqValidated.nro_document).toBeDefined()
        expect(reqValidated.nationality).toBeDefined()
        expect(reqValidated.address).toBeDefined()
        expect(reqValidated.phone_number).toBeDefined()
        expect(reqValidated.email).toBeDefined()
        expect(reqValidated.birth_date).toBeDefined()
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
})