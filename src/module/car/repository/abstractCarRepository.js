module.exports = class AbstractCarRepository {
  constructor () {
    if (new.target === AbstractCarRepository) {
      throw new Error('this is not instantiable')
    }
  }

  /**
   * @param {import('../car.entity')} car
   */
  create (car) {
    throw new Error('method not implented')
  }

  /**
   * @param {import('../car.entity')} car
   */
  update (car) {
    throw new Error('method not implented')
  }

  /**
   * @param {Number} id
   */
  delete (id) {
    throw new Error('method not implented')
  }

  /**
   * @param {Number} id
   * @returns {import('../car.entity')}
   */
  getById (id) {
    throw new Error('method not implented')
  }

  /**
   * @returns {Array<import('../car.entity')>}
   */
  getAll () {
    throw new Error('method not implented')
  }
}
