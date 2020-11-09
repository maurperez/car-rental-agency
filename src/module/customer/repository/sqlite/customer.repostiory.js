const AbstractCustomerRepostory = require('../abstract-repostiory')
const { mapFromDbToEntity } = require('../../mappers/customer.mapper')
const { NonExistentCustomer } = require('../../error/general-errors')
const { Op } = require('sequelize')

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
    if(!customer.id){ throw new NonExistentCustomer()}

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

    if(customerInstance){
      return mapFromDbToEntity(customerInstance)
    }else { throw new NonExistentCustomer()}
  }

  /**
   * @param {string} name 
   * @param {string} lastname 
   */
  async getByName(name, lastname){
    const customersInstance = await this.customerModel.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%` 
        },
        lastname: {
          [Op.like]: `%${lastname}%`
        }
      }
    })

    if(customersInstance.length > 0){
      return customersInstance.map(customer => mapFromDbToEntity(customer.toJSON()))
    }else { throw new NonExistentCustomer() }
  }

  async getAll(){
    const customersInstance = await this.customerModel.findAll()
    return customersInstance.map(customer => mapFromDbToEntity(customer))
  }
}