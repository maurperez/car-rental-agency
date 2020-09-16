const nunjucks = require('nunjucks')

/**
 * @param {import('express').Application} expressApp
 * @param {import('rsdi').IDIContainer} container
 */
module.exports = function configureNunjucks(expressApp, container) {
  const nunjucksEnv = container.get('NunjucksEnv')

  nunjucksEnv.express(expressApp)
  expressApp.set('view engine', 'njk')
  setCustomFilters(nunjucksEnv)
}

function setCustomFilters(env) {
  env.addFilter('isarray', obj => {
    return Array.isArray(obj)
  })
}
