const nunjucks = require('nunjucks')

function setCustomFilters (env) {
  env.addFilter('isarray', obj => {
    return Array.isArray(obj)
  })
}

/**
 * @param {import('express').Application} expressApp 
 */
module.exports = function configureNunjucks(expressApp) {
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader('src/module', {
      watch: true,
      noCache: true
    }),
    {
      autautoescape: true
    }
  )
  env.express(expressApp)
  expressApp.set('view engine', 'njk')
  setCustomFilters(env)
}
