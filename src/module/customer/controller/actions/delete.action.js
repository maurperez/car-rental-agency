/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @this {import('../customer.controller')} 
 */
function deleteCustomer(req, res) {
  const id = req.params.id

  this.customerService.delete(id)
    .then(() => res.redirect(`${this.ROUTE_BASE}`))
  
}

module.exports = {
  deleteCustomer
}