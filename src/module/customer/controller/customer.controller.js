const Joi = require("joi");
const AbstractController = require("../../abstract-controller");
const { Customer } = require("../customer.entity");

module.exports.CustomerController = class extends AbstractController{
  constructor(urlencodedParser, customerService){
    super()
    this.urlencodedParser = urlencodedParser
    this.customerService = customerService
    this.ROUTE_BASE = '/customer'
  }


  validateAndParseCustomerRequest(bodyRequest){
    const validBithDate = new Date()
    validBithDate.setFullYear(new Date().getFullYear() - Customer.getLeagalAgeToDrive())

    const errorsDescriptions = {
      mustBeString: (field) => `the ${field} must be a string`,
      tooLong: (field, length) => `the ${field} cant have more than ${length} characters`,
      isntEmail: 'the email is invalid',
      veryOldBirthDate: (minDate) => `ths bithdate is invalid because this is very old, please introduce a vale equal or grater than ${minDate}`,
      veryNewBirthDate: (maxDate) => `the birthdate is invalid because this is very new, please introduce a value equal or less than ${maxDate}`
    }

    const customerSchema = Joi.object({
      name: Joi.string()
        .max(256).message(errorsDescriptions.tooLong('name', 256)),
      last_name: Joi.string()
        .max(256).message(errorsDescriptions.tooLong('last name', 256)),
      document_type: Joi.string()
        .max(256).message(errorsDescriptions.tooLong('document type', 256)),
      nro_document: Joi.string()
        .max(256).message(errorsDescriptions.tooLong('number of document', 256)),
      nationality: Joi.string()
        .max(100).message(errorsDescriptions.tooLong('name', 100)),
      address: Joi.string()
        .max(256).message(errorsDescriptions.tooLong('name', 256)),
      phone_number: Joi.string()
        .max(50).message(errorsDescriptions.tooLong('phone number', 50)),
      email: Joi.string()
        .email().message(errorsDescriptions.isntEmail)
        .max(256).message(errorsDescriptions.tooLong('email', 256)),
      birth_date: Joi.date()
        .greater('1-1-1900').message(errorsDescriptions.veryOldBirthDate('1-1-1900'))
        .less(validBithDate.toDateString()).message(errorsDescriptions.veryNewBirthDate(validBithDate.toLocaleDateString()))
    })

    const {value, error} = customerSchema.validate(bodyRequest, {
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


}