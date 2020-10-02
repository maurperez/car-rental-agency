const {CarAlredyRented, CarInactive} = require('../../error/general-errors')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @this {import('./car.controller')}
 */
async function rent(req, res) {
  const session = req.session
  const id = req.params.id
  const daysToRent = Number(req.body['rent-days'])

  try {
    await this.carService.rent(id, daysToRent)
    session.message = 'car rented sucessfully'
    res.redirect(`${this.ROUT_BASE}/${id}`)
  } catch (error) {

    if (error instanceof CarAlredyRented || error instanceof CarInactive) {
      res.status(405)
      session.error = error.message
      
    } else {
      res.status(500)
      session.error = 'Internal Server Error, please try later'
    }

    res.redirect(`${this.ROUT_BASE}/${id}`)
  }
}

module.exports = {
  rent,
}
