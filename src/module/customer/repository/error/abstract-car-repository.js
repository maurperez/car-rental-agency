module.exports = class AbstractCustomerRepositoryError extends Error {
  constructor() {
    super()
    this.message = 'this is not instantiable'
  }
}
