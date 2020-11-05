/* eslint-disable no-unused-vars */
const AbstractCustomerRepositoryError = require('./error/abstract-car-repository')
const MethodNotImplementedError = require('./error/method-not-implemented')

/**
 * @typedef {import('../customer.entity')} CustomerEntity
 */
module.exports = class AbstractCustomerRepostory {
  constructor() {
    if (new.target === AbstractCustomerRepostory) {
      throw new AbstractCustomerRepositoryError()
    }
  }

  /**
   * @param {CustomerEntity} customer 
   * @returns {Promise<CustomerEntity>}
   */
  async create(customer){
    throw new MethodNotImplementedError()
  }

  /**
   * @param {CustomerEntity} customer 
   * @returns {Promise<CustomerEntity>}
   */
  async update(customer){
    throw new MethodNotImplementedError()
  }

  /**
   * @param {number} id 
   */
  async delete(id){
    throw new MethodNotImplementedError()
  }

  /**
   * @param {number} id 
   * @returns {Promise<CustomerEntity>}
   */
  async getById(id){
    throw new MethodNotImplementedError()
  }

  /**
   * @param {string} name 
   * @returns {Promise<CustomerEntity | CustomerEntity[]>}
   */
  async getByName(name, lastname){
    throw new MethodNotImplementedError()
  }

  /**
   * @returns {Promise<CustomerEntity[]>}
   */
  async getAll(){
    throw new MethodNotImplementedError()
  }
}