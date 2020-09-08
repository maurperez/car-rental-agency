module.exports = class Car {
  /**
   * @param {Number} [id]
   * @param {String} brand
   * @param {String} model
   * @param {Number} yearOfModel
   * @param {String} imageUrl
   * @param {Number} mileage
   * @param {String} color
   * @param {(1 | 0)} airConditioning
   * @param {Number} numberOfPassengers
   * @param {(1 | 0)} automatic
   * @param {(1 | 0)} active
   * @param {Number} pricePerWeekInCents
   * @param {Number} pricePerDayInCents
   * @param {String} [createdAt]
   * @param {String} [updatedAt]
   */
  constructor (
    id,
    brand,
    model,
    yearOfModel,
    imageUrl,
    mileage,
    color,
    airConditioning,
    numberOfPassengers,
    automatic,
    active,
    rented,
    returnDate,
    pricePerWeekInCents,
    pricePerDayInCents,
    createdAt,
    updatedAt
  ) {
    this.id = id
    this.brand = brand
    this.model = model
    this.yearOfModel = yearOfModel
    this.imageUrl = imageUrl
    this.mileage = mileage
    this.color = color
    this.airConditioning = airConditioning
    this.numberOfPassengers = numberOfPassengers
    this.automatic = automatic
    this.active = active
    this.rented = rented
    this.returnDate = returnDate
    this.pricePerWeekInCents = pricePerWeekInCents
    this.pricePerDayInCents = pricePerDayInCents
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
