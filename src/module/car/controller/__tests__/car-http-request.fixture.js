const validCarHttpReq = {
  brand: 'Honda',
  model: 'Civic',
  model_year: '2019',
  mileage: '500',
  color: 'Black',
  air_conditioning: '1',
  number_passengers: '4',
  automatic: '0',
  price_per_week_in_dollars: '500',
  price_per_day_in_dollars: '100'
}

const invalidCarHttpReq = {
  brand: 'Honda',
  model: 'Civic',
  model_year: '9999',
  mileage: '-500',
  color: 'Black',
  air_conditioning: '1',
  number_passengers: '320',
  automatic: '0',
  price_per_week_in_dollars: '-100',
  price_per_day_in_dollars: '-20'
}


module.exports = {
  validCarHttpReq,
  invalidCarHttpReq
}