require('./types/customer.dto')
const CustomerController = require('./controller/customer.controller')
const CustomerService = require('./service/customer.service')
const CustomerRepository = require('./repository/sqlite/customer.repostiory')
const CustomerModel  = require('./model/customer.model')

/**
 * @param {import('express').Application} app 
 * @param {import('rsdi').IDIContainer} container 
 */
function init(app, container) {
  const controller = container.get('CustomerController')
  controller.configureRoutes(app)  
}

module.exports = {
  init,
  CustomerController,
  CustomerService,
  CustomerRepository,
  CustomerModel
}