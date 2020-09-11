module.exports = class AbstractController {
  constructor () {
    if (new.target === AbstractController) {
      throw new Error('this is not instantiable')
    }
  }
}
