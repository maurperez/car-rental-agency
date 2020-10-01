require('./types/car.dto')
const CarController = require('./controller/car.controller')
const CarService = require('./service/car.service')
const CarRepository = require('./repository/sqlite/car.repository')
const CarModel = require('./model/car.model')

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function init(app, container) {
  /**
   * @type {CarController} controller;
   */
  const controller = container.get('CarController')
  controller.configureRoutes(app)
}

module.exports = {
  init,
  CarController,
  CarService,
  CarRepository,
  CarModel,
}
