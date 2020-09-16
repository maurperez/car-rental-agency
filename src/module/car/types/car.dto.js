/**
 * @typedef {{
 *  id: number,
 *  brand: string,
 *  model: string,
 *  model_year: number,
 *  image_url: string,
 *  mileage: number,
 *  color: string,
 *  air_conditioning: (1|0),
 *  number_passengers: number,
 *  automatic: (1|0),
 *  active: (1|0),
 *  rented: (1|0),
 *  return_date: (?string)
 *  price_per_week_in_cents: number,
 *  price_per_day_in_cents: number,
 *  created_at: string,
 *  updated_at: string
 * }} CarFromDbDto
 */

/**
 * @typedef {{
 *  brand: string,
 *  model: string,
 *  model_year: number,
 *  mileage: number,
 *  color: string,
 *  air_conditioning: (1|0),
 *  number_passengers: number,
 *  automatic: (1|0),
 *  price_per_week_in_dollars: number,
 *  price_per_day_in_dollars: number
 * }} CarFromHttpRequestDto
 */
