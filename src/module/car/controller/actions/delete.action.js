/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @this {import('./car.controller')}
 */
function deleteCar(req, res) {
  const id = req.params.id
  const session = req.session

  this.carService.delete(id)

  session.message = `car with id ${id} deleted sucessfully`
  res.status(204)
  res.redirect(`${this.ROUT_BASE}/available`)
}

module.exports = {
  deleteCar,
}
