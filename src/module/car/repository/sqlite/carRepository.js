const AbstractCarRepository = require('../abstractCarRepository')
const fromDbToEntity = require('../../car.mapper')

module.exports = class ClubRepository extends AbstractCarRepository {
  /**
   * @param {import('better-sqlite3').Database} databaseAdapter
   */
  constructor (databaseAdapter) {
    super()
    this.databaseAdapter = databaseAdapter
  }

  /**
   * @param {import('../../car.entity')} car
   */
  create (car) {
    const statement = this.databaseAdapter.prepare(`
      INSERT INTO cars (
        brand = ?,
        model = ?,
        model_year = ?,
        mileage = ?,
        color = ?,
        air_conditioning = ?,
        number_passengers = ?,
        automatic = ?,
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const params = [
      car.brand,
      car.model,
      car.yearOfModel,
      car.mileage,
      car.color,
      car.airConditioning,
      car.numberOfPassengers,
      car.automatic
    ]

    const queryResult = statement.run(params)

    return this.getById(queryResult.lastInsertRowid)
  }

  /**
   * @param {import('../../car.entity')} car
   */
  update (car) {
    const statement = this.databaseAdapter.prepare(`
      UPDATE cars SET
        brand = ?,
        model = ?,
        model_year = ?,
        mileage = ?,
        color = ?,
        air_conditioning = ?,
        number_passengers = ?,
        automatic = ?
      WHERE id = ?
    `)

    const params = [
      car.brand,
      car.model,
      car.yearOfModel,
      car.mileage,
      car.color,
      car.airConditioning,
      car.numberOfPassengers,
      car.automatic,
      car.id
    ]

    statement.run(params)

    return this.getById(car.id)
  }

  /**
   * @param {Number} id
   */
  delete (id) {
    const statement = this.databaseAdapter.prepare(`
      DELETE FROM cars
      WHERE id = ?
    `)

    statement.run(id)
  }

  /**
   * @param {Number} id
   */
  getById (id) {
    const statement = this.databaseAdapter.prepare(`
      SELECT 
        brand,
        model,
        model_year,
        mileage,
        color,
        air_conditioning,
        number_passengers,
        automatic
      FROM cars WHERE id = ?
    `)

    const car = statement.get(id)

    return fromDbToEntity(car)
  }

  getAll () {
    const statement = this.databaseAdapter.prepare(`
      SELECT 
        brand,
        model,
        model_year,
        mileage,
        color,
        air_conditioning,
        number_passengers,
        automatic
      FROM cars
    `)

    const cars = statement.all()

    return cars.map(car => fromDbToEntity(car))
  }
}
