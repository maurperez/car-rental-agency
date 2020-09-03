const AbstractCarRepository = require('../abstractCarRepository')

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
      INSERT INTO cars VALUES (
        brand = ?,
        model = ?,
        model_year = ?,
        mileage = ?,
        color = ?,
        air_conditioning = ?,
        number_passengers = ?,
        automatic = ?,
      )
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

    statement.run(params)
  }
}
