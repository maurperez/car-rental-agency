module.exports = class AbstractCarRepository {
  constructor () {
    if (new.target === AbstractCarRepository) {
      throw new Error('this is not instantiable')
    }
  }

  /**
   * @param {import('../car.entity')} car
   * @returns {import('../car.entity')}
   */
  create (car) {
    throw new Error('method not implented')
  }

  /**
   * @param {Number} id
   * @param {import('../car.entity')} car
   * @returns {import('../car.entity')}
   */
  update (id, car) {
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
