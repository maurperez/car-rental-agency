/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @this {import('../customer.controller')} 
 */
function getById(req, res) {
  this.customerService.getById(req.params.id)
    .then(customer => res.json(customer))
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @this {import('../customer.controller')} 
 */
function getByName(req, res) {
  this.customerService.getByName(req.query.name, req.query.lastname)
    .then(customers => res.json(customers))
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @this {import('../customer.controller')} 
 */
function getAll(req, res) {
  this.customerService.getAll()
    .then(customers => res.json(customers))
}

module.exports = {
  getById,
  getByName,
  getAll
}