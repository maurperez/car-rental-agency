const AbstractCarRepository = require('../abstract-repository')
const {NonExistentCar} = require('../../error/general-errors')
const {fromModelToEntity} = require('../../mapper/car.mapper')

module.exports = class CarRepository extends AbstractCarRepository {
  /**
   * @param {typeof import('../../model/car.model')} carModel
   */
  constructor(carModel) {
    super()
    this.carModel = carModel
  }

  /**
   * @param {import('../../car.entity')} car
   */
  async create(car) {
    const carInstance = await this.carModel.create(car, {isNewRecord: true})

    return fromModelToEntity(carInstance)
  }

  /**
   * @param {import('../../car.entity')} car
   */
  async update(car) {
    const carInstance = this.carModel.build(car, {isNewRecord: false})
    await carInstance.save()

    return fromModelToEntity(carInstance)
  }
 
  /**
   * @param {Number} id
   */
  async delete(id) {
    await this.carModel.destroy({
      where: {
        id
      }
    })
  }

  /**
   * @param {Number} id
   */
  async getById(id) {
    const carInstance = await this.carModel.findByPk(id)

    if(carInstance){
      return fromModelToEntity(carInstance)
    }else{
      throw new NonExistentCar()
    }
  }

  async getAll() {
    const cars = await this.carModel.findAll()
    
    return cars.map(car => fromModelToEntity(car))
  }
}
