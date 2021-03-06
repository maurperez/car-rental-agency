/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @this {import('./car.controller')}
 */
async function index(req, res) {
  const session = req.session
  const cars = await this.carService.getAll()

  res.render('car/view/home', {
    data: {
      cars,
      error: session.error,
      message: session.message,
    },
  })

  this.cleanSessionErrorsAndMessages(session)
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @this {import('./car.controller')}
 */
async function getAvailable(req, res) {
  const session = req.session
  const cars = await this.carService.getAllAvailableCars()

  res.render('car/view/car-list', {
    data: {
      cars,
      error: session.error,
      message: session.message,
    },
  })

  this.cleanSessionErrorsAndMessages(session)
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @this {import('./car.controller')}
 */
async function getRented(req, res) {
  const session = req.session
  const cars = await this.carService.getRentedCars()

  res.render('car/view/car-list', {
    data: {
      cars,
      error: session.error,
      message: session.message,
    },
  })

  this.cleanSessionErrorsAndMessages(session)
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @this {import('./car.controller')}
 */
async function getById(req, res) {
  const id = req.params.id
  const session = req.session
  const car = await this.carService.getById(id)

  res.render('car/view/view-one-car', {
    data: {
      car,
      error: session.error,
      message: session.message,
    },
  })

  this.cleanSessionErrorsAndMessages(session)
}

module.exports = {
  index,
  getAvailable,
  getRented,
  getById,
}
