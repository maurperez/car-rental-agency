const AbstractController = require('../abstract-controller')

describe('AbstractController', () => {
  it('throw an error if try to instantiate directly', () => {
    try {
      new AbstractController()
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
