const Customer = require('../../customer.entity')
const CustomerService = require('../customer.service')
const fixtures = require('./customer.service.fixtures')

const mockCustomerRepository = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getByName: jest.fn(),
  getAll: jest.fn()
}

describe('customer service', () => {
  const customerService = new CustomerService(mockCustomerRepository)

  describe('create method', () => {
    const returnedOfRepository = 'the complete customer'
    let customer
    beforeAll(async () => {
      mockCustomerRepository.create.mockResolvedValue(returnedOfRepository)
      customer = await customerService.create(fixtures.plainCustomerFromHttpReq)
    })

    it('calls to the repository with an instance of Customer class', () => {
      const argumentPassed = mockCustomerRepository.create.mock.calls[0][0]
      expect(argumentPassed).toBeInstanceOf(Customer)
    })

    it('returns what returns the repository', () => {
      expect(customer).toBe(returnedOfRepository)
    })

    afterAll(jest.resetAllMocks)
  })

  describe('update method', () => {
    const returnedOfRepository = 'the complete customer'
    const CUSTOMER_ID = 5
    let customer

    beforeAll(async () => {
      mockCustomerRepository.getById.mockResolvedValue(fixtures.existentCustomer())
      mockCustomerRepository.update.mockResolvedValue(returnedOfRepository)
      customer = await customerService.update(CUSTOMER_ID, fixtures.plainCustomerFromHttpReq)
    })

    it('calls to the repository to get the previous information of the customer', () => {
      const idPassed = mockCustomerRepository.getById.mock.calls[0][0]
      expect(idPassed).toBe(CUSTOMER_ID)
    })

    it('calls to the update method of the repository with the information updated', () => {
      const customerPassed = mockCustomerRepository.update.mock.calls[0][0]
      
      expect(customerPassed.name).toEqual(fixtures.plainCustomerFromHttpReq.name)
      expect(customerPassed.lastname).toEqual(fixtures.plainCustomerFromHttpReq.lastname)
      expect(customerPassed.documentType).toEqual(fixtures.plainCustomerFromHttpReq.documentType)
      expect(customerPassed.documentNumber).toEqual(fixtures.plainCustomerFromHttpReq.documentNumber)
      expect(customerPassed.nationality).toEqual(fixtures.plainCustomerFromHttpReq.nationality)
      expect(customerPassed.address).toEqual(fixtures.plainCustomerFromHttpReq.address)
      expect(customerPassed.phoneNumber).toEqual(fixtures.plainCustomerFromHttpReq.phoneNumber)
      expect(customerPassed.email).toEqual(fixtures.plainCustomerFromHttpReq.email)
      expect(customerPassed.birthdate).toEqual(fixtures.plainCustomerFromHttpReq.birthdate)
    })

    it('updates the updatedAt timestamp',async () => {
      const customerPassed = mockCustomerRepository.update.mock.calls[0][0]
      const initalCustomer = fixtures.existentCustomer()

      expect(customerPassed.updatedAt).not.toEqual(initalCustomer.updatedAt)
    })

    it('returns what returns the repository', () => {
      expect(customer).toBe(returnedOfRepository)
    })

    afterAll(jest.resetAllMocks)
  })

  describe('delete method', () => {
    const CUSTOMER_ID = 1
    beforeAll(() => {
      customerService.delete(CUSTOMER_ID)
    })

    it('calls the delete method of the repository with the corresponding id', () => {
      expect(mockCustomerRepository.delete).toBeCalledWith(CUSTOMER_ID)
    })

    afterAll(jest.resetAllMocks)
  })

  describe('get by id method', () => {
    const CUSTOMER_ID = 1
    const returnedOfRepository = 'someone customer'
    let customer
    beforeAll( async () => {
      mockCustomerRepository.getById.mockResolvedValue(returnedOfRepository)
      customer = await customerService.getById(CUSTOMER_ID)
    })

    it('calls to the getById method of the repository with the corresponding id', () => {
      expect(mockCustomerRepository.getById).toBeCalledWith(CUSTOMER_ID)
    })

    it('returns what returns the repository', () => {
      expect(customer).toBe(returnedOfRepository)
    })

    afterAll(jest.resetAllMocks)
  })

  //testear get by name and getall methods
  describe('get by name method', () => {
    const customerName = 'John', customerLastname = 'Doe'
    const returnedOfRepository = 'someone customer'
    let customer
    beforeAll( async () => {
      mockCustomerRepository.getByName.mockResolvedValue(returnedOfRepository)
      customer = await customerService.getByName(customerName, customerLastname)
    })

    it('calls to the getByName method of the repository with the corresponding name and lastname', () => {
      expect(mockCustomerRepository.getByName).toBeCalledWith(customerName, customerLastname)
    })

    it('returns what returns the repository', () => {
      expect(customer).toBe(returnedOfRepository)
    })

    afterAll(jest.resetAllMocks)
  })

  describe('get all method', () => {
    const returnedOfRepository = ['someone customer', 'another customer']
    let customers
    beforeAll(async () => {
      mockCustomerRepository.getAll.mockResolvedValue(returnedOfRepository)
      customers = await customerService.getAll()
    })

    it('calls to the getAll method of the repository', () => {
      expect(mockCustomerRepository.getAll).toBeCalledTimes(1)
    })

    it('returns what returns the repository', () => {
      expect(customers).toBe(returnedOfRepository)
    })

    afterAll(jest.resetAllMocks)
  })
})