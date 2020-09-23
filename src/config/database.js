const fs = require('fs')

module.exports = {
  /**
   * @param {import('better-sqlite3').Database} databaseAdapter
   */
  setupDatabase : (databaseAdapter) => {
    const setupStatement = fs.readFileSync('src/config/setup.sqlite', 'utf-8')
    databaseAdapter.exec(setupStatement)
  }
}