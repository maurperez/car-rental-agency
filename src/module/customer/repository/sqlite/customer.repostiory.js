const AbstractCustomerRepostory = require('../abstract-repostiory')
const { mapFromDbToEntity } = require('../../mappers/customer.mapper')

/**
 * @typedef {import('../../customer.entity')} CustomerEntity
 */

module.exports = class CustomerRepository extends AbstractCustomerRepostory{
  /**
   * @param {typeof import('../../model/customer.model')} customerModel 
   */
  constructor(customerModel){
    super()
    this.customerModel = customerModel
  }

  /**
   * @param {CustomerEntity} customer 
   */
  async create(customer){
    const customerInstance = await this.customerModel.create(customer, { isNewRecord: true })
    return mapFromDbToEntity(customerInstance)
  }

  /**
   * @param {CustomerEntity} customer 
   */
  async update(customer){
    const customerInstance = this.customerModel.build(customer, { isNewRecord: false })
    await customerInstance.save()
    return mapFromDbToEntity(customerInstance)
  }

  /**
   * @param {number | string} id 
   */
  async delete(id){
    await this.customerModel.destroy({
      where: { id }
    })
  }

  /**
   * @param {number | string} id 
   */
  async getById(id){
    const customerInstance = await this.customerModel.findByPk(id)
    return mapFromDbToEntity(customerInstance)
  }

  /**
   * @param {string} name 
   * @param {string} lastname 
   */
  async getByName(name, lastname){
    const customersInstance = await this.customerModel.findAll({
      where: {
        name,
        lastname
      }
    })
    return mapFromDbToEntity(customersInstance)
  }

  async getAll(){
    const customersInstance = await this.customerModel.findAll()
    return customersInstance.map(customer => mapFromDbToEntity(customer))
  }
}