require('dotenv').config()
const express = require('express')
const configureNunjucks = require('./config/nunjucks')

const configureDependencyInjection = require('./config/di')
const { init: initCarModule } = require('./module/car/module')

const app = express()
const port = process.env.PORT || 3000

app.use('/public', express.static('public'))
app.use('/public/css', express.static('node_modules/bulma-carousel/dist/css'))
app.use('/public/css', express.static('node_modules/bulma/css'))
app.use('/public/js', express.static('node_modules/bulma-carousel/dist/js'))

configureNunjucks(app)

const container = configureDependencyInjection()
app.use(container.get('Session'))

initCarModule(app, container)

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))
