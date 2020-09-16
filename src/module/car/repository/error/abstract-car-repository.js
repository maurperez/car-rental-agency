module.exports = class AbstractCarRepositoryError extends Error {
  constructor(){
    super()
    this.message = 'this is not instantiable'
  }
}