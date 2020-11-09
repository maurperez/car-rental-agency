/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @this {import('../customer.controller')} 
 */
function update(req, res) {
  const id = req.params.id

  if(req.method === 'GET'){
    this.customerService.getById(id)
      .then(customer => res.json(customer))
  }else if(req.method === 'POST'){
    const customerValidated = this.validateAndParseCustomerRequest(req.body)
    this.customerService.update(id, customerValidated)
      .then(() => res.redirect(`${this.ROUTE_BASE}/${id}`))
  }
}

module.exports = {
  update
}