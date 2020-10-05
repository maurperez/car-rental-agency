const Car = require('../car.entity')

const car = new Car(
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

const carAvailable = new Car(
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

const carRented = new Car(
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

const carInactive = new Car(
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

const carFromHttpDto = {
  brand: 'Honda',
  model: 'Civic',
  model_year: 2019,
  mileage: 500,
  color: 'Black',
  air_conditioning: 1,
  number_passengers: 4,
  automatic: 0,
  price_per_week_in_dollars: 500,
  price_per_day_in_dollars: 100,
}

const carFromDbDto = {
  id: 1,
  brand: 'Honda',
  model: 'Civic',
  model_year: 2019,
  image_url: 'fake/image/url',
  mileage: 500,
  color: 'Black',
  air_conditioning: 1,
  number_passengers: 4,
  automatic: 0,
  active: 1,
  rented: 0,
  return_date: null,
  price_per_week_in_cents: 50000,
  price_per_day_in_cents: 10000,
  created_at: '2020-09-08 16:56:34',
  updated_at: '2020-09-08 16:56:34',
}

const carCreation = new Car(
  null,
  'Peugeot',
  '208',
  2018,
  'image/path',
  630,
  'White',
  1,
  4,
  0,
  1,
  0,
  null,
  40000,
  7500,
)

module.exports = {
  car,
  carAvailable,
  carRented,
  carInactive,
  carCreation,
  carFromHttpDto,
  carFromDbDto,
}
