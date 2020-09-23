const configureDI = require('../di')
const { default: DIContainer } = require('rsdi')

describe('dependency injection', () => {
  const container = configureDI()

  it('container is an instance of DIContainer', () => {
    expect(container).toBeInstanceOf(DIContainer)
  })

  it('contains common definitions', () => {
    expect(container.get('MainDatabaseAdapter')).toBeDefined()
    expect(container.get('Multer')).toBeDefined()
    expect(container.get('UrlencodedParser')).toBeDefined()
    expect(container.get('Session')).toBeDefined()
  })

  it('contains nunjucks definitions', () => {
    expect(container.get('NunjucksFSL')).toBeDefined()
    expect(container.get('NunjucksEnv')).toBeDefined()
  })

  it('contains car module definitions', () => {
    expect(container.get('CarController')).toBeDefined()
    expect(container.get('CarService')).toBeDefined()
    expect(container.get('CarRepository')).toBeDefined()
  })
})