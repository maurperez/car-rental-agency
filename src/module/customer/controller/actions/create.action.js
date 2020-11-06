/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 * @this {import('../customer.controller')} 
 */
async function create(req, res) {
  if(req.method === 'GET'){
    res.render('customer/view/create-form')
  }else if(req.method === 'POST'){
    try {
      const plainCustomer = this.validateAndParseCustomerRequest(req.body)
      const customer = await this.customerService.create(plainCustomer)

      res.json(customer).status(201).end()
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {create}