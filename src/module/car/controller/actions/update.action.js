const Joi = require('joi')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @this {import('./car.controller')}
 */
function update(req, res) {
  const id = req.params.id
  const path = req.path
  const method = req.method
  const session = req.session

  if (method === 'GET') {
    const car = this.carService.getById(id)

    res.render('car/view/car-form', {
      data: {
        car,
        error: session.error,
        message: session.message,
      },
    })

    this.cleanSessionErrorsAndMessages(session)
  } else if (method === 'POST') {
    try {
      const carDto = this.validateCarRequest(req.body)
      const carImagePath = req.file?.path
      this.carService.update(id, carDto, carImagePath)
      session.message = 'Car updated sucessfully'
      res.redirect(`${this.ROUT_BASE}/${id}`)
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        session.error = error.details.map(error => error.message)
      } else {
        session.error = 'Internal Server Error, please try later'
      }
      res.redirect(path)
    }
  }
}

module.exports = {
  update,
}
