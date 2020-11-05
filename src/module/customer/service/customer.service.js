const { mapFromHttpRequestToEntity } = require('../mappers/customer.mapper')

module.exports = class CustomerService {
  /** @param { import('../repository/abstract-repostiory') } customerRepository */
  constructor(customerRepository){
    this.customerRepository = customerRepository
  }

  /**
   *  @param {customerFromHttpRequest} plainCustomer
   *  @returns {import('../customer.entity')}
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
   * @returns {import('../customer.entity')}
   */
  async update(id, plainCustomer){
    const customer = await this.customerRepository.getById(id)

    Object.keys(plainCustomer).forEach(key => {
      customer[key] = plainCustomer[key]
    })

    const updatedCustomer = await this.customerRepository.update(customer)
    return updatedCustomer
  }

  /** @param {(number | string)} id */
  delete(id){
    this.customerRepository.delete(id)
  }

  /**
   * @param {(number | string)} id
   * @returns {import('../customer.entity')}
  */
  async getById(id){
    return this.customerRepository.getById(id)
  }

  /**
   * @param {string} name 
   * @param {string} lastname 
   * @returns {import('../customer.entity')[]}
   */
  async getByName(name, lastname){
    return this.customerRepository.getByName(name, lastname)
  }

  /** @returns {import('../customer.entity')[]} */
  async getAll(){
    return this.customerRepository.getAll()
  }
}