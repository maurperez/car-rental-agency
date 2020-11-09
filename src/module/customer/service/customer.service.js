/**
 * @typedef {import('../customer.entity')} CustomerEntity
 */
const { mapFromHttpRequestToEntity } = require('../mappers/customer.mapper')

module.exports = class CustomerService {
  /** @param { import('../repository/abstract-repostiory') } customerRepository */
  constructor(customerRepository){
    this.customerRepository = customerRepository
  }

  /**
   *  @param {customerFromHttpRequest} plainCustomer
   *  @returns {Promise<CustomerEntity>}
   */
  async create(plainCustomer){
    const customer = await this.customerRepository.create(
      mapFromHttpRequestToEntity(plainCustomer)
    )
    return customer
  }

  /**
   * @param {(number|string)} id
   * @param {customerFromHttpRequest} plainCustomer
   * @returns {Promise<CustomerEntity>}
   */
  async update(id, plainCustomer){
    const customer = await this.customerRepository.getById(id)

    Object.keys(plainCustomer).forEach(key => {
      customer[key] = plainCustomer[key]
    })
    customer.updatedAt = new Date().toISOString()

    const updatedCustomer = await this.customerRepository.update(customer)
    return updatedCustomer
  }

  /**
   *  @param {(number | string)} id 
   *  @returns {Promise<void>}
   */
  async delete(id){
    return this.customerRepository.delete(id)
  }

  /**
   * @param {(number | string)} id
   * @returns {Promise<CustomerEntity>}
  */
  async getById(id){
    return this.customerRepository.getById(id)
  }

  /**
   * @param {string} name 
   * @param {string} lastname 
   * @returns {Promise<CustomerEntity[]>}
   */
  async getByName(name, lastname){
    return this.customerRepository.getByName(name, lastname)
  }

  /** @returns {Promise<CustomerEntity[]>} */
  async getAll(){
    return this.customerRepository.getAll()
  }
}