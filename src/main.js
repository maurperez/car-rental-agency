require('dotenv').config()
const express = require('express')
const nunjucks = require('nunjucks')

const configureDependencyInjection = require('./config/di')
const { init: initCarModule } = require('./module/car/module')

const app = express()
const port = process.env.PORT || 3000

app.use('/public', express.static('public'))
app.set('view engine', 'njk')



nunjucks.configure('src/module', {
  autoescape: true,
  express: app
})

const container = configureDependencyInjection()

initCarModule(app, container)

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))
