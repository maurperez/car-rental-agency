module.exports = class AbstractCarRepository {
  constructor () {
    if (new.target === AbstractCarRepository) {
      throw new Error('this is not instantiable')
    }
  }

  /**
   * @param {import('../car.entity')}
   */
  async create (car) {
    throw new Error('method not implented')
  }

  /**
   * @param {Number} id
   */
  async delete (id) {
    throw new Error('method not implented')
  }

  /**
   * @param {Number} id
   * @returns {import('../car.entity')}
   */
  async getById (id) {
    throw new Error('method not implented')
  }

  /**
   * @returns {Array<import('../car.entity')>}
   */
  async getAll () {
    throw new Error('method not implented')
  }
}
