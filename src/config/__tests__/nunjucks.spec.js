const configureNunjucks = require('../nunjucks')

const mockExpressApp = {
  set: jest.fn()
}
const mockDiContainer = {
  get: jest.fn()
}
const mockNunjucksEnv = {
  express: jest.fn(),
  addFilter: jest.fn()
}

describe('nunjuck configuration', () => {
  beforeAll(() => {
    mockDiContainer.get.mockReturnValue(mockNunjucksEnv)

    configureNunjucks(mockExpressApp, mockDiContainer)
  });

  it('calls the container to get the NunjucksEnv', () => {
    expect(mockDiContainer.get).toBeCalledWith('NunjucksEnv')
  })

  it('sets nunjucks as the rendering engine for the express app', () => {
    expect(mockNunjucksEnv.express).toBeCalledWith(mockExpressApp)
    expect(mockExpressApp.set).toBeCalledWith('view engine', 'njk')
  })

  it('adds isarray filter', () => {
    const isArrayFilterFunc = mockNunjucksEnv.addFilter.mock.calls[0][1]

    expect(mockNunjucksEnv.addFilter).toBeCalledWith('isarray', isArrayFilterFunc)

    expect(isArrayFilterFunc([1,2])).toBe(true)
    expect(isArrayFilterFunc('non array')).toBe(false)
  })
})