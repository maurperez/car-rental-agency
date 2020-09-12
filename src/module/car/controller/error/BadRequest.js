module.exports = class BadRequestException {
  constructor (message) {
    this.status = 400
    this.message = message
  }
}
