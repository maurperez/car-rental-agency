const express = require('express')

module.exports = {
  /**
   * @param {import('express').Application} app
   */
  configureStaticsFiles : app => {
    app.use('/public', express.static('public'))
    app.use('/public/css', express.static('node_modules/bulma-carousel/dist/css'))
    app.use('/public/css', express.static('node_modules/bulma/css'))
    app.use('/public/js', express.static('node_modules/bulma-carousel/dist/js'))
  },
  /**
   * @param {import('express').Application} app
   */
  configureNotFoundPage: app => {
    app.use((req, res) => {
      res.status(404).render('car/view/not-found-404')
    })
  },
  /**
   * @param {import('express').Application} app
   * @param {import('rsdi').IDIContainer} container
   */
  configureSession: (app, container) => {
    app.use(container.get('Session'))
  }
}
