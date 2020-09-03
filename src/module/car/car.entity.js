module.exports = class Car {
  constructor (
    id,
    brand,
    model,
    yearOfModel,
    mileage,
    color,
    airConditioning,
    numberOfPassengers,
    automatic,
    createdAt,
    updatedAt
  ) {
    this.id = id
    this.brand = brand
    this.model = model
    this.yearOfModel = yearOfModel
    this.mileage = mileage
    this.color = color
    this.airConditioning = airConditioning
    this.numberOfPassengers = numberOfPassengers
    this.automatic = automatic
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
