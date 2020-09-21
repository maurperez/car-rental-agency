const Car = require("../car.entity");

const carExistentInstance = new Car(
  1,
  'Honda',
  'Civic',
  2020,
  'fake/path/image',
  3000,
  'Gray',
  1,
  4,
  0,
  1,
  0,
  null,
  50000,
  10000,
  '2020-09-08 16:56:34',
  '2020-09-08 16:56:34'
)

const nonRentedCar = new Car(
  1,
  'Honda',
  'Civic',
  2020,
  'fake/path/image',
  3000,
  'Gray',
  1,
  4,
  0,
  1,
  0,
  null,
  50000,
  10000,
  '2020-09-08 16:56:34',
  '2020-09-08 16:56:34'
)

const rentedCar = new Car(
  2,
  'Honda',
  'Civic',
  2018,
  'fake/image/path',
  5000,
  'Black',
  1,
  4,
  0,
  1,
  1,
  '2020-09-21T17:24:50.960Z',
  50000,
  10000,
  '2020-09-08 16:56:34',
  '2020-09-08 16:56:34'
)

const inactiveCar = new Car(
  3,
  'Honda',
  'Civic',
  2018,
  'fake/image/path',
  5000,
  'Black',
  1,
  4,
  0,
  0,
  0,
  null,
  50000,
  10000,
  '2020-09-08 16:56:34',
  '2020-09-08 16:56:34'
)

const carDto = {
  brand: 'Honda',
  model: 'Civic',
  model_year: 2019,
  mileage: 500,
  color: 'Black',
  air_conditioning: 1,
  number_passengers: 4,
  automatic: 0,
  price_per_week_in_dollars: 500,
  price_per_day_in_dollars: 100
}

module.exports = {
  carExistentInstance,
  carDto,
  nonRentedCar,
  rentedCar,
  inactiveCar
}