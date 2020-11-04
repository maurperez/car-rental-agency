class NonExistentCustomer extends Error{
  constructor(){
    super('the customer dont exists')
  }
}

module.exports = {
  NonExistentCustomer
}