module.exports = class MethodNotImplemented extends Error {
  constructor() {
    super()
    this.message = 'method not implemented'
  }
}
