const AbstractCarRepository = require('../abstract-repository')
const {NonExistentCar} = require('../../error/general-errors')
const {fromDbToEntity} = require('../../mapper/car.mapper')

module.exports = class CarRepository extends AbstractCarRepository {
  /**
   * @param {import('../../model/car.model')} carModel
   */
  constructor(carModel) {
    super()
    this.carModel = carModel
  }

  /**
   * @param {import('../../car.entity')} car
   */
  async create(car) {
    const carInstance = this.carModel.create(car)

    //terminar
    //crear sequelize instance

    return carInstance
  }

  /**
   * @param {import('../../car.entity')} car
   */
  async update(car) {
    const statement = this.databaseAdapter.prepare(`
      UPDATE cars SET
        brand = ?,
        model = ?,
        model_year = ?,
        image_url = ?,
        mileage = ?,
        color = ?,
        air_conditioning = ?,
        number_passengers = ?,
        automatic = ?,
        active = ?,
        rented = ?,
        return_date = ?,
        price_per_week_in_cents = ?,
        price_per_day_in_cents = ?
      WHERE id = ?
    `)

    const params = [
      car.brand,
      car.model,
      car.yearOfModel,
      car.imageUrl,
      car.mileage,
      car.color,
      car.airConditioning,
      car.numberOfPassengers,
      car.automatic,
      car.active,
      car.rented,
      car.returnDate,
      car.pricePerWeekInCents,
      car.pricePerDayInCents,
      car.id,
    ]

    statement.run(params)
  }

  /**
   * @param {Number} id
   */
  delete(id) {
    const statement = this.databaseAdapter.prepare(`
      DELETE FROM cars
      WHERE id = ?
    `)

    statement.run(id)
  }

  /**
   * @param {Number} id
   */
  getById(id) {
    const statement = this.databaseAdapter.prepare(`
      SELECT 
        id, 
        brand,
        model,
        model_year,
        image_url,
        mileage,
        color,
        air_conditioning,
        number_passengers,
        automatic,
        active,
        rented,
        return_date,
        price_per_week_in_cents,
        price_per_day_in_cents,
        created_at,
        updated_at
      FROM cars WHERE id = ?
    `)

    const car = statement.get(id)

    if (car) {
      return fromDbToEntity(car)
    } else {
      throw new NonExistentCar(`not found car  with id: ${id}`)
    }
  }

  getAll() {
    const statement = this.databaseAdapter.prepare(`
      SELECT
        id, 
        brand,
        model,
        model_year,
        image_url,
        mileage,
        color,
        air_conditioning,
        number_passengers,
        automatic,
        active,
        rented,
        return_date,
        price_per_week_in_cents,
        price_per_day_in_cents,
        created_at,
        updated_at
      FROM cars
    `)

    const cars = statement.all()

    return cars.map(car => fromDbToEntity(car))
  }
}
