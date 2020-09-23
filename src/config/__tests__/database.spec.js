jest.mock('fs')
const fs = require('fs')
const { setupDatabase } = require('../database')

describe('database setup', () => {
  const mockDatabaseAdapter = {
    exec: jest.fn()
  }

  beforeAll(() => {
    fs.readFileSync.mockReturnValue('sql code')
    setupDatabase(mockDatabaseAdapter)
  });

  it('reads the setup file with utf-8 encoding', () => {
    expect(fs.readFileSync).toBeCalledWith('src/config/setup.sqlite', 'utf-8')
  })

  it('executes the setup', () => {
    expect(mockDatabaseAdapter.exec).toBeCalledWith('sql code')
  })

})