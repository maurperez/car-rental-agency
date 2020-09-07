/**
 * @typedef {{
 *  id: Number,
 *  brand: String,
 *  model: String,
 *  model_year: Number,
 *  image_url: String,
 *  mileage: Number,
 *  color: String,
 *  air_conditioning: (1|0),
 *  number_passengers: Number,
 *  automatic: (1|0),
 *  active: (1|0),
 *  price_per_week_in_cents: Number,
 *  price_per_day_in_cents: Number,
 *  created_at: String,
 *  updated_at: String
 * }} CarFromDbDto
 */

/**
 * @typedef {{
 *  brand: String,
 *  model: String,
 *  model_year: Number,
 *  mileage: Number,
 *  color: String,
 *  air_conditioning: (1|0),
 *  number_passengers: Number,
 *  automatic: (1|0),
 *  active: (1|0),
 *  price_per_week_in_dollars: Number,
 *  price_per_day_in_dollars: Number
 * }} CarFromHttpDto
*/
