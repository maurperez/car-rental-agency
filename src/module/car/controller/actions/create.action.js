const Joi = require('joi')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @this {import('../car.controller')}
 */
async function create(req, res) {
  const path = req.path
  const method = req.method
  const session = req.session

  if (method === 'GET') {
    res.render('car/view/car-form', {
      data: {
        error: session.error,
        message: session.message,
      },
    })

    this.cleanSessionErrorsAndMessages(session)
  } else if (method === 'POST') {
    try {
      const carDto = this.validateAndParseCarRequest(req.body)
      const imagePath = req.file.path
      const carInstance = await this.carService.create(carDto, imagePath)
      session.message = 'Car created sucessfully'
      res.redirect(`${this.ROUT_BASE}/${carInstance.id}`)

    } catch (error) {

      if (error instanceof Joi.ValidationError) {
        res.status(400)
        session.error = error.details.map(error => error.message)

      } else {
        res.status(500)
        session.error = 'Internal Server Error, please try later'
        
      }
      res.redirect(path)
    }
  }
}

module.exports = {
  create,
}
