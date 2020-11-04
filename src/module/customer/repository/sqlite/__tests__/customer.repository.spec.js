const CustomerRepostory = require('../customer.repostiory')
const CustomerModel = require('../../../model/customer.model')
const Customer = require('../../../customer.entity')
const { Sequelize } = require('sequelize')
const fixtures = require('./customer.repository.fixtures')

describe('Customer repository', () => {
  const customerRepository = new CustomerRepostory(CustomerModel)

  beforeAll( async () => {
    const sequelize = new Sequelize('sqlite::memory', {logging: false})
    CustomerModel.setup(sequelize)
    await sequelize.sync()
  })

  it('sets the customer model in the constructor', () => {
    expect(customerRepository.customerModel).toBe(CustomerModel)
  })

  describe('create method', () => {
    let customer
    beforeAll( async () => {
      customer = await customerRepository.create(fixtures.newCustomer)
    })

    it('returns an instance of the Customer class', () => {
      expect(customer).toBeInstanceOf(Customer)
    })

    it('sets the id, timestamps and active values', () => {
      const ISODateRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

      expect(customer.id).toBeDefined()
      expect(customer.createdAt).toMatch(ISODateRegex)
      expect(customer.createdAt).toMatch(ISODateRegex)
      expect(customer.active).toBeDefined()
    })

    it('persits in the db', () => {
      return expect(CustomerModel.findByPk(customer.id)).resolves.toBeTruthy()
    })

    afterAll(() => CustomerModel.destroy({where: {}}))
  })

  describe('update method', () => {
    const newBirthdate = '25-01-1999'      
    let initialCustomerModelInstance
    let updatedCustomer

    beforeAll( async () => {
      initialCustomerModelInstance = await CustomerModel.create(fixtures.newCustomer, {isNewRecord: true})

      updatedCustomer = await customerRepository.update(new Customer({...initialCustomerModelInstance.toJSON(), birthdate: newBirthdate}))
    })

    it('returns an instance of Customer class', () => {
      expect(updatedCustomer).toBeInstanceOf(Customer)
    })

    it('the fields are updated effectively', () => {
      expect(updatedCustomer.birthdate).toBe(newBirthdate)
    })

    it('the update persists in the db', () => {
      return CustomerModel.findByPk(updatedCustomer.id)
        .then(customer => expect(customer.birthdate).toBe(newBirthdate))
    })

    afterAll(() => CustomerModel.destroy({where: {}}))
  })

  describe('delete method', () => {
    let customerId

    beforeAll( async () => {
      const customerModelInstance = await CustomerModel.create(fixtures.newCustomer, {isNewRecord: true})
      customerId = customerModelInstance.id

      customerRepository.delete(customerId)
    })

    it('the customer no more exists in the db', () => {
      return expect(CustomerModel.findByPk(customerId)).resolves.toBeNull()
    })

    afterAll(() => CustomerModel.destroy({where: {}}))
  })

  describe('get by id method', () => {
    let customer

    beforeAll( async () => {
      const customerModelInstance = await CustomerModel.create(fixtures.newCustomer, {isNewRecord: true})
      customer = await customerRepository.getById(customerModelInstance.id)
    })

    it('returns an instance of Customer class', () => {
      expect(customer).toBeInstanceOf(Customer)
    })

    afterAll(() => CustomerModel.destroy({where: {}}))
  })

  describe('get by name method', () => {
    let customer

    beforeAll( async () => {
      const customerModelInstance = await CustomerModel.create(fixtures.newCustomer, {isNewRecord: true})
      customer = await customerRepository.getByName(customerModelInstance.name, customerModelInstance.lastname)
    })

    it('returns an instance of Customer class', () => {
      expect(customer).toBeInstanceOf(Customer)
    })

    afterAll(() => CustomerModel.destroy({where: {}}))
  })

  describe('get all method', () => {
    let customers

    beforeAll( async () => {
      for (let customersToCreate = 3; customersToCreate > 0; customersToCreate--) {
        await CustomerModel.create(fixtures.newCustomer, {isNewRecord: true})        
      }

      customers = await customerRepository.getAll()
    })

    it('returns an array of Customer class', () => {
      expect(customers.every(customer => customer instanceof Customer)).toBe(true)
    })

    afterAll(() => CustomerModel.destroy({where: {}}))
  })


})
