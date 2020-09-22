const AbstractCarRepositoryError = require('./error/abstract-car-repository')
const MethodNotImplementedError = require('./error/method-not-implemented')

module.exports = class AbstractCarRepository {
  constructor() {
    if (new.target === AbstractCarRepository) {
      throw new AbstractCarRepositoryError()
    }
  }

  /**
   * @param {import('../car.entity')} car
   * @returns {import('../car.entity')}
   */
  create(car) {
    throw new MethodNotImplementedError()
  }

  /**
   * @param {import('../car.entity')} car
   * @returns {import('../car.entity')}
   */
  update(car) {
    throw new MethodNotImplementedError()
  }

  /**
   * @param {number} id
   */
  delete(id) {
    throw new MethodNotImplementedError()
  }

  /**
   * @param {number} id
   * @returns {import('../car.entity')}
   */
  getById(id) {
    throw new MethodNotImplementedError()
  }

  /**
   * @returns {Array<import('../car.entity')>}
   */
  getAll() {
    throw new MethodNotImplementedError()
  }
}
